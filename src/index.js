import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import configureStore from './stores/productStores'
import { PersistGate } from 'redux-persist/es/integration/react'
import './index.css'
import App from './components/App'
import registerServiceWorker from './registerServiceWorker'

const { store, persistor } = configureStore()

render(    
    <Provider store={store}>
        <PersistGate persistor={persistor}>
            <App />
        </PersistGate>
    </Provider>, 
    document.getElementById('root')
);

registerServiceWorker();
