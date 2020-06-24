import React, { useContext } from "react";

import { CartContext } from "../../CartContext/CartContext.js";

import { Wrap, Title, PlanId, PlanSelector, Plan, Cta } from "./styles";

export default () => {
  const [mainProduct] = useContext(CartContext);
  console.log('mainProduct', mainProduct);
  return (
    <Wrap>
      <Title>{mainProduct.title}</Title>
      <PlanId>ID: {mainProduct.id}</PlanId>
      <PlanSelector> {mainProduct.plans.map((plan)=> <Plan key={plan}>{plan}</Plan>)}</PlanSelector>
      <Cta>add to cart</Cta>
    </Wrap>
  );
};
