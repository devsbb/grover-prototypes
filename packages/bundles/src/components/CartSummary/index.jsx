import React, { useContext } from "react";

import { CartContext } from "../../CartContext/CartContext.js";

import { Wrap, Title, ProductsWrap } from "./styles";

export default () => {
  const { cart } = useContext(CartContext);
  return (
    <Wrap>
      <Title>Your Cart: </Title>
      {!cart.length && <p>...is empty</p>}
      <ProductsWrap>
        {!!cart.length &&
          cart.map((product) => (
            <div>
              <p>Product Name: {product.title}</p>
              <p>Product ID: {product.id}</p>
              <p>Plan Length: {product.planLength}</p>
            </div>
          ))}
        </ProductsWrap>
    </Wrap>
  );
};
