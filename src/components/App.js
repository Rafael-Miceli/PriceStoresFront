import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import logo from '../logo.svg'
import '../App.css'
import ProductsList from './ProductsList'
import { store } from '../stores/productStores'
import { saveProduct, removeProducts } from '../actions/App'
import { Input, Row, Button, Autocomplete } from 'react-materialize'

class App extends Component {

  constructor(props) {
    super(props)

    this.state = store.getState()
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

  render() {
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
        </div>        
          <h3>Adicione um Produto</h3>
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

          <Button onClick={this.saveProduct.bind(this)}>Salvar</Button>                    

          <ProductsList />
      </div>
    );
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

export default App;
