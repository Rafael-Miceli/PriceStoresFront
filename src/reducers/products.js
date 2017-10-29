import { SAVE_PRODUCT, GET_PRODUCTS_RESUME, GET_PRODUCTS_RESUME_SUCCESS } from '../constants/ActionTypes'

const defaultState = {
    productToSave:{
        name: '',
        price: 0
    },
    productsResume: []
}

export const productReducer = (state, {type, value}) => {

    console.log("Estado ", state);

    if(state === undefined)
        state = defaultState;

    switch (type) {
        case SAVE_PRODUCT:  
            //Mudar o estado aqui
            return {...state, newProduct: value}
        case GET_PRODUCTS_RESUME:
            state = value
            
            return {...state}
        case GET_PRODUCTS_RESUME_SUCCESS:      
            console.log("Produtos com sucesso ", value)
        
            state.productsResume = value
            
            return {...state}
        default:
            return {...state}
    }
}