const defaultState = {
    productsResume: [{
        name: "Teste",
        lastPrice: 0,
        lowerPrice: 0,
        higherPrice: 0
    }]
}

export const getAllProductsResume = cb => {
    console.log("Buscando produtos na base")
    setTimeout(cb(defaultState.productsResume), 500)
}