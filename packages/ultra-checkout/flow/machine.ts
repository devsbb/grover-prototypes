import { Machine, MachineOptions, assign } from 'xstate';
import { CheckoutValues, CartOrder, OrderMode } from './types';
import { CheckoutApi } from './api/rest';
import { defaultOptions } from './defaultOptions';

interface MachineCreation {
  order: CartOrder<OrderMode>;
  orderMode: OrderMode;
  options: MachineOptions<CheckoutValues<OrderMode>, any>;
}
export const createCheckoutMachine = ({
  order,
  orderMode,
  options = defaultOptions,
}: MachineCreation) => {
  return Machine<CheckoutValues<typeof orderMode>>(
    {
      id: 'checkout',
      initial: 'idle',
      context: {
        order,
        orderMode,
        error: null,
        success: null,
      },
      on: {
        update: {
          actions: ['update'],
        },
        submit: {
          actions: ['submit'],
        },
      },
      states: {
        error: { on: { STEP_BACK: 'idle' } },
        next: {
          always: [
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
        create: {
          invoke: {
            id: 'createOrder',
            src: (context) =>
              CheckoutApi.order.add({ ...context.order, orderMode }),
            onDone: {
              target: 'next',
              actions: ['updateOrder'],
            },
            onError: {
              target: 'error',
              actions: ['error'],
            },
          },
          on: {
            STEP_CHANGE: 'next',
          },
        },
        idle: { on: { create: 'create', STEP_CHANGE: 'next' } },
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
            SUBMIT_ORDER: 'submit',
            STEP_BACK: 'payment',
            'GOTO.shippingAddress': 'shippingAddress',
            'GOTO.homeAddress': 'homeAddress',
            'GOTO.payment': 'payment',
          },
        },
        submit: {
          invoke: {
            id: 'submitOrder',
            src: (context) => CheckoutApi.order.submit(context.order),
            onDone: {
              target: 'summary',
              actions: ['success'],
            },
            onError: {
              target: 'review',
              actions: ['error'],
            },
          },
        },
        summary: {
          on: { STEP_CHANGE: 'idle', STEP_BACK: 'review' },
        },
      },
    },
    options
  );
};
