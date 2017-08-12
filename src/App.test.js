import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

// it('renders without crashing', () => {
//   const div = document.createElement('div');
//   ReactDOM.render(<App />, div);
// });

test('should_get_lower_price', () => {
  let product = {lastPrice: 2};
  let expectedPrice = 2;

  let app = new App();

  expect(app.findLowerPricesHistory(product, 3)).toBe(expectedPrice)
});