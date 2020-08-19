import { query } from './query';
import { Address } from '../../types';
import { APISelection } from '../integration';

import { gql } from '@apollo/client';

const ADD_ADDRESS = gql`
  mutation addAddress($orderNumber: String, $address: CartAddressInput) {
    order: orderAddressAdd(number: $orderNumber, address: $address) {
      orderMode
      billingAddress {
        city
        line1: address1
      }
      shippingAddress {
        city
        line1: address1
      }
    }
  }
`;

const CHANGE_ADDRESS = gql`
  mutation addAddress($orderNumber: String, $address: CartAddressInput) {
    order: orderAddressChange(number: $orderNumber, address: $address) {
      orderMode
      billingAddress {
        city
        line1: address1
      }
      shippingAddress {
        city
        line1: address1
      }
    }
  }
`;

export const shippingAddress: APISelection<Address> = {
  add: async (
    { orderNumber },
    { line1: address1, line2: address2, ...address }
  ) => {
    return query({
      query: ADD_ADDRESS,
      variables: {
        orderNumber,
        address: {
          address1,
          address2,
          ...address,
          type: 'SHIPPING',
        },
      },
    });
  },
  update: async ({ orderNumber }, address) => {
    return query({
      query: CHANGE_ADDRESS,
      variables: { orderNumber, address: { ...address, type: 'SHIPPING' } },
    });
  },
};

export const billingAddress: APISelection<Address> = {
  add: async (
    { orderNumber },
    { line1: address1, line2: address2, ...address }
  ) => {
    return query({
      query: ADD_ADDRESS,
      variables: {
        orderNumber,
        address: {
          address1,
          address2,
          ...address,
          type: 'BILLING',
        },
      },
    });
  },
  update: async ({ orderNumber }, address) => {
    return query({
      query: CHANGE_ADDRESS,
      variables: { orderNumber, address: { ...address, type: 'BILLING' } },
    });
  },
};
