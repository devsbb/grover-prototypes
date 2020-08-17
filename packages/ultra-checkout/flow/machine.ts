import { Machine, assign } from 'xstate';
import { CheckoutValues, CartValues } from './types';
import { CheckoutApi, ApiAccessor } from './api';

export const createCheckoutMachine = (order: CartValues) => {
  return Machine<CheckoutValues>(
    {
      id: 'checkout',
      initial: 'idle',
      context: {
        order,
        error: null,
        success: null,
      },
      on: {
        submit: {
          actions: assign((context, event) => {
            const value: ApiAccessor = event.value;
            const { payload, operation, entity } = value;

            CheckoutApi[entity][operation](context.order, payload);
            return context;
          }),
        },
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
            src: (context) => CheckoutApi.order.create(context.order),
            onDone: {
              target: 'next',
              actions: assign({
                order: (context, event) => ({
                  ...context.order,
                  ...event.data,
                }),
              }),
            },
            onError: {
              target: 'error',
              actions: assign({ error: (context, event) => event.data }),
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
              actions: assign({ success: (context, event) => true }),
            },
            onError: {
              target: 'review',
              actions: assign({ error: (context, event) => event.data }),
            },
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
        filledOut: ({ order }) => {
          const isFilledOut = Boolean(
            order &&
              order.paymentMethod?.id &&
              order.homeAddress?.city &&
              order.shippingAddress?.city
          );
          console.log({ isFilledOut, order });
          return isFilledOut;
        },
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
