import { SAVE_PRODUCT, GET_PRODUCTS_RESUME, GET_PRODUCTS_RESUME_SUCCESS, REMOVE_PRODUCT } from '../constants/ActionTypes'

const defaultState = {
    productToSave:{
        name: '',
        price: 0
    },
    productsResume: [],
    productsResumeTableFilter: [],
    productsName: {},
    modalIsOpen: false,
    gotProducts: false
}

export const productReducer = (state = defaultState, action) => {

    let type = action.type
    let value = action.value

    console.log('Estado ', value)

    switch (type) {
        case SAVE_PRODUCT: 
            state = value 
            return {...state}
        case GET_PRODUCTS_RESUME:
            state = value
            return {...state}
        case GET_PRODUCTS_RESUME_SUCCESS:               

            // if (value === null)
            //     return state

            // state.productsResume = value.slice()
            // state.productsResumeTableFilter = value.slice()

            // //Para o AutoComplete
            // value.forEach((product, i) => {
            //     state.productsName[product.name] = null;
            // })
            
            // console.log('Retornando estado ', value)

            // let clonado = clone(value)

            // console.log('clonado ', clonado)
            //state = 

            console.log('state == newState? ', state === value)

            state = value

            console.log('reducer depois da API ', {...state})
            
            return {...state}

        case REMOVE_PRODUCT:  
            state = value
            return {...state}
        default:
            return state
    }
}

const clone = obj => Object.assign(defaultState, ...obj);