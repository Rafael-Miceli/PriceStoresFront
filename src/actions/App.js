import { SAVE_PRODUCT, GET_PRODUCTS_RESUME } from '../constants/ActionTypes'
import { getAllProductsResume } from '../api/product'

export const saveProduct = productsState => {

  let productsResume = productsState.productsResume
  let productToSave = productsState.productToSave
  let productExists = false

  productsResume.forEach(function(product) {
    if (product.name === productToSave.name ) {
      updatePrice(product, productToSave.name, productToSave.price);
      productExists = true;
    }
  }, this);    

  if (!productExists) {
    //Fetch Price Inserted
    productsResume.push({name: productToSave.name, lastPrice: productToSave.price});        
  }
  
  console.log("Salvando produto ", productsState)  

  return {
    type: SAVE_PRODUCT,
    value: productsState
  }
}


const updatePrice = (element, productToSaveName, productToSavePrice) => {
  element.lowerPrice = findLowerPricesHistory(element, productToSavePrice);
  element.higherPrice = findHigherPricesHistory(element, productToSavePrice);
  element.name = productToSaveName;
  element.lastPrice = productToSavePrice;        
  console.log("Atualizou historico de preço ", element);
  //Fetch Price Updated
  //this.fetchPriceUpdate(element);
}

const findLowerPricesHistory = (product, priceToUpdate) => {         

  let lowerPrice = product.lastPrice;     

  if(priceToUpdate < lowerPrice) 
    lowerPrice = priceToUpdate;  
  
  if(product.lowerPrice < lowerPrice) 
    lowerPrice = product.lowerPrice;     
  
  return lowerPrice;
}

const findHigherPricesHistory = (product, priceToUpdate) => {         

  let higherPrice = product.lastPrice;     

  if(higherPrice < priceToUpdate) 
    higherPrice = priceToUpdate;  
  
  if(higherPrice < product.higherPrice) 
    higherPrice = product.higherPrice;     
  
  return higherPrice;
}



export const getProductsResume = () => dispatch => {
  console.log("Action Buscando produtos ", dispatch)

  getAllProductsResume(products => {
    console.log("resultado de produtos vindo da api ", products)    

    dispatch({
        type: GET_PRODUCTS_RESUME,
        value: products
    })
  })
}

