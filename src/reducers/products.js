import { SAVE_PRODUCT, GET_PRODUCTS_RESUME, GET_PRODUCTS_RESUME_SUCCESS } from '../constants/ActionTypes'
import localforage from 'localforage'

const defaultState = {
    productToSave:{
        name: '',
        price: 0
    },
    productsResume: [
        {
            categoryName: 'Sem Categoria',
            products: []
        }        
    ],
    productsResumeTableFilter: [
        {
            categoryName: 'Sem Categoria',
            products: []
        }        
    ],
    productsName: {        
    }    
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
            state.productsResume = value  
            state.productsResumeTableFilter = value  

            //Para o AutoComplete
            value.forEach(productsResumeWithCategory => {
                productsResumeWithCategory.products.forEach(product => {
                    state.productsName[product.name] = null;
                })                
            })

            localforage.setItem('productsResume', state.productsResume).then(() => {
                
              }).then(value => {
                console.log("Adicionado ao local cache ", value)
              }).catch(err => {
                console.log("Erro ao adicionar em local cache ", err)
              })

            return {...state}
        default:
            return {...state}
    }
}