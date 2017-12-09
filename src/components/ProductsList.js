import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import '../App.css'
import configureStore from '../stores/productStores'
import { getProductsResume, removeProducts, selectProduct } from '../actions/App'
import { Collection, CollectionItem, Input, Row, Button, Autocomplete } from 'react-materialize'
import Modal from 'react-modal'

const { store, persistor } = configureStore()

class ProductsList extends Component {

  constructor(props) {
    super(props)

    this.state = props

    var result = this.props.fetchProducts()

    result.then(response => {
      this.setState(this.props)
    })
  }

  removeProducts() {
    store.dispatch(removeProducts(this.state))
    this.setState({modalIsOpen: false})
  }

  filterProductBy(value) {
    var filteredList = this.state.productsResume.slice()
    
    filteredList = filteredList.filter(p => {
      if (p.name.toLowerCase().includes(value.toLowerCase()))
        return p
    })

    this.setState({productsResumeTableFilter: filteredList})
  }

  cellClick(product) {
    store.dispatch(selectProduct({name: product, price: 0}))
    //Rever aqui
    // let productToSave = {...this.state.productToSave}
    // productToSave.name = product
    // this.setState({productToSave})        
  }

  render() {
    return (
      <div className="App">        
          
          <h3>Produtos</h3>

          <Row>
            <Autocomplete
                s={12}
                name="inputFilter"
                title='Filtrar Produto'
                autoFocus required
                ref={myInput => this.filterInput = myInput }
                onChange={e => {
                  if (e.target.value === undefined) return

                  this.filterProductBy(e.target.value)
                }}
                onAutocomplete={productName => {
                  this.filterProductBy(productName)
                }}  
                data={
                  this.state.productsName
                }
              />
          </Row>

          {this.state.productsResumeTableFilter.map((productCategory, indexCategory) => {  
            if (indexCategory > 0 && productCategory.categoryName === this.state.productsResumeTableFilter[(indexCategory - 1)].categoryName)
              return (null)

            return ( 
              <Collection header={productCategory.categoryName} key={productCategory.categoryName}>
                  {this.state.productsResumeTableFilter.map((product, index) => {  
                    if(!product.checked)
                      product.checked = false
                      
                    if (product.categoryName === productCategory.categoryName)
                      return ( 
                          <CollectionItem onClick={this.cellClick.bind(this, product.name)} style={{textAlign: 'left'}} key={product.name}>                    
                            <Input className='filled-in' type='checkbox' checked={product.checked} label={product.name} 
                              onChange={() => {
                                
                                let productsResume = this.state.productsResume.slice()
                                let productChecked = productsResume.find(pr => pr.name === product.name)
                                productChecked.checked = !product.checked
                                
                                this.setState({productsResume})
                              }} />                    
                            <span>Min: R$ {product.lowerPrice} </span>
                            <span>Max: R$ {product.higherPrice}</span>
                          </CollectionItem>                                         
                      )
                  })}
              </Collection>    
            )
          })}            

          <Modal
            isOpen={this.state.modalIsOpen}
            style={customStyles}
            contentLabel="Building" >

            <h5>Quer mesmo remover os produtos selecionados?</h5>
            <div></div>
            <Button className='blue' onClick={() => this.setState({modalIsOpen: false})}>Não</Button>
            <Button className='red' style={{float: 'right'}} onClick={this.removeProducts.bind(this)} >Sim</Button>         
            
          </Modal>
            
          <Button floating fab='horizontal' icon='mode_edit' className='blue' large style={{bottom: '45px', right: '24px'}}>
            {/* <Button floating icon='shopping_cart' className='green' onClick={() => this.setState({modalIsOpen: true})}/> */}
            <Button floating icon='delete_forever' className='red' onClick={() => {
              console.log("Preparando para deletar todos checkeds mostrar modal")

              if(!this.state.productsResume.filter(p => p.checked).length)
                return

              this.setState({modalIsOpen: true})
            }}/>
          </Button>
      </div>
    );
  }
}

ProductsList.propTypes = {
  fetchProducts: PropTypes.func.isRequired,
  productsResume: PropTypes.array.isRequired,
  productsResumeTableFilter: PropTypes.array.isRequired,
  productsName: PropTypes.object.isRequired
}

const mapStateToProps = (state) => {

  console.log('mapStateToProps ProductList ', state)

  return {
    productsResume: state.reducer.productsResume,
    productsResumeTableFilter: state.reducer.productsResumeTableFilter,
    productsName: state.reducer.productsName
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    fetchProducts: () => dispatch(getProductsResume())
  }
}

const customStyles = {
  content : {
    top                   : '50%',
    left                  : '50%',
    right                 : 'auto',
    bottom                : 'auto',
    marginRight           : '-50%',
    transform             : 'translate(-50%, -50%)'
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ProductsList);
