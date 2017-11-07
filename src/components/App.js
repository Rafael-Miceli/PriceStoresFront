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
  }

  cellClick(product) {
    let productToSave = {...this.state.productToSave}
    productToSave.name = product
    this.setState({productToSave})    
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
              title='Company'
              data={
                this.state.productsName
              }
            />
            <Input name="inputName" label="Produto" s={6} autoFocus required placeholder="Produto" 
              ref={myInput => this.nameInput = myInput }             
              onChange={e => {
                let productToSave = {...this.state.productToSave}
                productToSave.name = e.target.value;
                this.setState({productToSave})
              }} 
              value={this.state.productToSave.name} 
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
          
          {this.props.productsResume.map((element, index) => (                            
              <Collection header={element.categoryName}>
                {element.products.map((product, index) => (
                  <CollectionItem onClick={this.cellClick.bind(this, product.name)}>
                    
                    <Input type='checkbox' label={product.name} />                    
                    <span>Min: R$ {product.lowerPrice} </span>
                    <span>Max: R$ {product.higherPrice}</span>
                  </CollectionItem>   
                ))}
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
  productsResume: PropTypes.array.isRequired
}

const mapStateToProps = (state) => {
  return {
    productsResume: state.productsResume
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    fetchProducts: () => dispatch(getProductsResume())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
