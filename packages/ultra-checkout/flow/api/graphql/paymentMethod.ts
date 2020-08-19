export const paymentMethod = {
  add: ({ orderNumber }, { value: paymentMethod }) =>
    Promise.resolve({ data: { orderNumber, paymentMethod } }),
  update: ({ orderNumber }, { value: paymentMethod }) =>
    Promise.resolve({ data: { orderNumber, paymentMethod } }),
};
