import React from 'react';
import ReactDOM from 'react-dom';
import { saveProduct as sut } from './actions/App';

describe('should get lower price', () => {
  test('equals 2 when lastprice is 2, lowestprice is 2, and inputing 3', () => {
    let inputingPrice = 3    
    let productState = { 
      productToSave: {price: inputingPrice, name: 'a' },
      productsResume: [{
        name: 'a',
        lastPrice: 2,
        lowerPrice: 2
      }]
    }
    
    let expectedPrice = 2
    let result = sut(productState).value

    expect(result.productsResume[0].lowerPrice).toBe(expectedPrice)
  });

  test('equals 2 when lastprice is 3, lowestprice is 3 and inputing 2', () => {
    let inputingPrice = 2    
    let productState = { 
      productToSave: {price: inputingPrice, name: 'a' },
      productsResume: [{
        name: 'a',
        lastPrice: 3,
        lowerPrice: 3
      }]
    }
    
    let expectedPrice = 2
    let result = sut(productState).value

    expect(result.productsResume[0].lowerPrice).toBe(expectedPrice)
  });

  test('equals 2 when lastprice is 5 and inputing 4 and lowerPrice is 2', () => {
    let inputingPrice = 4    
    let productState = { 
      productToSave: {price: inputingPrice, name: 'a' },
      productsResume: [{
        name: 'a',
        lastPrice: 5,
        lowerPrice: 2
      }]
    }
    
    let expectedPrice = 2
    let result = sut(productState).value

    expect(result.productsResume[0].lowerPrice).toBe(expectedPrice)
  });

  test('equals 2 when lastprice is 2 and inputing 4 and lowerPrice is 2', () => {
    let inputingPrice = 4    
    let productState = { 
      productToSave: {price: inputingPrice, name: 'a' },
      productsResume: [{
        name: 'a',
        lastPrice: 5,
        lowerPrice: 2
      }]
    }
    
    let expectedPrice = 2
    let result = sut(productState).value

    expect(result.productsResume[0].lowerPrice).toBe(expectedPrice)
  });

  test('equals 1.75 when lastprice is 2 and inputing 4 and lowerPrice is 1.75', () => {
    let inputingPrice = 4    
    let productState = { 
      productToSave: {price: inputingPrice, name: 'a' },
      productsResume: [{
        name: 'a',
        lastPrice: 2,
        lowerPrice: 1.75
      }]
    }
    
    let expectedPrice = 1.75
    let result = sut(productState).value

    expect(result.productsResume[0].lowerPrice).toBe(expectedPrice)
  });

  test('equals 1.75 when lastprice is 1.80 and inputing 1.75 and lowerPrice is 1.77', () => {
    let inputingPrice = 1.75    
    let productState = { 
      productToSave: {price: inputingPrice, name: 'a' },
      productsResume: [{
        name: 'a',
        lastPrice: 1.80,
        lowerPrice: 1.77
      }]
    }
    
    let expectedPrice = 1.75
    let result = sut(productState).value

    expect(result.productsResume[0].lowerPrice).toBe(expectedPrice)
  });
});

describe('should get higher price', () => {
  test('equals 3 when lastprice is 2 and inputing 3', () => {
    let inputingPrice = 3    
    let productState = { 
      productToSave: {price: inputingPrice, name: 'a' },
      productsResume: [{
        name: 'a',
        lastPrice: 2,
        higherPrice: 2
      }]
    }
    
    let expectedPrice = 3
    let result = sut(productState).value

    expect(result.productsResume[0].higherPrice).toBe(expectedPrice)
  });

  test('equals 3 when lastprice is 3 and inputing 2', () => {
    let inputingPrice = 2    
    let productState = { 
      productToSave: {price: inputingPrice, name: 'a' },
      productsResume: [{
        name: 'a',
        lastPrice: 3,
        higherPrice: 2
      }]
    }
    
    let expectedPrice = 3
    let result = sut(productState).value

    expect(result.productsResume[0].higherPrice).toBe(expectedPrice)
  });

  test('equals 5 when lastprice is 5 and inputing 4 and higherPrice is 5', () => {
    let inputingPrice = 4
    let productState = { 
      productToSave: {price: inputingPrice, name: 'a' },
      productsResume: [{
        name: 'a',
        lastPrice: 5,
        higherPrice: 5
      }]
    }
    
    let expectedPrice = 5
    let result = sut(productState).value

    expect(result.productsResume[0].higherPrice).toBe(expectedPrice)
  });

  test('equals 4 when lastprice is 2 and inputing 4 and higherPrice is 2', () => {
    let inputingPrice = 4
    let productState = { 
      productToSave: {price: inputingPrice, name: 'a' },
      productsResume: [{
        name: 'a',
        lastPrice: 2,
        higherPrice: 2
      }]
    }
    
    let expectedPrice = 4
    let result = sut(productState).value

    expect(result.productsResume[0].higherPrice).toBe(expectedPrice)
  });

  test('equals 4 when lastprice is 1 and inputing 4 and higherPrice is 1.75', () => {
    let inputingPrice = 4
    let productState = { 
      productToSave: {price: inputingPrice, name: 'a' },
      productsResume: [{
        name: 'a',
        lastPrice: 1,
        higherPrice: 1.75
      }]
    }
    
    let expectedPrice = 4
    let result = sut(productState).value

    expect(result.productsResume[0].higherPrice).toBe(expectedPrice)
  });

  test('equals 1.80 when lastprice is 1.80 and inputing 1.75 and higherPrice is 1.77', () => {
    let inputingPrice = 1.75
    let productState = { 
      productToSave: {price: inputingPrice, name: 'a' },
      productsResume: [{
        name: 'a',
        lastPrice: 1.80,
        higherPrice: 1.77
      }]
    }
    
    let expectedPrice = 1.80
    let result = sut(productState).value

    expect(result.productsResume[0].higherPrice).toBe(expectedPrice)
  });
});