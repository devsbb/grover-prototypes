import { MachineOptions, assign } from 'xstate';
import { CheckoutValues, OrderMode } from './types';
import { CheckoutApi, ApiAccessor } from './api';

export const defaultOptions: MachineOptions<CheckoutValues<OrderMode>, any> = {
  activities: {},
  delays: {},
  services: {},
  actions: {
    submit: assign((context, event) => {
      const value: ApiAccessor<any> = event.value;
      const { payload, operation, entity } = value;

      CheckoutApi[entity][operation](context.order, payload);
      return context;
    }),
    update: assign({
      order: (ctx, e) => {
        console.log(ctx);
        const { step, updated } = e.value;
        return {
          ...ctx.order,
          [step]: { ...ctx.order[step], ...updated },
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
    emptyHomeAddress: ({ order }) =>
      Boolean(order && !order.homeAddress?.city && order.shippingAddress?.city),
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
