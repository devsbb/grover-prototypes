import React, { useState } from 'react';

const CartContext = React.createContext({});

const CartProvider = ({children}) => {
  const [activePlanIndex, setActivePlanIndex] = useState(0);
  const [cart, setCart] = useState([]);
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

  const addToCart = ({productName, id, planLength})=> setCart([...cart, {productName, id, planLength}])

  return (
    <CartContext.Provider value={{mainProduct, cart, setCart, activePlanIndex, setActivePlanIndex, addToCart}}>
      {children}
    </CartContext.Provider>
  );
}

export { CartContext, CartProvider };