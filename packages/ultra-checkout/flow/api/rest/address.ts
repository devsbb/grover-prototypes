import { query } from './query';
import { Address } from '../../types';
import { APISelection } from '../integration';

export const shippingAddress: APISelection<Address> = {
  add: async ({ orderNumber }, address) => {
    return query({
      endpoint: `orders/${orderNumber}/address`,
      method: 'PATCH',
      body: { type: 'shipping', address },
    });
  },
  update: async ({ orderNumber }, address) => {
    return query({
      endpoint: `orders/${orderNumber}/address`,
      method: 'PATCH',
      body: { type: 'shipping', address },
    });
  },
};

export const billingAddress: APISelection<Address> = {
  add: async ({ orderNumber }, address) => {
    return query({
      endpoint: `orders/${orderNumber}/address`,
      method: 'PATCH',
      body: { type: 'billing', address },
    });
  },
  update: async ({ orderNumber }, address) => {
    return query({
      endpoint: `orders/${orderNumber}/address`,
      method: 'PATCH',
      body: { type: 'billing', address },
    });
  },
};
