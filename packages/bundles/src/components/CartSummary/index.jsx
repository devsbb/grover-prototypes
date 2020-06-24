import React, { useContext } from "react";

import { CartContext } from "../../CartContext/CartContext.js";

import { Wrap, Title, PlanId, PlanSelector, Plan, Cta } from "./styles";

export default () => {
  return (
    <Wrap>
      <Title>Your Cart:</Title>
    </Wrap>
  );
};
