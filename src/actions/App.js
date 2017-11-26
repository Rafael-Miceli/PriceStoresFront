import { SAVE_PRODUCT, GET_PRODUCTS_RESUME_SUCCESS, REMOVE_PRODUCT } from '../constants/ActionTypes'
import { getAllProductsResume, addProduct, updateProduct, removeProducts as removeProductsApi } from '../api/product'
import localforage from 'localforage'


export const saveProduct = productsState => {

  let productsResume = productsState.productsResume
  let productToSave = productsState.productToSave
  let productExists = false

  productsResume.forEach(function(product) {
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

    productsResume.push({
      name: productToSave.name, 
      lastPrice: productToSave.price,
      lowerPrice: productToSave.price,
      higherPrice: productToSave.price,
      categoryName: "Sem Categoria"
    })

    productsResume.sort(productsComparer)

    productsState.productsName[productToSave.name] = null
  }
  
  productsState.productsResumeTableFilter = productsState.productsResume

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

export const removeProducts = productsState => {
  let productsResume = productsState.productsResume
  let productsToRemove = productsState.productsResume.filter(p => p.checked)

  console.log('produtos a remover ', productsToRemove)

  //Chamar API para remover os produtos
  removeProductsApi(productsToRemove.map(p => p.name))

  productsState.productsResume = productsResume.filter(p => !p.checked)
  productsState.productsResumeTableFilter = productsState.productsResume

  console.log('Estado de produtos removidos ', productsState)

  return {
    type: REMOVE_PRODUCT,
    value: productsState
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

