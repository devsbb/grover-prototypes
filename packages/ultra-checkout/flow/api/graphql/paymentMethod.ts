import { query } from './query';
import { gql } from '@apollo/client';

const ADD_PAYMENT_METHOD = gql`
  mutation addPaymentMethod(
    $order: CartOrderInput
    $item: PaymentMethodStubInput
  ) {
    orderWalletAdd(order: $order, wallet: $item) {
      orderMode
      shippingAddress {
        city
        line1: address1
      }
    }
  }
`;

const UPDATE_PAYMENT_METHOD = gql`
  mutation changePaymentMethod(
    $order: StrCartOrderInputing
    $item: PaymentMethodStubInput
  ) {
    orderWalletChange(order: $order, wallet: $item) {
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
export const paymentMethod = {
  add: ({ lineItems, orderNumber: number }, { id, type = 'CARD' }) => {
    const items = lineItems.map(({ quantity, variant, ...rest }) => rest);
    const item = { id, type };
    return query({
      query: ADD_PAYMENT_METHOD,
      variables: {
        order: { lineItems: items, number, paymentMethod: item },
        item,
      },
    });
  },
  update: ({ lineItems, orderNumber: number }, { id, type = 'CARD' }) => {
    const items = lineItems.map(({ quantity, variant, ...rest }) => rest);
    const item = { id, type };

    return query({
      query: UPDATE_PAYMENT_METHOD,
      variables: {
        order: { lineItems: items, number, paymentMethod: item },
        item,
      },
    });
  },
};
