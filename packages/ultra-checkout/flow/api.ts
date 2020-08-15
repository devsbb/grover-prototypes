export const CheckoutApi = {
  paymentMethod: {
    add: () => Promise.resolve(),
    update: () => Promise.resolve(),
  },
  shippingAddress: {
    add: (test) => {
      console.log(test);
      return Promise.resolve();
    },
    update: () => Promise.resolve(),
  },
  homeAddress: {
    add: (test) => {
      console.log(test);
      return Promise.resolve();
    },
    update: () => Promise.resolve(),
  },
  lineItem: {
    add: (test) => {
      console.log(test);
      return Promise.resolve();
    },
    delete: () => Promise.resolve(),
    update: () => Promise.resolve(),
  },
};

type EntityKey =
  | 'paymentMethod'
  | 'shippingAddress'
  | 'homeAddress'
  | 'lineItem';

type Operation = 'add' | 'delete' | 'update';
export interface ApiAccessor {
  entity: EntityKey;
  operation: Operation;
  payload: any;
}
