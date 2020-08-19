import { Machine, MachineOptions } from 'xstate';
import { CheckoutValues, CartOrder, OrderMode } from './types';
import { classicAPI } from './api/rest';
import { CheckoutAPI } from './api/integration';
import { getDefaultOptions, invokeDefaultUpdate } from './defaultOptions';

interface MachineCreation {
  order: CartOrder<OrderMode>;
  orderMode: OrderMode;
  options: MachineOptions<CheckoutValues<OrderMode>, any>;
  api: CheckoutAPI;
}

export const createCheckoutMachine = ({
  order,
  orderMode,
  api = classicAPI,
  options,
}: MachineCreation) => {
  const defaults = options || getDefaultOptions(api);
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
          target: 'next',
          actions: ['submit'],
        },
      },
      states: {
        idle: { on: { create: 'create', STEP_CHANGE: 'next' } },
        error: { id: 'error', on: { STEP_BACK: 'idle' } },
        success: { id: 'success', on: { STEP_BACK: 'idle' } },
        next: {
          id: 'next',
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
            src: 'createOrder',
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
        shippingAddress: {
          id: 'shippingAddress',
          on: {
            STEP_CHANGE: 'homeAddress',
            EDIT: '.editing',
            STEP_BACK: 'idle',
          },
          initial: 'editing',
          states: {
            idle: {
              on: {
                EDIT: 'editing',
              },
            },
            editing: {
              id: 'editing',
              on: {
                SUBMIT: 'loading',
              },
            },
            loading: {
              invoke: {
                id: 'shippingAddressUpdate',
                ...invokeDefaultUpdate,
              },
            },
          },
        },
        homeAddress: {
          on: {
            STEP_CHANGE: 'payment',
            STEP_BACK: 'shippingAddress',
          },
          initial: 'editing',
          states: {
            idle: {
              on: {
                EDIT: 'editing',
              },
            },
            editing: {
              on: {
                SUBMIT: 'loading',
              },
            },
            loading: {
              invoke: {
                id: 'homeAddressUpdate',
                ...invokeDefaultUpdate,
              },
            },
          },
        },
        payment: {
          initial: 'editing',
          on: { STEP_CHANGE: 'review', STEP_BACK: 'homeAddress' },
          states: {
            idle: {
              on: {
                EDIT: 'editing',
              },
            },
            editing: {
              on: {
                SUBMIT: 'loading',
              },
            },
            loading: {
              invoke: {
                id: 'paymentUpdate',
                ...invokeDefaultUpdate,
                onError: {
                  target: '#review',
                  actions: ['error'],
                },
              },
            },
          },
        },
        review: {
          id: 'review',
          on: {
            SUBMIT_ORDER: 'submit',
            STEP_BACK: 'payment',
            'GOTO.shippingAddress': 'shippingAddress',
            'GOTO.homeAddress': 'homeAddress',
            'GOTO.payment': 'payment',
          },
          // states: {
          //   idle: {
          //     on: {
          //       APPLY_VOUCHER: {
          //         target: 'applyingVoucher',
          //         cond: 'isFlexOrder',
          //       },
          //     },
          //   },
          //   applyingVoucher: {
          //     invoke: {
          //       id: 'applyVoucher',
          //       ...invokeDefaultUpdate,
          //     },
          //   },
          // },
        },
        submit: {
          invoke: {
            id: 'submitOrder',
            src: 'submitOrder',
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
    defaults
  );
};
