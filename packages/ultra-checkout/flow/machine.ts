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

            CheckoutApi[entity][operation](payload).then((e) => console.log(e));
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
            src: (context) => CheckoutApi.submitOrder(context.order),
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
      actions: {
        setShippingAddress: assign({
          order: (context, event) => ({
            ...context.order,
            shippingAddress: event.value,
          }),
        }),
        setHomeAddress: assign({
          order: (context, event) => ({
            ...context.order,
            homeAddress: event.value,
          }),
        }),
      },
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
