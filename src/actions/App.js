import { SAVE_PRODUCT, GET_PRODUCTS_RESUME } from '../constants/ActionTypes'
import { getAllProductsResume } from '../api/product'

export const saveProduct = product => {
  
  console.log("Salvando produto ", product)  

  return {
    type: SAVE_PRODUCT,
    value: product
  }
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

