import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import logo from '../logo.svg'
import '../App.css'
import { store } from '../stores/productStores'
import { saveProduct, getProductsResume } from '../actions/App'
import { Collection, CollectionItem, Input, Row, Button, Autocomplete } from 'react-materialize'

class App extends Component {

  constructor(props) {
    super(props)

    this.state = store.getState()

    let result = store.dispatch(getProductsResume())        
  }

  saveProduct() {
    store.dispatch(saveProduct(this.state))
    this.cleanFields()
  }
  
  cleanFields() {    
    let productToSave = {...this.state.productToSave}
    productToSave.name = '';
    productToSave.price = 0;    
    this.setState({productToSave})

    //Gambiarra porque ReactMaterialize Input não expõe focus
    ReactDOM.findDOMNode(this.nameInput).children[0].focus()
    ReactDOM.findDOMNode(this.filterInput).children[0].focus()
  }

  cellClick(product) {
    let productToSave = {...this.state.productToSave}
    productToSave.name = product
    this.setState({productToSave})    
    
    //Gambiarra porque ReactMaterialize Input não expõe focus
    ReactDOM.findDOMNode(this.nameInput).children[0].focus()
  }

  render() {
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Vamos garantir pagar o menor preço dos produtos do mercado</h2>
        </div>        
          <span>Adicione produto e seu preço </span>
          <Row>
            <Autocomplete
              s={6}
              name="inputName"
              title='Produto'
              autoFocus required
              ref={myInput => this.nameInput = myInput }
              onChange={e => {

                if (!e.target.value) return

                let productToSave = {...this.state.productToSave}
                productToSave.name = e.target.value
                this.setState({productToSave})
              }}
              onAutocomplete={productName => {
                let productToSave = {...this.state.productToSave}
                productToSave.name = productName
                this.setState({productToSave})
              }} 
              value={this.state.productToSave.name}
              data={
                this.state.productsName
              }
            />              
            <Input s={6} type="number" 
              step="any" 
              required placeholder="Preço" 
              onChange={e => {
                let productToSave = {...this.state.productToSave}
                productToSave.price = e.target.value;
                this.setState({productToSave})
              }} 
              value={this.state.productToSave.price}
              />
          </Row>  
          {/* <input type="date" /> */}

          <Button onClick={this.saveProduct.bind(this)}>Salvar</Button>                    

          <h3>Produtos</h3>

          <Row>
            <Autocomplete
                s={12}
                name="inputFilter"
                title='Filtrar Produto'
                autoFocus required
                ref={myInput => this.filterInput = myInput }
                onChange={e => {
                  if (!e.target.value) return

                  console.log("Filtro Begin ", this.state.productsResume)

                  // var filteredList = this.state.productsResumeTableFilter.slice()

                  // console.log(filteredList)

                  // var filteredListProducts = filteredList[0].products.slice()
                  // filteredListProducts = filteredListProducts.filter(p => {
                  //   if (p.name.includes(e.target.value))
                  //     return p
                  // })

                  // console.log(filteredList)
                  // console.log(filteredListProducts)

                  // filteredList[0].products = filteredListProducts

                  //this.setState({productsResumeTableFilter: filteredList})
                }} 
                data={
                  this.state.productsName
                }
              />
          </Row>

          {this.state.productsResumeTableFilter.map((product, index) => (                            
              <Collection header={product.categoryName}>
                  <CollectionItem onClick={this.cellClick.bind(this, product.name)} style={{textAlign: 'left'}}>                    
                    <Input type='checkbox' label={product.name} />                    
                    <span>Min: R$ {product.lowerPrice} </span>
                    <span>Max: R$ {product.higherPrice}</span>
                  </CollectionItem>                   
              </Collection>    
          ))}
          
          <Button floating fab='horizontal' icon='mode_edit' className='red' large style={{bottom: '45px', right: '24px'}}>
            <Button floating icon='shopping_cart' className='blue'/>
            {/* <Button floating icon='local_dining' className='green'/> */}
          </Button>
      </div>
    );
  }
}

App.propTypes = {
  fetchProducts: PropTypes.func.isRequired,
  productsResume: PropTypes.array.isRequired,
  productsResumeTableFilter: PropTypes.array.isRequired
}

const mapStateToProps = (state) => {
  return {
    productsResume: state.productsResume,
    productsResumeTableFilter: state.productsResumeTableFilter
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    fetchProducts: () => dispatch(getProductsResume())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
