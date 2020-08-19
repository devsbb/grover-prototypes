import { query } from './query';
import { APISelection } from './index';

export const order: APISelection<any> = {
  add: (order) =>
    query({
      endpoint: 'orders',
      method: 'POST',
      body: order,
    }),
  submit: ({ orderNumber }) =>
    query({ endpoint: `orders/${orderNumber}/complete`, method: 'PATCH' }),
};
