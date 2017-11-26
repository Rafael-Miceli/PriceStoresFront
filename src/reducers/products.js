import { SAVE_PRODUCT, GET_PRODUCTS_RESUME, GET_PRODUCTS_RESUME_SUCCESS, REMOVE_PRODUCT } from '../constants/ActionTypes'
import localforage from 'localforage'

const defaultState = {
    productToSave:{
        name: '',
        price: 0
    },
    productsResume: [],
    productsResumeTableFilter: [],
    productsName: {},
    modalIsOpen: false
}

export const productReducer = (state, {type, value}) => {

    if(state === undefined)
        state = defaultState;

    switch (type) {
        case SAVE_PRODUCT:  
            return {...state}            
        case GET_PRODUCTS_RESUME:
            state = value
            return {...state}
        case GET_PRODUCTS_RESUME_SUCCESS:               

            if (value === null)
                return {...state}

            state.productsResume = value.slice()
            state.productsResumeTableFilter = value.slice()

            //Para o AutoComplete
            value.forEach((product, i) => {
                    state.productsName[product.name] = null;
            })            

            return {...state}

        case REMOVE_PRODUCT:  
            state = value
            return {...state}
        default:
            return {...state}
    }
}