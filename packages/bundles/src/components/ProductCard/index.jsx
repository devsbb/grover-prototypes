import React, { useContext, useState } from "react";

import { CartContext } from "../../CartContext/CartContext.js";

import { Wrap, Title, PlanText, PlanSelector, Plan, Cta } from "./styles";

export default () => {
  const { mainProduct, activePlanIndex, setActivePlanIndex } = useContext(CartContext);
  return (
    <Wrap>
      <Title>{mainProduct.title}</Title>
      <PlanText>ID: {mainProduct.id}</PlanText>
      <PlanText>Select a rental plan</PlanText>
      <PlanSelector>
        {mainProduct.plans.map((plan, index) => (
          <Plan
            isActive={index === activePlanIndex}
            onClick={() => setActivePlanIndex(index)}
            key={plan}
          >
            {plan}
          </Plan>
        ))}
      </PlanSelector>
      <Cta>add to cart</Cta>
    </Wrap>
  );
};
