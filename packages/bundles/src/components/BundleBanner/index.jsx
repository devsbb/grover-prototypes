import React, { useContext } from "react";

import { CartContext } from "../../CartContext/CartContext.js";

import { Wrap, Title, Description, ProductWrap, ProductTitle, ProductId, Cta } from './styles';

export default () => {
  const [ mainProduct ] = useContext(CartContext);
  const { title, id, bundleProducts } = mainProduct;
  return (
  <Wrap>
    <Title>Product Bundle</Title>
    <Description>Add these products and save $$$</Description>
    <Cta>add both products to cart</Cta>
  </Wrap>
)};
