import React, { Component } from 'react'
import logo from '../logo.svg'
import '../App.css'
import { store } from '../stores/productStores'
import { saveProduct, getProductsResume } from '../actions/App'
import ReactTable from 'react-table'
import 'react-table/react-table.css'

const lastPriceColumn = "lastPrice"
const productName = "name"

class App extends Component {

  constructor(props) {
    super(props)

    
    // .then(productState => {
    //   this.setState(productState)
    // })    

    console.log("Indo buscar estado")
    this.state = store.getState()
    console.log("Estado inicial ", this.state)

    console.log("Dispacth para buscar os produtos")
    store.dispatch(getProductsResume())
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

  cellClick(state, rowInfo, column, instance) {
    return {
      onClick: (e, handleOriginal) => {
        if(rowInfo === undefined)
          return

        let productToSave = {...this.state.productToSave}
        productToSave.name = rowInfo.row[productName]
        productToSave.price = rowInfo.row[lastPriceColumn]
        this.setState({productToSave})

        if (handleOriginal) {
          handleOriginal()
        }
      }
    }
  }

  render() {
    console.log("Estado render ", this.state)

    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Vamos garantir pagar o menor preço dos produtos do mercado</h2>
        </div>
        <p className="App-intro">                    
          <span>Adicione produto e seu preço </span>
          <input type="text" autoFocus              
            required placeholder="Produto" 
            ref={(input) => { this.nameInput = input; }}             
            onChange={e => {
              let productToSave = {...this.state.productToSave}
              productToSave.name = e.target.value;
              this.setState({productToSave})
            }} 
            value={this.state.productToSave.name} 
            />
            
          <input type="number" 
            step="any" 
            required placeholder="Preço" 
            onChange={e => {
              let productToSave = {...this.state.productToSave}
              productToSave.price = e.target.value;
              this.setState({productToSave})
            }} 
            value={this.state.productToSave.price}
            />
            
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
