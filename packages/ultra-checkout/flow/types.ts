export enum Step {
  shippingAddress,
  homeAddress,
  payment,
  review,
  summary,
}

export type Address = {
  city?: string;
};
export type PaymentMethod = {
  id?: string;
};

export interface AuthValues {
  auth: any;
  user: any;
  login: () => void;
  logout: () => void;
}
export interface CheckoutValues {
  order: CartValues;
  success?: boolean | null;
  error?: boolean | null;
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
