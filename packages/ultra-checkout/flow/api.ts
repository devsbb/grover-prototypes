interface QueryParams {
  endpoint: string;
  method: string;
  body?: object;
  query?: string;
}
const query = async ({
  endpoint,
  method = 'GET',
  query,
  body,
}: QueryParams) => {
  const url = !query
    ? `http://localhost:3000/api/${endpoint}`
    : `http://localhost:3000/api/${endpoint}?${query}`;
  const res = await fetch(url, {
    method,
    headers: {
      'Content-Type': 'application/json',
    },
    ...(body ? { body: JSON.stringify(body) } : {}),
  });
  return res.json();
};
export const CheckoutApi = {
  order: {
    create: (order) =>
      query({
        endpoint: 'orders',
        method: 'POST',
        body: order,
      }),
    submit: ({ orderNumber }) =>
      query({ endpoint: `orders/${orderNumber}/complete`, method: 'PATCH' }),
  },
  paymentMethod: {
    add: () => Promise.resolve(),
    update: () => Promise.resolve(),
  },
  shippingAddress: {
    add: ({ orderNumber }, test) => {
      console.log(test);
      return query({
        endpoint: `orders/${orderNumber}/address`,
        method: 'PATCH',
        body: { type: 'shipping', address: test },
      });
    },
    update: () => Promise.resolve(),
  },
  homeAddress: {
    add: ({ orderNumber }, test) => {
      console.log({ orderNumber, test });
      return query({
        endpoint: `orders/${orderNumber}/address`,
        method: 'PATCH',
        body: { type: 'billing', address: test },
      });
    },
    update: () => Promise.resolve(),
  },
  lineItem: {
    add: ({ orderNumber }, item) => {
      console.log(item);
      return query({
        endpoint: `orders/${orderNumber}/line_items`,
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
  },
};

type EntityKey =
  | 'paymentMethod'
  | 'shippingAddress'
  | 'homeAddress'
  | 'lineItem'
  | 'order';

type Operation = 'add' | 'delete' | 'update' | 'submit';
export interface ApiAccessor {
  entity: EntityKey;
  operation: Operation;
  payload: any;
}
