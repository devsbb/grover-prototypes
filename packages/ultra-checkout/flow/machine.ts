import { Machine, assign } from 'xstate';
import { CheckoutValues, CartValues } from './types';

export const createCheckoutMachine = (order: CartValues) => {
  return Machine<CheckoutValues>(
    {
      id: 'checkout',
      initial: 'idle',
      context: {
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
          on: {
            STEP_CHANGE: 'summary',
            STEP_BACK: 'payment',
            'GOTO.shippingAddress': 'shippingAddress',
            'GOTO.homeAddress': 'homeAddress',
            'GOTO.payment': 'payment',
          },
        },
        summary: {
          on: { STEP_CHANGE: 'idle', STEP_BACK: 'review' },
        },
      },
    },
    {
      guards: {
        emptyHomeAddress: ({ order }) =>
          Boolean(
            order && !order.homeAddress?.city && order.shippingAddress?.city
          ),
        filledOut: ({ order }) =>
          Boolean(
            order &&
              order.paymentMethod?.id &&
              order.homeAddress?.city &&
              order.shippingAddress?.city
          ),
        emptyPaymentMethod: ({ order }) =>
          Boolean(
            order &&
              order.shippingAddress?.city &&
              order.homeAddress?.city &&
              !order.paymentMethod
          ),
      },
    }
  );
};
