import React, { useState } from 'react';

const CartContext = React.createContext();

const CartProvider = ({children}) => {

  const [cart, setCart] = useState([123,123,123]);

  const bundleProduct = {
    title: 'Bundle Product',
    id: 2345,
    plans: [1,3,6,9,12],
    bundleProducts: null,
  };

  const mainProduct = {
    title: 'Main Product',
    id: 1234,
    plans: [1,3,6,9,12],
    bundleProducts: [ bundleProduct ]
  };

  return (
    <CartContext.Provider value={[mainProduct, cart, setCart]}>
      {children}
    </CartContext.Provider>
  );
}

export { CartContext, CartProvider };