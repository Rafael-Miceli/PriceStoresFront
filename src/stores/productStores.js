import { persistStore, persistCombineReducers, autoRehydrate } from 'redux-persist'
import storage from 'redux-persist/es/storage'
import { createStore, applyMiddleware, compose } from 'redux'
import { createLogger } from 'redux-logger'
import thunk from 'redux-thunk'
import { productReducer } from '../reducers/products'

const config = {
  key: 'root',
  storage,
  debug: true
}

const middleware = [ thunk ];
if (process.env.NODE_ENV !== 'production') {
  middleware.push(createLogger())
}

const reducer = persistCombineReducers(config, {reducer: productReducer})

export default function configureStore() {
  let store = createStore(reducer, applyMiddleware(...middleware))

  let persistor = persistStore(store)
  return { store, persistor }
}
