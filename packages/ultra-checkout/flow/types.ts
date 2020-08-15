export enum Step {
  shippingAddress,
  homeAddress,
  payment,
  review,
  summary,
}

export type Address = {};
export type PaymentMethod = {};

export interface CheckoutContext {
  auth: any;
  user: any;
  order: CartContext;
}

export interface CartContext {
  orderNumber: string;
  guestToken: string;
  shippingAddress?: Address;
  homeAddress?: Address;
  payment: PaymentMethod;
  step: Step;
}
