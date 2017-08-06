import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import ReactTable from 'react-table';
import 'react-table/react-table.css';

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

    newProductsList.push({name: productToSaveName, lastPrice: productToSavePrice});
    this.setState({products: newProductsList})
  }

  cellClick(state, rowInfo, column, instance) {
    return {
      onClick: (e, handleOriginal) => {
        console.log("Clicou no preço da coluna ", column.id);
        console.log("Clicou no preço ", rowInfo.row[column.id]);

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
          <input type="text" required placeholder="Produto" onChange={(e) => {this.setState({productToSaveName: e.target.value})}} />
          <input type="number" step="any" required placeholder="Preço" onChange={(e) => {this.setState({productToSavePrice: e.target.value})}}/>
          {/* <input type="date" /> */}

          <button onClick={this.saveProduct.bind(this)}>Salvar</button>

          <ReactTable
            data={this.state.products}
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
