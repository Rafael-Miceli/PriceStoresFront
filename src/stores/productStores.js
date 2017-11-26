import { persistStore, persistCombineReducers } from 'redux-persist'
import storage from 'redux-persist/es/storage'
import { createStore, applyMiddleware } from 'redux'
import { createLogger } from 'redux-logger'
import thunk from 'redux-thunk'
import { productReducer } from '../reducers/products'

const config = {
  key: 'root',
  storage
}

const middleware = [ thunk ];
if (process.env.NODE_ENV !== 'production') {
  middleware.push(createLogger())
}

const reducer = persistCombineReducers(config, {reducer: productReducer})

//export const store = createStore(reducer, applyMiddleware(...middleware))

//export const persistor = persistStore(store)

export default function configureStore() {

  console.log('persist storage ', storage)
  console.log('product reducer ', productReducer)
  console.log('combined reducers ', reducer)

  let store = createStore(reducer, applyMiddleware(...middleware))

  console.log('Store criada')

  let persistor = persistStore(store)
  return { store, persistor }
}
