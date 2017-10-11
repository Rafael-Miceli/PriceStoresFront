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
    fetch('http://localhost:5000/api/product', {
        method: 'GET',
    })
    .then(response => {
        if(response.status !== 200)
            console.log("Algo deu errado ", response)

        response.json()
        .then(json => {
            console.log("json retornado ", json)
            cb(json);
        })
    });
}

//https://developers.google.com/web/updates/2015/03/introduction-to-fetch