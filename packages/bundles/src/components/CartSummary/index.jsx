import React, { useContext } from "react";

import { CartContext } from "../../CartContext/CartContext.js";

import { Wrap, Title, PlanId, PlanSelector, Plan, Cta } from "./styles";

export default () => {
  const { cart } = useContext(CartContext);
  return (
    <Wrap>
      <Title>Your Cart: </Title>
      {!cart.length && <p>is empty</p>}
      {!!cart.length &&
        cart.map((product) => (
          <div>
            <p>Product ID: {product.productName}</p>
            <p>Product ID: {product.id}</p>
            <p>Plan Legnth: {product.planLength}</p>
          </div>
        ))}
    </Wrap>
  );
};
