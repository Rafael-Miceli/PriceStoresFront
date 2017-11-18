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

    console.log("Estado ", state);

    if(state === undefined)
        state = defaultState;

    switch (type) {
        case SAVE_PRODUCT:  
            return {...state, newProduct: value}            
        case GET_PRODUCTS_RESUME:
            state = value
            return {...state}
        case GET_PRODUCTS_RESUME_SUCCESS:               

            state.productsResume = value.slice()
            state.productsResumeTableFilter = value.slice()

            //Para o AutoComplete
            value.forEach((product, i) => {
                    state.productsName[product.name] = null;
            })

            localforage.setItem('productsResume', state.productsResume).then(() => {
                
              }).then(value => {
                console.log("Adicionado ao local cache ", value)
              }).catch(err => {
                console.log("Erro ao adicionar em local cache ", err)
              })

            return {...state}

        case REMOVE_PRODUCT:  
            return {...state, newProduct: value}
        default:
            return {...state}
    }
}