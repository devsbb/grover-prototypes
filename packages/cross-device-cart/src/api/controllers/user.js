import { ErrorHandler } from "../../utils/ErrorHandler"

export default class User {
  constructor(fb) {
    this.__fb = fb
    if (!this.__fb) {
      throw new Error("It should be inited once firebase is inited")
    }
  }

  async get(userId) {
    try {
      const snapshot = await this.__fb.user(userId).once("value")
      return snapshot.val()
    } catch (e) {
      ErrorHandler(e, "Get user")
    }
  }

  async updateLastNumber(userId, lastNumber) {
    try {
      await this.__fb.user(userId).update({ last_order_number: lastNumber })
      return null
    } catch (e) {
      ErrorHandler(e, "Update last number")
    }
  }

  async getLastNumber() {
    const user = this.__fb.auth.currentUser
    const { uid: userId } = user || {}
    try {
      if (userId) {
        const { last_order_number } = (await this.get(userId)) || {}
        return last_order_number
      }
      return null
    } catch (e) {
      ErrorHandler(e, "Get last number")
    }
  }
}
