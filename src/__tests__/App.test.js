import React from 'react';
import ReactDOM from 'react-dom';
import { saveProduct, removeProducts } from '../actions/App';
import  * as apiProduct from '../api/product';


const createProductObject = (name, lastPrice, lowerPrice, higherPrice) => {
  return {    
    name: name,
    lastPrice: lastPrice,
    lowerPrice: lowerPrice,
    higherPrice: higherPrice,
    categoryName: 'Sem categoria'            
  }
}

describe('should get lower price', () => {
  test('equals 2 when lastprice is 2, lowestprice is 2, and inputing 3', () => {
    let inputingPrice = 3    
    let productState = { 
      productToSave: {price: inputingPrice, name: 'a' },
      productsResume: [createProductObject('a', 2, 2, 2)],
      productsName: []
    }
    
    let expectedPrice = 2
    let result = saveProduct(productState).value

    expect(result.productsResume[0].lowerPrice).toBe(expectedPrice)
  })

  test('equals 2 when lastprice is 3, lowestprice is 3 and inputing 2', () => {
    let inputingPrice = 2    
    let productState = { 
      productToSave: {price: inputingPrice, name: 'a' },
      productsResume: [createProductObject('a', 3, 3, 3) ],
      productsName: []
    }
    
    let expectedPrice = 2
    let result = saveProduct(productState).value

    expect(result.productsResume[0].lowerPrice).toBe(expectedPrice)
  })

  test('equals 2 when lastprice is 5 and inputing 4 and lowerPrice is 2', () => {
    let inputingPrice = 4    
    let productState = { 
      productToSave: {price: inputingPrice, name: 'a' },
      productsResume: [createProductObject('a', 5, 2, 5) ],
      productsName: []
    }
    
    let expectedPrice = 2
    let result = saveProduct(productState).value

    expect(result.productsResume[0].lowerPrice).toBe(expectedPrice)
  })

  test('equals 2 when lastprice is 2 and inputing 4 and lowerPrice is 2', () => {
    let inputingPrice = 4    
    let productState = { 
      productToSave: {price: inputingPrice, name: 'a' },
      productsResume: [createProductObject('a', 5, 2, 5) ],
      productsName: []
    }
    
    let expectedPrice = 2
    let result = saveProduct(productState).value

    expect(result.productsResume[0].lowerPrice).toBe(expectedPrice)
  })

  test('equals 1.75 when lastprice is 2 and inputing 4 and lowerPrice is 1.75', () => {
    let inputingPrice = 4    
    let productState = { 
      productToSave: {price: inputingPrice, name: 'a' },
      productsResume: [createProductObject('a', 2, 1.75, 2) ],
      productsName: []
    }
    
    let expectedPrice = 1.75
    let result = saveProduct(productState).value

    expect(result.productsResume[0].lowerPrice).toBe(expectedPrice)
  })

  test('equals 1.75 when lastprice is 1.80 and inputing 1.75 and lowerPrice is 1.77', () => {
    let inputingPrice = 1.75    
    let productState = { 
      productToSave: {price: inputingPrice, name: 'a' },
      productsResume: [createProductObject('a', 1.80, 1.77, 1.80) ],
      productsName: []
    }
    
    let expectedPrice = 1.75
    let result = saveProduct(productState).value

    expect(result.productsResume[0].lowerPrice).toBe(expectedPrice)
  })
})

describe('should get higher price', () => {
  test('equals 3 when lastprice is 2 and inputing 3', () => {
    let inputingPrice = 3    
    let productState = { 
      productToSave: {price: inputingPrice, name: 'a' },
      productsResume: [createProductObject('a', 2, 1.50, 2) ],
      productsName: []
    }
    
    let expectedPrice = 3
    let result = saveProduct(productState).value

    expect(result.productsResume[0].higherPrice).toBe(expectedPrice)
  });

  test('equals 3 when lastprice is 3 and inputing 2', () => {
    let inputingPrice = 2    
    let productState = { 
      productToSave: {price: inputingPrice, name: 'a' },
      productsResume: [createProductObject('a', 3, 1.50, 2) ],
      productsName: []
    }
    
    let expectedPrice = 3
    let result = saveProduct(productState).value

    expect(result.productsResume[0].higherPrice).toBe(expectedPrice)
  })

  test('equals 5 when lastprice is 5 and inputing 4 and higherPrice is 5', () => {
    let inputingPrice = 4
    let productState = { 
      productToSave: {price: inputingPrice, name: 'a' },
      productsResume: [createProductObject('a', 5, 1.50, 5) ],
      productsName: []
    }
    
    let expectedPrice = 5
    let result = saveProduct(productState).value

    expect(result.productsResume[0].higherPrice).toBe(expectedPrice)
  })

  test('equals 4 when lastprice is 2 and inputing 4 and higherPrice is 2', () => {
    let inputingPrice = 4
    let productState = { 
      productToSave: {price: inputingPrice, name: 'a' },
      productsResume: [createProductObject('a', 2, 1.50, 2) ],
      productsName: []
    }
    
    let expectedPrice = 4
    let result = saveProduct(productState).value

    expect(result.productsResume[0].higherPrice).toBe(expectedPrice)
  })

  test('equals 4 when lastprice is 1 and inputing 4 and higherPrice is 1.75', () => {
    let inputingPrice = 4
    let productState = { 
      productToSave: {price: inputingPrice, name: 'a' },
      productsResume: [createProductObject('a', 1, 1, 1.75) ],
      productsName: []
    }
    
    let expectedPrice = 4
    let result = saveProduct(productState).value

    expect(result.productsResume[0].higherPrice).toBe(expectedPrice)
  })

  test('equals 1.80 when lastprice is 1.80 and inputing 1.75 and higherPrice is 1.77', () => {
    let inputingPrice = 1.75
    let productState = { 
      productToSave: {price: inputingPrice, name: 'a' },
      productsResume: [createProductObject('a', 1.80, 1.50, 1.80) ],
      productsName: []
    }
    
    let expectedPrice = 1.80
    let result = saveProduct(productState).value

    expect(result.productsResume[0].higherPrice).toBe(expectedPrice)
  })
})

describe('When saving a product', () => {
  test('It does not exists then call addProduct api', () => {
    let inputingPrice = 1.75
    let productState = { 
      productToSave: {price: inputingPrice, name: 'novo' },
      productsResume: [ createProductObject('a', 1.80, 1.50, 1.80) ],
      productsName: []
    }    
    let expectedPrice = 1.80

    apiProduct.addProduct = jest.fn()

    let result = saveProduct(productState).value

    expect(apiProduct.addProduct).toHaveBeenCalled();
  })

  test('It does not exists then add to product array', () => {
    let inputingPrice = 1.75
    let productState = { 
      productToSave: {price: inputingPrice, name: 'novo' },
      productsResume: [ createProductObject('a', 1.80, 1.50, 1.80) ],
      productsName: []
    }    
    
    let expectedPrice = 1.80

    apiProduct.addProduct = jest.fn()

    let result = saveProduct(productState).value

    expect(result.productsResume[1].name).toBe('novo')
  })

  test('It exists then call updateProduct api', () => {
    let inputingPrice = 1.75
    let productState = { 
      productToSave: {price: inputingPrice, name: 'a' },
      productsResume: [ createProductObject('a', 1.80, 1.50, 1.80) ]
    }    
    let expectedPrice = 1.80

    apiProduct.updateProduct = jest.fn()

    let result = saveProduct(productState).value

    expect(apiProduct.updateProduct).toHaveBeenCalled();
  })

  test('It exists then DO NOT add to product array', () => {
    let inputingPrice = 1.75
    let productState = { 
      productToSave: {price: inputingPrice, name: 'a' },
      productsResume: [ createProductObject('a', 1.80, 1.50, 1.80) ]
    }    

    let expectedPrice = 1.80

    apiProduct.updateProduct = jest.fn()

    let result = saveProduct(productState).value

    expect(result.productsResume[1]).toBeUndefined()
  })
})

describe('When deleting products', () => {
  test('If product is checked, remove it from productsResume list', () => {    
    let prod1 = createProductObject('a', 1.80, 1.50, 1.80)
    let prod2 = createProductObject('b', 1.80, 1.50, 1.80)

    prod2.checked = true

    let productState = { 
      productToSave: {},
      productsResume: [ prod1, prod2 ],
      productsName: []
    }    

    //apiProduct.addProduct = jest.fn()

    let result = removeProducts(productState).value

    expect(result.productsResume[1]).toBeUndefined()
    expect(result.productsResume[0].name).toBe('a')
  })

  test('If product is checked, remove it from productsResume list', () => {    
    let prod1 = createProductObject('a', 1.80, 1.50, 1.80)
    let prod2 = createProductObject('b', 1.80, 1.50, 1.80)
    let prod3 = createProductObject('c', 1.80, 1.50, 1.80)
    let prod4 = createProductObject('d', 1.80, 1.50, 1.80)

    prod2.checked = true
    prod4.checked = true

    let productState = { 
      productToSave: {},
      productsResume: [ prod1, prod2, prod3, prod4 ],
      productsName: []
    }    

    //apiProduct.addProduct = jest.fn()

    let result = removeProducts(productState).value

    expect(result.productsResume[2]).toBeUndefined()
    expect(result.productsResume[0].name).toBe('a')
    expect(result.productsResume[1].name).toBe('c')
  })
})
