import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

// it('renders without crashing', () => {
//   const div = document.createElement('div');
//   ReactDOM.render(<App />, div);
// });

describe('should get lower price', () => {
  test('equals 2 when lastprice is 2 and inputing 3', () => {
    let product = {lastPrice: 2};
    let expectedPrice = 2;

    let app = new App();

    expect(app.findLowerPricesHistory(product, 3)).toBe(expectedPrice)
  });

  test('equals 2 when lastprice is 3 and inputing 2', () => {
    let product = {lastPrice: 3};
    let expectedPrice = 2;

    let app = new App();

    expect(app.findLowerPricesHistory(product, 2)).toBe(expectedPrice)
  });

  test('equals 2 when lastprice is 5 and inputing 4 and lowerPrice is 2', () => {
    let product = {lastPrice: 5, lowerPrice: 2};
    let expectedPrice = 2;

    let app = new App(); 

    expect(app.findLowerPricesHistory(product, 4)).toBe(expectedPrice)
  });
})

