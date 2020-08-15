import { Machine, assign } from 'xstate';
import { CheckoutValues, CartValues } from './types';

export const createCheckoutMachine = (order: CartValues) => {
  return Machine<CheckoutValues>(
    {
      id: 'checkout',
      initial: 'idle',
      context: {
        auth: null,
        user: null,
        order,
      },
      on: {
        update: {
          actions: assign({
            order: (ctx, e) => {
              const { step, updated } = e.value;
              return {
                ...ctx.order,
                [step]: { ...ctx.order[step], ...updated },
              };
            },
          }),
        },
      },
      states: {
        idle: {
          on: {
            STEP_CHANGE: [
              {
                target: 'review',
                cond: 'filledOut',
              },
              {
                target: 'homeAddress',
                cond: 'emptyHomeAddress',
              },
              {
                target: 'payment',
                cond: 'emptyPaymentMethod',
              },
              {
                target: 'shippingAddress',
              },
            ],
          },
        },
        shippingAddress: {
          on: { STEP_CHANGE: 'homeAddress', STEP_BACK: 'idle' },
        },
        homeAddress: {
          on: { STEP_CHANGE: 'payment', STEP_BACK: 'shippingAddress' },
        },
        payment: {
          on: { STEP_CHANGE: 'review', STEP_BACK: 'homeAddress' },
        },
        review: {
          on: { STEP_CHANGE: 'summary', STEP_BACK: 'payment' },
        },
        summary: {
          on: { STEP_CHANGE: 'idle', STEP_BACK: 'review' },
        },
      },
    },
    {
      guards: {
        emptyHomeAddress: ({ order }) => Boolean(order && !order.homeAddress),
        filledOut: ({ order }) =>
          Boolean(
            order &&
              order.paymentMethod &&
              order.homeAddress &&
              order.shippingAddress
          ),
        emptyPaymentMethod: ({ order }) =>
          Boolean(order && !order.paymentMethod),
      },
    }
  );
};
