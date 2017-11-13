import { saveProduct, getProductsResumeSuccess } from '../actions/App'  
import 'whatwg-fetch'
import localforage from 'localforage'

console.log("fecth lib ", fetch)

const defaultState = {
    productToSave:{
        name: '',
        price: 0
    },
    productsResume: []
}

const baseAddress= process.env.REACT_APP_API; //"http://pricestore-api.azurewebsites.net";

export const getAllProductsResume = () => {    
    return (dispatch) => {
        console.log("Buscando produtos na base")

        fetch(baseAddress + '/api/product')
        .then(response => {
            if(response.status !== 200) {
                console.log("Algo deu errado ", response)                        
                return;
            }
    
            return response            
        })
        .then(response => response.json())
        .then(productsResume => {            
            console.log("json retornado ", productsResume)
            dispatch(getProductsResumeSuccess(productsResume))
        })
        .catch(error => {
            console.log("Algo deu errado ", error)
            console.log("Buscando do cache ")
            localforage.getItem('productsResume').then(result => {
                console.log(result)
                dispatch(getProductsResumeSuccess(result))
                return result
            })
        })
    }
}

export const addProduct = (product, cb) => {
    console.log("Adicionando produto na base")
    fetch(baseAddress + '/api/product', {
        method: 'POST',
        headers: new Headers({
          'Content-Type': 'application/json'
        }),
        body: JSON.stringify(product)
    })
    .then(response => {
        if(response.status !== 201) {
            console.log("Algo deu errado ", response)            
            cb(defaultState)
            return;
        }
        
        console.log(response.json())
    })
    .catch(error => {
        console.log("Algo deu errado ", error)            
        cb(null)        
    })
}

export const updateProduct = (product, cb) => {
    console.log("Atualizando produto na base")
    fetch(baseAddress + '/api/product', {
        method: 'PUT',
        headers: new Headers({
          'Content-Type': 'application/json'
        }),
        body: JSON.stringify(product)
    })
    .then(response => console.log(response.json()))
    .catch(error => {
        console.log("Algo deu errado ", error)            
        cb(null)        
    })
}

//https://developers.google.com/web/updates/2015/03/introduction-to-fetch
