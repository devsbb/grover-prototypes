export enum Step {
  shippingAddress,
  homeAddress,
  payment,
  review,
  summary,
}

export type Address = {};
export type PaymentMethod = {};

export interface AuthValues {
  auth: any;
  user: any;
}
export interface CheckoutValues extends AuthValues {
  order: CartValues;
}

export interface CartValues {
  orderNumber: string;
  guestToken: string;
  shippingAddress?: Address;
  homeAddress?: Address;
  paymentMethod?: PaymentMethod;
  step: Step;
  lineItems: Array<any>;
}
