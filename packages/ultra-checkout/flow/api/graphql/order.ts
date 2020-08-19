import { query } from './query';
import { APISelection } from '../integration';

import { gql } from '@apollo/client';

const CREATE_ORDER = gql`
  mutation orderCreate($order: OrderInput) {
    orderCreate(order: $order)
  }
`;

const SUBMIT_ORDER = gql`
  mutation orderSubmit($orderNumber: String) {
    orderSubmit(number: $orderNumber)
  }
`;

export const order: APISelection<any> = {
  add: async ({ lineItems, orderMode }) => {
    return query({
      query: CREATE_ORDER,
      variables: { order: { lineItems, orderMode } },
    });
  },
  submit: async ({ orderNumber }) => {
    return query({
      query: SUBMIT_ORDER,
      variables: { orderNumber },
    });
  },
};
