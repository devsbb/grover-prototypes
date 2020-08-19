import { createCart, createMixCart } from './data';

const parseNumber = (number, prefix) => {
  const res = parseInt(number.replace(prefix, ''), 10);
  return res;
};

export default class MockOrderApi {
  orderPrefixes = {
    mix: 'M',
    flex: 'R',
    swap: 'S',
  };
  constructor() {
    this.orders = {};
  }
  getOrder = ({ orderNumber }) => {
    const order = this.orders[orderNumber];

    return order;
  };

  generateNumber = async ({ orderMode = 'FLEX' }) => {
    const mode = orderMode.toLowerCase();
    const prefix = this.orderPrefixes[mode];
    const orderNumbers = Object.keys(this.orders).filter((num) =>
      num.startsWith(prefix)
    );
    if (!orderNumbers.length) {
      return `${prefix}000000001`;
    }
    const latestNumber = orderNumbers
      .map((num) => parseNumber(num, prefix))
      .sort((a, b) => a - b)
      .pop();
    const number = (latestNumber + 1).toString();
    const reference = number.padStart(9, '0');
    return `${prefix}${reference}`;
  };

  createOrder = async ({ userId, orderMode, orderNumber, lineItems }) => {
    const reference = orderNumber || (await this.generateNumber({ orderMode }));
    const order = await (orderMode === 'mix'
      ? createMixCart()
      : createCart({ auth: { userId } }));
    this.orders[reference] = { ...order, orderNumber: reference, lineItems };
    return Promise.resolve(this.orders[reference]);
  };

  updateOrder = async ({ orderNumber, property, update }) => {
    const order = this.getOrder({ orderNumber });
    if (!order) return { order: null };
    const state = this.orders[orderNumber][property] || {};
    this.orders[orderNumber] = {
      ...order,
      [property]: { ...state, ...update },
    };
    return { order: this.orders[orderNumber] };
  };
  completeOrder = ({ orderNumber }) =>
    Promise.resolve({ order: { [orderNumber]: { completed: true } } });
  deleteOrder = ({ orderNumber }) => {
    delete this.orders[orderNumber];
    return null;
  };

  addItem = async ({ orderNumber, item }) => {
    const order = this.getOrder({ orderNumber });
    const itemId =
      order.lineItems.length > 0
        ? order.lineItems[order.lineItems.length - 1].id + 1
        : 1;
    order.lineItems = [...order.lineItems, { id: itemId, ...item }];
    this.orders[orderNumber] = order;
    return order;
  };
  deleteItem = async ({ orderNumber, itemId }) => {
    const order = this.getOrder({ orderNumber });
    order.lineItems = order.lineItems.filter(({ id }) => id !== itemId);
    if (!order.lineItems || order.lineItems.length === 0) {
      return this.deleteOrder({ orderNumber });
    }
    this.orders[orderNumber] = order;
    return order;
  };

  updateItem = async ({ orderNumber, item, itemId }) => {
    const order = this.getOrder({ orderNumber });
    if (item.quantity === 0) {
      return this.deleteItem({ orderNumber, itemId });
    }
    order.lineItems = order.lineItems.map((val) => {
      if (val.id !== itemId) return val;
      return {
        ...val,
        ...item,
      };
    });
    this.orders[orderNumber] = order;

    return order;
  };
}
