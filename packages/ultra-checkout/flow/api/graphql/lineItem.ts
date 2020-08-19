import { query } from './query';

export const lineItem = {
  add: ({ orderNumber }, item) => {
    console.log(item);
    return query({
      endpoint: `orders/${orderNumber}/line_items/`,
      method: 'POST',
      body: { item },
    });
  },
  delete: ({ orderNumber }, id) =>
    query({
      endpoint: `orders/${orderNumber}/line_items/${id}`,
      method: 'DELETE',
    }),
  update: ({ orderNumber }, item) => {
    const { id } = item;
    return query({
      endpoint: `orders/${orderNumber}/line_items/${id}`,
      method: 'PATCH',
      body: { item },
    });
  },
};
