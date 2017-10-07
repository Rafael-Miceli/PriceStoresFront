import { createStore } from 'redux'
import { productReducer } from '../reducers/products'

export const store = createStore(productReducer);