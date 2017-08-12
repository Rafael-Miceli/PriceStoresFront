import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

// it('renders without crashing', () => {
//   const div = document.createElement('div');
//   ReactDOM.render(<App />, div);
// });

test('should_get_lower_price', () => {
  let product = {lastPrice: 2};
  let expectedProduct = {lastPrice: 2, lowerPrice: 2};
  expect(App.updateLowerPricesHistory(product, 3)).toBe(expectedProduct)
});