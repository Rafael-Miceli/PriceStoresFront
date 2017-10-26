import { SAVE_PRODUCT, GET_PRODUCTS_RESUME } from '../constants/ActionTypes'

const defaultState = {
    productToSave:{
        name: '',
        price: 0
    },
    productsResume: []
}

export const productReducer = (state, {type, value}) => {

    if(state === undefined)
        state = defaultState;

    switch (type) {
        case SAVE_PRODUCT:  
            //Mudar o estado aqui
            return {...state, newProduct: value}
        case GET_PRODUCTS_RESUME:

            state = value
            
            return {...state}
        default:
            return {...state}
    }
}