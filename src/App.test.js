import React from 'react';
import ReactDOM from 'react-dom';
import { saveProduct } from './actions/App';

describe('should get lower price', () => {
  test('equals 2 when lastprice is 2 and inputing 3', () => {
    let inputingPrice = 3    
    let productState = { 
      productToSave: {price: 2, name: '' },
      productsResume: [{
        lastPrice: 2,
        lowerPrice: 2
      }]
    }
    
    let expectedPrice = 2

    expect(saveProduct(productState).value.productsResume[1].lowerPrice).toBe(expectedPrice)
  });

  test('equals 2 when lastprice is 3 and inputing 2', () => {
    let product = {lastPrice: 3};
    let expectedPrice = 2;

    expect(saveProduct(product, 2)).toBe(expectedPrice)
  });

  test('equals 2 when lastprice is 5 and inputing 4 and lowerPrice is 2', () => {
    let product = {lastPrice: 5, lowerPrice: 2};
    let expectedPrice = 2;

    let app = new App(); 

    expect(app.findLowerPricesHistory(product, 4)).toBe(expectedPrice)
  });

  test('equals 2 when lastprice is 2 and inputing 4 and lowerPrice is 2', () => {
    let product = {lastPrice: 2, lowerPrice: 2};
    let expectedPrice = 2;

    let app = new App(); 

    expect(app.findLowerPricesHistory(product, 4)).toBe(expectedPrice)
  });

  test('equals 1.75 when lastprice is 2 and inputing 4 and lowerPrice is 1.75', () => {
    let product = {lastPrice: 2, lowerPrice: 1.75};
    let expectedPrice = 1.75;

    let app = new App(); 

    expect(app.findLowerPricesHistory(product, 4)).toBe(expectedPrice)
  });

  test('equals 1.75 when lastprice is 1.80 and inputing 1.75 and lowerPrice is 1.77', () => {
    let product = {lastPrice: 1.80, lowerPrice: 1.77};
    let expectedPrice = 1.75;

    let app = new App(); 

    expect(app.findLowerPricesHistory(product, 1.75)).toBe(expectedPrice)
  });
});

describe('should get higher price', () => {
  test('equals 3 when lastprice is 2 and inputing 3', () => {
    let product = {lastPrice: 2};
    let expectedPrice = 3;

    let app = new App();

    expect(app.findHigherPricesHistory(product, 3)).toBe(expectedPrice)
  });

  test('equals 2 when lastprice is 3 and inputing 2', () => {
    let product = {lastPrice: 3};
    let expectedPrice = 3;

    let app = new App();

    expect(app.findHigherPricesHistory(product, 2)).toBe(expectedPrice)
  });

  test('equals 2 when lastprice is 5 and inputing 4 and lowerPrice is 2', () => {
    let product = {lastPrice: 5, lowerPrice: 2};
    let expectedPrice = 5;

    let app = new App(); 

    expect(app.findHigherPricesHistory(product, 4)).toBe(expectedPrice)
  });

  test('equals 2 when lastprice is 2 and inputing 4 and lowerPrice is 2', () => {
    let product = {lastPrice: 2, lowerPrice: 2};
    let expectedPrice = 4;

    let app = new App(); 

    expect(app.findHigherPricesHistory(product, 4)).toBe(expectedPrice)
  });

  test('equals 1.75 when lastprice is 2 and inputing 4 and lowerPrice is 1.75', () => {
    let product = {lastPrice: 2, lowerPrice: 1.75};
    let expectedPrice = 4;

    let app = new App(); 

    expect(app.findHigherPricesHistory(product, 4)).toBe(expectedPrice)
  });

  test('equals 1.75 when lastprice is 1.80 and inputing 1.75 and lowerPrice is 1.77', () => {
    let product = {lastPrice: 1.80, lowerPrice: 1.77};
    let expectedPrice = 1.80;

    let app = new App(); 

    expect(app.findHigherPricesHistory(product, 1.75)).toBe(expectedPrice)
  });
});