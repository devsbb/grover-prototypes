import { Step, CartValues } from '../flow/types';

const LineItems = [
  {
    id: 123,
  },
  {
    id: 234,
  },
  {
    id: 567,
  },
];
const GuestOrder = {
  orderNumber: 'R123456890',
  shippingAddress: {},
  homeAddress: {},
  payment: {},
  lineItems: [],
  step: Step.shippingAddress,
};

const Order = {
  orderNumber: 'R1234562390',
  guestToken: '',
  orderMode: 'FLEX',
  shippingAddress: {
    id: 234,
    city: 'test',
    line1: 'test2',
  },
  homeAddress: {
    id: 432,
    city: 'Lisbon',
    line1: 'Little Britain',
  },
  payment: {},
  lineItems: LineItems,
  step: Step.payment,
};

const MixCart = {
  orderNumber: 'M123456890',
  orderMode: 'MIX',
  guestToken: 'test',
  shippingAddress: {},
  homeAddress: {},
  payment: {},
  lineItems: [],
  step: Step.shippingAddress,
};

async function getCart({ userId }: { userId: number }): Promise<CartValues> {
  return Promise.resolve({ ...Order, userId, paymentMethod: { id: '123' } });
}

async function createOrder(): Promise<CartValues> {
  const guestToken = 'test2';
  return Promise.resolve({ ...GuestOrder, guestToken });
}

async function getAnonymousCart({
  guestToken,
}: { guestToken?: string } = {}): Promise<CartValues> {
  if (!guestToken) return createOrder();
  try {
    return Promise.resolve({ ...GuestOrder, guestToken });
  } catch (e) {
    return createOrder();
  }
}

export const createCart = async (
  { auth, guestToken } = { auth: null, guestToken: null }
): Promise<CartValues> => {
  const cart = auth
    ? await getCart(auth)
    : await getAnonymousCart({ guestToken });

  return cart;
};

export const createMixCart = async ({
  swap = false,
}: {
  swap: boolean;
}): Promise<CartValues> => {
  return {
    ...MixCart,
    shippingAddress: {
      city: 'Belgrade',
    },
    lineItems: swap ? LineItems.slice(1) : LineItems.slice(2),
  };
};
