const parseNumber = (number, prefix) => {
  const res = parseInt(number.replace(prefix, ''), 10);
  console.log({ res });
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
    if (!order) {
      throw new Error({ orderNumber: null });
    }
    return order;
  };

  generateNumber = async ({ orderMode }) => {
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
    console.log({ reference });
    return `${prefix}${reference}`;
  };

  createOrder = async ({ userId, orderMode, items }) => {
    const orderNumber = await this.generateNumber({ orderMode });
    this.orders[orderNumber] = {
      orderNumber,
      orderMode,
      userId,
      items,
      shippingAddress: null,
      billingAddress: null,
      paymentMethod: null,
    };
    console.log();
    return Promise.resolve(this.orders[orderNumber]);
  };

  updateOrder = async ({ orderNumber, property, update }) => {
    const order = this.getOrder({ orderNumber });
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
      order.items.length > 0 ? order.items[order.items.length - 1].id + 1 : 1;
    order.items = [...order.items, { id: itemId, ...item }];
    this.orders[orderNumber] = order;
    return order;
  };
  deleteItem = async ({ orderNumber, itemId }) => {
    const order = this.getOrder({ orderNumber });
    order.items = order.items.filter(({ id }) => id !== itemId);
    if (!order.items || order.items.length === 0) {
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
    order.items = order.items.map((val) => {
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
