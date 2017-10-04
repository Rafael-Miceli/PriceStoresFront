import { combineReducers } from 'redux'
import { GET_PRODUCT_RESUME } from '../constants/ActionTypes'

const products = (state, action) => {
  switch (action.type) {
    case "ADD_PRODUCT":
      return {
        ...state,
        inventory: state.inventory - 1
      }
    default:
      return state
  }
}

const byName = (state = {}, action) => {
  switch (action.type) {
    case GET_PRODUCT_RESUME:
      return {
        ...state,
        ...action.products.reduce((obj, product) => {
          obj[product.name] = product
          return obj
        }, {})
      }
    default:
      const { productName } = action
      if (productName) {
        return {
          ...state,
          [productName]: products(state[productName], action)
        }
      }
      return state
  }
}

const visibleIds = (state = [], action) => {
  switch (action.type) {
    case GET_PRODUCT_RESUME:
      return action.products.map(product => product.name)
    default:
      return state
  }
}

export default combineReducers({
  byName,
  visibleIds
})

export const getProduct = (state, name) =>
  state.byName[name]

export const getVisibleProducts = state =>
  state.visibleIds.map(name => getProduct(state, name))