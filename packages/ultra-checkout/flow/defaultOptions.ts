import { MachineOptions, assign } from 'xstate';
import { CheckoutValues, OrderMode } from './types';
import { ApiAccessor, CheckoutAPI } from './api/integration';
import { classicAPI } from './api/rest';

const getEntityUpdates = (api) => (context, event) => {
  const value: ApiAccessor<any> = event.value;
  const { payload, operation, entity } = value;

  return api[entity][operation](context.order, payload);
};

export const getDefaultOptions = (
  api: CheckoutAPI = classicAPI
): MachineOptions<CheckoutValues<OrderMode>, any> => {
  const handler = getEntityUpdates(api);
  return {
    activities: {},
    delays: {},
    services: {
      createOrder: (context) => api.order.add({ ...context.order }),
      submitOrder: (context) => api.order.submit({ ...context.order }),
      genericHandler: handler,
    },
    actions: {
      update: assign({
        order: (context, event) => {
          const { step, updated } = event.value;
          return {
            ...context.order,
            [step]: { ...context.order[step], ...updated },
          };
        },
      }),
      updateOrder: assign({
        order: (context, event) => ({
          ...context.order,
          ...event.data,
        }),
      }),
      error: assign({ error: (context, event) => event.data }),
      success: assign({ success: (context, event) => true }),
    },
    guards: {
      isFlexOrder: ({ orderMode }) => Boolean(orderMode.toString() === 'FLEX'),
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
  };
};

export const invokeDefaultUpdate = {
  src: 'genericHandler',
  onDone: {
    target: '#next',
    actions: ['success'],
  },
  onError: {
    target: '#error',
    actions: ['error'],
  },
};
