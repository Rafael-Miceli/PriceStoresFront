import React, { Component } from 'react'
import logo from '../logo.svg'
import '../App.css'
import ProductsList from './ProductsList'
import CreateProduct from './CreateProduct'

class App extends Component {

  constructor(props) {
    super(props)
  } 

  render() {
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
        </div>                  
          <CreateProduct/>
          <ProductsList />
      </div>
    );
  }
}


export default App;
