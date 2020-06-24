import React, { useContext } from "react";

import { CartContext } from "../../CartContext/CartContext.js";

import {
  Wrap,
  Title,
  Description,
  ProductsWrap,
  ProductCard,
  ProductTitle,
  ProductId,
  Cta,
} from "./styles";

export default () => {
  const { mainProduct } = useContext(CartContext);
  const { title, id, bundleProducts } = mainProduct;
  return (
    <Wrap>
      <Title>Product Bundle</Title>
      <Description>Add these products and save $$$</Description>
      <ProductsWrap>
      <ProductCard>
        <ProductTitle>{title}</ProductTitle>
        <ProductId>ID: {id}</ProductId>
      </ProductCard>
      {bundleProducts.map((product) => (
        <ProductCard key={product}>
          <ProductTitle>{product.title}</ProductTitle>
          <ProductId>ID: {product.id}</ProductId>
        </ProductCard>
      ))}
      </ProductsWrap>
      <Cta>add both products to cart</Cta>
    </Wrap>
  );
};
