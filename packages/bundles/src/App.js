import React from "react";

import CartSummary from "./components/CartSummary";
import ProductCard from "./components/ProductCard";
import BundleBanner from "./components/BundleBanner";
import { CartProvider } from './CartContext/CartContext';

import { Wrap, TopWrap } from './styles';

export default () => (
  <CartProvider>
    <Wrap>
      <TopWrap>
        <CartSummary />
        <ProductCard />
      </TopWrap>
      <BundleBanner />
    </Wrap>
  </CartProvider>
);
