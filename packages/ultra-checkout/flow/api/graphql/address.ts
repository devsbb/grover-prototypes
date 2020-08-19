import { query } from './query';
import { Address } from '../../types';
import { APISelection } from '../integration';

import { gql } from '@apollo/client';

const ADD_ADDRESS = gql`
  mutation addAddress(orderNumber: String, address: AddressInput) {
   orderAddressAdd(number: $orderNumber, address: $address) {
     orderMode
      shippingAddress {
        city
        line1: address1
      }
    }
  }
`;

const CHANGE_ADDRESS = gql`
  mutation addAddress(orderNumber: String, address: AddressInput) {
   orderAddressChange(number: $orderNumber, address: $address) {
     orderMode
      shippingAddress {
        city
        line1: address1
      }
    }
  }
`;

export const shippingAddress: APISelection<Address> = {
  add: async ({ orderNumber }, address) => {
    return query({
      query: ADD_ADDRESS,
      variables: { orderNumber, address: { ...address, type: 'shipping' } },
    });
  },
  update: async ({ orderNumber }, address) => {
    return query({
      query: CHANGE_ADDRESS,
      variables: { orderNumber, address: { ...address, type: 'shipping' } },
    });
  },
};

export const billingAddress: APISelection<Address> = {
  add: async ({ orderNumber }, address) => {
    return query({
      query: ADD_ADDRESS,
      variables: { orderNumber, address: { ...address, type: 'billing' } },
    });
  },
  update: async ({ orderNumber }, address) => {
    return query({
      query: CHANGE_ADDRESS,
      variables: { orderNumber, address: { ...address, type: 'billing' } },
    });
  },
};
