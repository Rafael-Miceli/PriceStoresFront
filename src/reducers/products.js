// import { combineReducers } from 'redux'
import { SAVE_PRODUCT } from '../constants/ActionTypes'


const defaultState = {
    productsResume: [{
        name: "Teste",
        lastPrice: 0,
        lowerPrice: 0,
        higherPrice: 0
    }]
}

// const products = (state, action) => {
//   switch (action.type) {
//     case "ADD_PRODUCT":
//       return {
//         ...state,
//         inventory: state.inventory - 1
//       }
//     default:
//       return state
//   }
// }

// const byName = (state = {}, action) => {
//   switch (action.type) {
//     case GET_PRODUCT_RESUME:
//       return {
//         ...state,
//         ...action.products.reduce((obj, product) => {
//           obj[product.name] = product
//           return obj
//         }, {})
//       }
//     default:
//       const { productName } = action
//       if (productName) {
//         return {
//           ...state,
//           [productName]: products(state[productName], action)
//         }
//       }
//       return state
//   }
// }

// const visibleIds = (state = [], action) => {
//   switch (action.type) {
//     case GET_PRODUCT_RESUME:
//       return action.products.map(product => product.name)
//     default:
//       return state
//   }
// }

// export default combineReducers({
//   byName,
//   visibleIds
// })

// export const getProduct = (state, name) =>
//   state.byName[name]

// export const getVisibleProducts = state =>
//   state.visibleIds.map(name => getProduct(state, name))

export const productReducer = (state = defaultState, {type, value}) => {
    switch (type) {
        case SAVE_PRODUCT:  
            //Mudar o estado aqui
            console.log("State atual ", state);
            console.log("Salvando novo produto ", value);
            return {...state, newProduct: value};
        default:
            return state;
    }
}