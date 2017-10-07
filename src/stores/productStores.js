import { createStore } from 'redux'

const defaultState = {
    productsResume: [{
        name: "Teste",
        lastPrice: 0,
        lowerPrice: 0,
        higherPrice: 0
    }]
}

export const store = createStore((state = defaultState) => {
    return state;
})