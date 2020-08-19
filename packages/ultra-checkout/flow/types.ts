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
  login: ({ name }: { name?: string }) => void;
  logout: () => void;
}
export interface CheckoutValues<T> {
  order: CartOrder<T>;
  orderMode: T;
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
  lineItems: Array<LineItem>;
}

export enum OrderMode {
  MIX,
  FLEX,
  SWAP,
}

export interface LineItem {
  variant: any;
  quantity: number;
}
export interface CartOrder<T> extends CartValues {
  orderMode: T;
}

export type FlexOrder = CartOrder<OrderMode.FLEX>;
export type MixOrder = CartOrder<OrderMode.MIX>;

export function isMix(obj: FlexOrder | MixOrder): obj is MixOrder {
  return (obj as MixOrder).orderMode === OrderMode.MIX;
}
