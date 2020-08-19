import { query } from './query';
import { gql } from '@apollo/client';

const ADD_LINE_ITEM = gql`
  mutation addLineItem(orderNumber: String, item: CartLineItemInput) {
   orderLineItemAdd(number: $orderNumber, item: $item) {
     orderMode
      shippingAddress {
        city
        line1: address1
      }
    }
  }
`;

const REMOVE_LINE_ITEM = gql`
  mutation removeLineItem(orderNumber: String, item: CartLineItemInput) {
   orderLineItemRemove(number: $orderNumber, item: $item) {
     orderMode
     lineItems {
       ... on OrderLineItem {
         imageUrl
         name
         coreAttribute
       }
     }
    }
  }
`;

const UPDATE_LINE_ITEM = gql`
  mutation editLineItem(orderNumber: String, item: CartLineItemInput) {
   orderLineItemEdit(number: $orderNumber, item: $item) {
    orderMode
     lineItems {
       ... on OrderLineItem {
         imageUrl
         name
         coreAttribute
       }
     }
  }
  }
`;
export const lineItem = {
  add: ({ orderNumber }, item) => {
    return query({
      query: ADD_LINE_ITEM,
      variables: { item },
    });
  },
  delete: ({ orderNumber }, id) =>
    query({
      query: REMOVE_LINE_ITEM,
      variables: { orderNumber, id },
    }),
  update: ({ orderNumber }, item) => {
    const { id } = item;
    return query({
      query: UPDATE_LINE_ITEM,
      variables: { orderNumber, id, item },
    });
  },
};
