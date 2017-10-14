import { SAVE_PRODUCT, GET_PRODUCTS_RESUME } from '../constants/ActionTypes'

const defaultState = {
    productToSave:{
        name: '',
        price: 0
    },
    productsResume: []
}

export const productReducer = (state, {type, value}) => {
    console.log("Dentro de product reducer ", value)
    console.log("Tipo de product reducer ", type)

    if(state === undefined)
        state = defaultState;

    switch (type) {
        case SAVE_PRODUCT:  
            //Mudar o estado aqui
            console.log("State atual ", state)
            console.log("Salvando novo produto ", value)
            return {...state, newProduct: value}
        case GET_PRODUCTS_RESUME:
            console.log("State atual ", state)
            console.log("Buscando produtos ", value)

            state = value
            
            return {...state}
        default:
            return {...state}
    }
}