import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import ReactTable from 'react-table';
import 'react-table/react-table.css';

const lastPriceColumn = "lastPrice";
const productName = "name";

class App extends Component {

  constructor(props) {
    super(props);
    
    this.state = {
      productToSaveName: "",
      productToSavePrice: 0,
      products: []
    }
  }

  saveProduct() {
    let productToSaveName = this.state.productToSaveName;
    let productToSavePrice = this.state.productToSavePrice;
    let newProductsList = this.state.products;

    //Se produto existir com o mesmo nome atualizar o preço    
    var productExists = false;

    newProductsList.forEach(function(element) {
      if (element.name === productToSaveName ) {
        
        element.name = productToSaveName;
        element.lastPrice = productToSavePrice;
        productExists = true;
      }
    }, this);    

    if (!productExists)
      newProductsList.push({name: productToSaveName, lastPrice: productToSavePrice});  

    this.setState({products: newProductsList});
    
    this.cleanFields();
  }

  cleanFields() {    
    this.setState({productToSaveName: '', productToSavePrice: 0});
    this.nameInput.focus();
  }

  cellClick(state, rowInfo, column, instance) {
    return {
      onClick: (e, handleOriginal) => {
        if(rowInfo == undefined)
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
            required placeholder="Produto" ref={(input) => { this.nameInput = input; }}             
            onChange={(e) => {this.setState({productToSaveName: e.target.value})}} 
            value={this.state.productToSaveName}/>
          <input type="number" 
            step="any" 
            required placeholder="Preço" 
            onChange={(e) => {this.setState({productToSavePrice: e.target.value})}} 
            value={this.state.productToSavePrice}/>
          {/* <input type="date" /> */}

          <button onClick={this.saveProduct.bind(this)}>Salvar</button>

          <ReactTable
            data={this.state.products}
            columns={[
              {
                Header: "Produto",
                accessor: productName
              },
              {
                Header: "Último preço visto",
                accessor: lastPriceColumn
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
