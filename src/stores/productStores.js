import { createStore } from 'redux'

const defaultState = {
    productsResume: [{
        name: "",
        lastPrice: 0,
        minPrice: 0,
        maxPrice: 0
    }]
}

const store = createStore((state = defaultState) => {
    return state;
})