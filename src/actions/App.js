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
    
    // return {
    //   type: GET_PRODUCTS_RESUME,
    //   value: products
    // }

    dispatch({
        type: GET_PRODUCTS_RESUME,
        value: products
    }
    )
  })
}



// import productService from '../api/product'
// import * as types from '../constants/ActionTypes'

// const receiveProducts = products => ({
//   type: types.GET_PRODUCT_RESUME,
//   products: products
// })

// export const getAllProductsResumed = () => dispatch => {
//     productService.getAllProductsResumed(products => {
//     dispatch(receiveProducts(products))
//   })
// }

// const addToCartUnsafe = productId => ({
//   type: types.ADD_TO_CART,
//   productId
// })

// export const addToCart = productId => (dispatch, getState) => {
//   if (getState().products.byId[productId].inventory > 0) {
//     dispatch(addToCartUnsafe(productId))
//   }
// }

// export const checkout = products => (dispatch, getState) => {
//   const { cart } = getState()

//   dispatch({
//     type: types.CHECKOUT_REQUEST
//   })
//   shop.buyProducts(products, () => {
//     dispatch({
//       type: types.CHECKOUT_SUCCESS,
//       cart
//     })
//     // Replace the line above with line below to rollback on failure:
//     // dispatch({ type: types.CHECKOUT_FAILURE, cart })
//   })
// }
