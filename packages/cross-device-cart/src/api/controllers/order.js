import User from "./user"
import { ErrorHandler } from "../../utils/ErrorHandler"

export default class Order {
  constructor(fb) {
    this.__fb = fb
    if (!this.__fb) {
      throw new Error("It should be inited once firebase is inited")
    }
    this.ref = this.__fb.orders()
    this.user = new User(fb)
  }

  async create(order) {
    try {
      const user = this.__fb.auth.currentUser
      const response = await this.ref.push(order)
      if (user && user.uid) {
        await this.user.updateLastNumber(user.uid, response.key)
      }
      return response
    } catch (e) {
      ErrorHandler(e, "Create order")
    }
  }

  async update(order) {
    if (!order.id) {
      throw new Error("Order should include id!")
    }
    try {
      if (!order.items.length) {
        await this.removeOrder(order.id)
      } else {
        await this.__fb.order(order.id).update({ items: order.items })
      }
      return null
    } catch (e) {
      ErrorHandler(e, "Update order")
    }
  }

  async order(orderId) {
    const user = this.__fb.auth.currentUser

    try {
      const lastOrderNumber = await this.user.getLastNumber()

      if (!orderId && !user) {
        return null
      }

      if (orderId && !user) {
        return this.__getOrder(orderId)
      }

      if (!orderId && user) {
        if (!lastOrderNumber) {
          return null
        }
        const order = await this.__getOrder(lastOrderNumber)
        if (!order) {
          await this.user.updateLastNumber(user.uid, null)
          return null
        }
        return order
      }

      if (orderId && user) {
        if (!lastOrderNumber) {
          await this.user.updateLastNumber(user.uid, orderId)
          return this.__getOrder(orderId)
        }

        if (lastOrderNumber && orderId === lastOrderNumber) {
          return this.__getOrder(lastOrderNumber)
        }

        const orderFromStorage = await this.__getOrder(orderId)
        const orderFromUserProfile = await this.__getOrder(lastOrderNumber)
        return this.__mergeOrders(orderFromStorage, orderFromUserProfile)
      }
    } catch (e) {
      ErrorHandler(e, "Get order")
    }
  }

  async __mergeOrders(orderFromStorage, orderFromUserProfile) {
    const itemsFromStorage = (orderFromStorage && orderFromStorage.items) || []
    const itemsFromUserProfile =
      (orderFromUserProfile && orderFromUserProfile.items) || []
    const mergedItems = [...itemsFromStorage, ...itemsFromUserProfile]
    try {
      await this.update({
        id: orderFromUserProfile.id,
        items: mergedItems,
      })
      await this.removeOrder(orderFromStorage.id)
      return this.__getOrder(orderFromUserProfile.id)
    } catch (e) {
      ErrorHandler(e, "Merge orders")
    }
  }

  async __getOrder(id) {
    try {
      const snapshot = await this.__fb.order(id).once("value")
      const order = snapshot.val()
      if (order) {
        return { ...order, id }
      }
      return null
    } catch (e) {
      ErrorHandler(e, "__get order")
    }
  }

  async removeOrder(orderId) {
    const user = this.__fb.auth.currentUser
    const lastOrderNumber = await this.user.getLastNumber()
    try {
      await this.__fb.order(orderId).remove()
      if (lastOrderNumber === orderId) {
        await this.user.updateLastNumber(user.uid, null)
      }
      return null
    } catch (e) {
      ErrorHandler(e, "Remove order")
    }
  }
}
