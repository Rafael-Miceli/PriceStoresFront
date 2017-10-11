
export const getAllProductsResume = cb => {
    console.log("Buscando produtos na base")    
        
    fetch('http://localhost:5001/api/product', {
        method: 'GET'
    })
    .then(response => {
        console.log("Resposta ", response.json())
        cb(response.json())
    });
    //setTimeout(cb(defaultState.productsResume), 500)
}