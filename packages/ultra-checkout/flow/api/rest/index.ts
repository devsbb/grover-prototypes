import { paymentMethod } from './paymentMethod';
import { billingAddress, shippingAddress } from './address';
import { lineItem } from './lineItem';
import { order } from './order';
import { CheckoutAPI } from '../integration';
export const CheckoutApi: CheckoutAPI = {
  order,
  paymentMethod,
  shippingAddress,
  homeAddress: billingAddress,
  lineItem,
};
