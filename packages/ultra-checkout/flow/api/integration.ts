import {
  CartOrder,
  PaymentMethod,
  Address,
  LineItem,
  OrderMode,
} from '../types';

type APISuccess = { data: any };
type APIError = { error: any };

type Operation<R> = (
  order: CartOrder<OrderMode>,
  event?: R
) => Promise<APISuccess | APIError>;

export type APISelection<R> = {
  [P in keyof Operations<R>]?: Operations<R>[P];
};

interface Operations<R> {
  add: Operation<R>;
  delete: Operation<R>;
  submit: Operation<R>;
  update: Operation<R>;
}

export interface ApiAccessor<T> {
  entity: keyof CheckoutAPI;
  operation: keyof Operations<T>;
  payload: T;
}

export interface CheckoutAPI {
  paymentMethod: APISelection<PaymentMethod>;
  shippingAddress: APISelection<Address>;
  homeAddress: APISelection<Address>;
  lineItem: APISelection<LineItem>;
  order: APISelection<any>;
}
