import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import logo from '../logo.svg'
import '../App.css'
import { store } from '../stores/productStores'
import { saveProduct, getProductsResume } from '../actions/App'
import { Collection, CollectionItem, Input, Row, Button } from 'react-materialize';

class App extends Component {

  constructor(props) {
    super(props)

    this.state = store.getState()

    let result = store.dispatch(getProductsResume())        

    console.log('Dispatch result ', result)
  }

  loadProductsResume()
  {
    
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

    this.nameInput.focus();
  }

  cellClick(product) {
    console.log("Produto ", product)

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
            <Input s={6} autoFocus required placeholder="Produto" 
              ref={(input) => { this.nameInput = input; }}             
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
          <Collection>
          {this.props.productsResume.map((element, index) => (                            
              <CollectionItem onClick={this.cellClick.bind(this, element.name)}>
                <span>{element.name}</span>
                <br />                
                <span>Mn: {element.lowerPrice} </span>
                <span>Ma: {element.higherPrice}</span>
              </CollectionItem>   
              
            ))}
          </Collection>
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
