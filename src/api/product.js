const defaultState = {
    productToSave:{
        name: '',
        price: 0
    },
    productsResume: []
}


export const getAllProductsResume = cb => {
    console.log("Buscando produtos na base")
    fetch('http://localhost:5000/api/product')
    .then(response => {
        if(response.status !== 200) {
            console.log("Algo deu errado ", response)            
            cb(defaultState)
        }

        response.json()
        .then(json => {            
            console.log("json retornado ", json)
            defaultState.productsResume = json
            cb(defaultState);
        })
    })
    .catch(error => {
        console.log("Algo deu errado ", error)            
        cb(defaultState)        
    })
}

export const AddProduct = cb => {
    console.log("Buscando produtos na base")
    fetch('http://localhost:5000/api/product')
    .then(response => {
        if(response.status !== 200) {
            console.log("Algo deu errado ", response)            
            cb(defaultState)
        }

        response.json()
        .then(json => {            
            console.log("json retornado ", json)
            defaultState.productsResume = json
            cb(defaultState);
        })
    })
    .catch(error => {
        console.log("Algo deu errado ", error)            
        cb(defaultState)        
    })
}

export const UpdateProduct = cb => {
    console.log("Buscando produtos na base")
    fetch('http://localhost:5000/api/product')
    .then(response => {
        if(response.status !== 200) {
            console.log("Algo deu errado ", response)            
            cb(defaultState)
        }

        response.json()
        .then(json => {            
            console.log("json retornado ", json)
            defaultState.productsResume = json
            cb(defaultState);
        })
    })
    .catch(error => {
        console.log("Algo deu errado ", error)            
        cb(defaultState)        
    })
}

//  
