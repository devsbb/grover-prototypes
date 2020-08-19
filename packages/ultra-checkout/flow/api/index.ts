import { paymentMethod } from './paymentMethod';
import { billingAddress, shippingAddress } from './address';
import { lineItem } from './lineItem';
import { order } from './order';
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
  event?: { value: R }
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
  entity: keyof CheckoutApi;
  operation: keyof Operations<T>;
  payload: T;
}

interface CheckoutApi {
  paymentMethod: APISelection<PaymentMethod>;
  shippingAddress: APISelection<Address>;
  homeAddress: APISelection<Address>;
  lineItem: APISelection<LineItem>;
  order: APISelection<any>;
}

export const CheckoutApi: CheckoutApi = {
  order,
  paymentMethod,
  shippingAddress,
  homeAddress: billingAddress,
  lineItem,
};
