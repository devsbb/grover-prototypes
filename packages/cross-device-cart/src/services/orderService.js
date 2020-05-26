import Order from "../api/controllers/order"

export default class OrderService {
  constructor(fb) {
    this.__api = new Order(fb)
  }

  updateOrder(order) {
    return this.__api.update(order)
  }

  createOrder(item) {
    return this.__api.create({ items: [item] }).then(response => {
      if (response && response.key) {
        return response.key
      }
      return null
    })
  }

  getOrder(orderId) {
    return this.__api.order(orderId)
  }

  removeOrder(orderId) {
    return this.__api.removeOrder(orderId);
  }
}
