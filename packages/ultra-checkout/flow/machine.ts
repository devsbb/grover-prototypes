import { Machine, assign } from 'xstate';
import { Step, CheckoutContext } from './types';

const Cart = {
  orderNumber: 'M123456890',
  guestToken: 'test',
  shippingAddress: {},
  homeAddress: {},
  payment: {},
  step: Step.shippingAddress,
};

export const checkoutMachine = Machine<CheckoutContext>({
  id: 'checkout',
  initial: 'idle',
  context: {
    auth: null,
    user: null,
    order: Cart,
  },
  on: {
    update: {
      actions: assign({
        order: (ctx, e) => {
          const { step, updated } = e.value;
          return { ...ctx.order, [step]: { ...ctx.order[step], ...updated } };
        },
      }),
    },
  },
  states: {
    idle: {
      on: {
        STEP_CHANGE: 'shippingAddress',
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
});
