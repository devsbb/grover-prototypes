import { query } from './query';
import { Address } from '../types';
import { APISelection } from './integration';

export const shippingAddress: APISelection<Address> = {
  add: async ({ orderNumber }, { value }) => {
    return query({
      endpoint: `orders/${orderNumber}/address`,
      method: 'PATCH',
      body: { type: 'shipping', address: value },
    });
  },
  update: async ({ orderNumber }, { value }) => {
    return query({
      endpoint: `orders/${orderNumber}/address`,
      method: 'PATCH',
      body: { type: 'shipping', address: value },
    });
  },
};

export const billingAddress: APISelection<Address> = {
  add: async ({ orderNumber }, { value }) => {
    return query({
      endpoint: `orders/${orderNumber}/address`,
      method: 'PATCH',
      body: { type: 'billing', address: value },
    });
  },
  update: async ({ orderNumber }, { value }) => {
    return query({
      endpoint: `orders/${orderNumber}/address`,
      method: 'PATCH',
      body: { type: 'billing', address: value },
    });
  },
};
