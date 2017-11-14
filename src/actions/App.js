import { SAVE_PRODUCT, GET_PRODUCTS_RESUME, GET_PRODUCTS_RESUME_SUCCESS } from '../constants/ActionTypes'
import { getAllProductsResume, addProduct, updateProduct } from '../api/product'
import localforage from 'localforage'

export const saveProduct = productsState => {

  let productsResume = productsState.productsResume
  let productToSave = productsState.productToSave
  let productExists = false

  let products = productsResume.map(resume => resume.products).reduce((a, b) => a.concat(b))

  products.forEach(function(product) {
    if (product.name === productToSave.name ) {
      let productUpdating = {oldName: productToSave.name, newName: productToSave.name, price: productToSave.price}
      
      updateProduct(productUpdating, response => {
        console.log("Update: resultado vindo da api ", response)        
      })

      updatePrice(product, productToSave.name, productToSave.price)
      productExists = true
    }
  }, this)

  if (!productExists) {
    let productAdding = {name: productToSave.name, price: productToSave.price};

    addProduct(productAdding, response => {
      console.log("Adding: resultado vindo da api ", response)      
    })

    productsResume[0].products.push({
      name: productToSave.name, 
      lastPrice: productToSave.price,
      lowerPrice: productToSave.price,
      higherPrice: productToSave.price
    })

    productsResume[0].products.sort(productsComparer)
    
    productsState.productsName[productToSave.name] = null
  }  

  console.log("localForage ", localforage)

  localforage.setItem('productsResume', productsResume).then(() => {    
    }).then(value => {
      console.log("Adicionado ao local cache ", value)
    }).catch(err => {
      console.log("Erro ao adicionar em local cache ", err)
    })
  
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

export const getProductsResume = () => {
  return getAllProductsResume();
}

export const getProductsResumeSuccess = (productsResume) => {
  return {
    type: GET_PRODUCTS_RESUME_SUCCESS,
    value: productsResume
  }  
}

const productsComparer = (a, b) => {
  if (a.name > b.name) {
    return 1;
  }
  if (a.name < b.name) {
    return -1;
  }
  // a deve ser igual a b
  return 0;
}

