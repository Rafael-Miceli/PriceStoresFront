const defaultState = {
    productToSave:{
        name: '',
        price: 0
    },
    productsResume: []
}

const baseAddress= "http://localhost:53838";


export const getAllProductsResume = cb => {
    console.log("Buscando produtos na base")
    fetch(baseAddress + '/api/product')
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

export const addProduct = (product, cb) => {
    console.log("Adicionando produto na base")
    fetch(baseAddress + '/api/product', {
        method: 'POST',
        //mode: "cors", 
        headers: new Headers({
          'Content-Type': 'application/json'
          //'Access-Control-Allow-Origin': '*'
        }),
        body: JSON.stringify(product)
    })
    .then(response => console.log(response.json()))
    .catch(error => {
        console.log("Algo deu errado ", error)            
        cb(null)        
    })
}

export const updateProduct = (product, cb) => {
    console.log("Atualizando produto na base")
    fetch(baseAddress + '/api/product', {
        method: 'PUT',
        //mode: "cors", 
        headers: new Headers({
          'Content-Type': 'application/json'
          //'Access-Control-Allow-Origin': '*'
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
