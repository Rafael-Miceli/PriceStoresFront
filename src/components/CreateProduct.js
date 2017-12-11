import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import ReactDOM from 'react-dom'
import { saveProduct, removeProducts } from '../actions/App'
import { Input, Row, Button, Autocomplete } from 'react-materialize'


class CreateProduct extends Component {

  constructor(props) {
    super(props)    

    this.state = props
  }

  saveProduct() {    
    if(this.state.productToSave.price <= 0)
    {
      this.setState({formError: 'Preço não pode ser vazio ou negativo'})
      return      
    }
      
    this.setState({formError: ''})
    this.props.saveProduct(this.state)
    this.cleanFields()
  }

  cleanFields() {    
    let productToSave = {...this.state.productToSave}
    productToSave.name = '';
    productToSave.price = '0';    
    this.setState({productToSave})

    //Gambiarra porque ReactMaterialize Input não expõe focus
    ReactDOM.findDOMNode(this.nameInput).children[0].focus()
  }

  componentWillReceiveProps(nextProps) {
    console.log('CreateProduct props ', nextProps)
    this.setState({productToSave: nextProps.productToSave})
  }

  render() {
    return (
        <div>                  
          <h3>Adicione um Produto</h3>

          <span style={{color: 'red'}}>{this.state.formError}</span>

          <Row>
            <Autocomplete
              s={6}
              name="inputName"
              title='Produto'
              autoFocus required
              ref={myInput => this.nameInput = myInput }
              onChange={e => {
                if (e.target.value === undefined) return

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
                this.props.productsName
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
              value={this.props.productToSave.price}
              />
          </Row>  

          <Button onClick={this.saveProduct.bind(this)}>Salvar</Button>                              
      </div>
    );
  }
}

CreateProduct.propTypes = {
  productToSave: PropTypes.object.isRequired,
  productsName: PropTypes.object.isRequired,
  productsResume: PropTypes.array.isRequired
}

const mapStateToProps = state => {

  console.log('mapStateToProps CreateProduct ', state)

  return {
    productToSave: state.reducer.productToSave,
    productsName: state.reducer.productsName,
    productsResume: state.reducer.productsResume
  }
}

const mapDispatchToProps = dispatch => {
  return {    
    saveProduct: (state) => {
      dispatch(saveProduct(state))
    }    
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CreateProduct);
