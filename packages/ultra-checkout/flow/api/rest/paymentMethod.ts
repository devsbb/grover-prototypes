export const paymentMethod = {
  add: ({ orderNumber }, paymentMethod) =>
    Promise.resolve({ data: { orderNumber, paymentMethod } }),
  update: ({ orderNumber }, paymentMethod) =>
    Promise.resolve({ data: { orderNumber, paymentMethod } }),
};
