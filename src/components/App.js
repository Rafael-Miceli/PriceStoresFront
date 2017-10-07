import React, { Component } from 'react';
import logo from '../logo.svg';
import '../App.css';
import { store } from '../stores/productStores';
import ReactTable from 'react-table';
import 'react-table/react-table.css';

const lastPriceColumn = "lastPrice";
const productName = "name";

class App extends Component {

  constructor(props) {
    super(props);
    
    // this.state = {
    //   productToSaveName: "",
    //   productToSavePrice: 0,
    //   products: []
    // }

    this.state = store.getState();

    console.log(this.state);
  }

  saveProduct() {
    let productToSaveName = this.state.productToSaveName;
    let productToSavePrice = this.state.productToSavePrice;
    let newProductsList = this.state.products;

    let productExists = false;

    newProductsList.forEach(function(element) {
      if (element.name === productToSaveName ) {
        this.updatePrice(element, productToSaveName, productToSavePrice);
        productExists = true;
      }
    }, this);    

    if (!productExists) {
      //Fetch Price Inserted
      newProductsList.push({name: productToSaveName, lastPrice: productToSavePrice});        
    }


    this.setState({products: newProductsList});

    
    this.cleanFields();
  }

  updatePrice(element, productToSaveName, productToSavePrice) {
    element.lowerPrice = this.findLowerPricesHistory(element, productToSavePrice);
    element.higherPrice = this.findHigherPricesHistory(element, productToSavePrice);
    element.name = productToSaveName;
    element.lastPrice = productToSavePrice;        
    console.log("Atualizou historico de preço ", element);
    //Fetch Price Updated
    this.fetchPriceUpdate(element);
  }

  findLowerPricesHistory(product, priceToUpdate) {         

    let lowerPrice = product.lastPrice;     

    if(priceToUpdate < lowerPrice) 
      lowerPrice = priceToUpdate;  
    
    if(product.lowerPrice < lowerPrice) 
      lowerPrice = product.lowerPrice;     
    
    return lowerPrice;
  }

  findHigherPricesHistory(product, priceToUpdate) {         

    let higherPrice = product.lastPrice;     

    if(higherPrice < priceToUpdate) 
      higherPrice = priceToUpdate;  
    
    if(higherPrice < product.higherPrice) 
      higherPrice = product.higherPrice;     
    
    return higherPrice;
  }

  fetchPriceUpdate(element) {

    fetch('http://localhost:5000/api/product', {
      method: 'POST',
      mode: "cors", 
      headers: new Headers({
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      }),
      body: JSON.stringify(element)
    })
    .then(response => console.log(response.json()));
  }

  cleanFields() {    
    this.setState({productToSaveName: '', productToSavePrice: 0});
    this.nameInput.focus();
  }

  cellClick(state, rowInfo, column, instance) {
    return {
      onClick: (e, handleOriginal) => {
        if(rowInfo === undefined)
          return;

        this.setState({productToSaveName: rowInfo.row[productName]});
        this.setState({productToSavePrice: rowInfo.row[lastPriceColumn]});

        if (handleOriginal) {
          handleOriginal()
        }
      }
    }
  }

  render() {
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Vamos garantir pagar o menor preço dos produtos do mercado</h2>
        </div>
        <p className="App-intro">                    
          <span>Adicione produto e seu preço </span>
          <input type="text" autoFocus              
            required placeholder="Produto" />
            {/* ref={(input) => { this.nameInput = input; }}             
            onChange={(e) => {this.setState({productToSaveName: e.target.value})}} 
            value={this.state.productToSaveName} */}
          <input type="number" 
            step="any" 
            required placeholder="Preço" />
            {/* onChange={(e) => {this.setState({productToSavePrice: e.target.value})}} 
            value={this.state.productToSavePrice} */}
          {/* <input type="date" /> */}

          <button onClick={this.saveProduct.bind(this)}>Salvar</button>

          <ReactTable
            data={this.state.productsResume}
            columns={[
              {
                Header: "Produto",
                accessor: "name"
              },
              {
                Header: "Último preço visto",
                accessor: "lastPrice"
              },
              {
                Header: "Preço mais barato",
                accessor: "lowerPrice"            
              },
              {
                Header: "Preço mais alto",
                accessor: "higherPrice"            
              }
            ]}
            getTdProps={this.cellClick.bind(this)}
            filterable
          />
        </p>
      </div>
    );
  }
}

export default App;
