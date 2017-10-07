import { SAVE_PRODUCT } from '../constants/ActionTypes'

export const saveProduct = (product) => {
  return {
    type: SAVE_PRODUCT,
    product
  }
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
