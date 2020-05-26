import React, { useCallback, useContext, useEffect, useState } from "react"
import { getRandomItem } from "./utils"
import OrderService from "../../services/orderService"
import Storage from "../../services/storage"
import { LS_ORDER_KEY, LS_USER_KEY } from "../../constants"
import FirebaseContext from "../Firebase/context"

const initialValue = {
  items: [],
  id: null,
}

const CartContext = React.createContext(initialValue)

const CartProvider = ({ children }) => {
  const [cart, setCart] = useState(initialValue)
  const [orderService, setOrderService] = useState(null)
  const firebase = useContext(FirebaseContext)

  const fetchCart = useCallback(() => {
    const orderNumber = Storage.get(LS_ORDER_KEY)
    const user = Storage.get(LS_USER_KEY)
    if (orderNumber || user) {
      orderService.getOrder(orderNumber).then(order => {
        if (order) {
          Storage.set(LS_ORDER_KEY, order.id)
          setCart({ id: order.id, items: order.items })
        } else {
          Storage.remove(LS_ORDER_KEY)
        }
      })
    }
  }, [orderService])

  useEffect(() => {
    if (firebase) {
      setOrderService(new OrderService(firebase))
    }
  }, [firebase])

  const addToCart = useCallback(() => {
    const item = getRandomItem(1, 100)
    const newCart = { ...cart, items: cart.items.concat(item) }
    if (!cart.items.length) {
      orderService.createOrder(item).then(orderNumber => {
        if (orderNumber) {
          Storage.set(LS_ORDER_KEY, orderNumber)
        }
        newCart.id = orderNumber
        setCart(newCart)
      })
    } else {
      const orderNumber = Storage.get(LS_ORDER_KEY)
      orderService
        .updateOrder({
          id: orderNumber,
          items: newCart.items,
        })
        .then(() => setCart(newCart))
    }
  }, [cart, orderService])

  const removeFromCart = useCallback(
    item => {
      const newItems = cart.items.filter(
        i => i.name !== item.name && i.price !== item.price
      )
      const newCart = { ...cart, items: newItems }
      orderService
        .updateOrder({
          id: cart.id,
          items: newItems,
        })
        .then(() => {
          if (!newItems.length) {
            Storage.remove(LS_ORDER_KEY)
          }
          return null
        })
        .then(() => setCart(newCart))
    },
    [cart, orderService]
  )

  const resetCart = useCallback(() => {
    Storage.remove(LS_ORDER_KEY)
    setCart(initialValue)
  }, [])

  const complete = useCallback(() => {
    orderService.removeOrder(cart.id).then(() => {
      resetCart()
    })
  }, [resetCart, orderService, cart.id])

  const value = {
    data: cart,
    fetchCart,
    removeFromCart,
    addToCart,
    resetCart,
    complete,
  }

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}

export const withCart = Component => props => (
  <CartContext.Consumer>
    {cart => <Component {...props} cart={cart} />}
  </CartContext.Consumer>
)

export { CartProvider }
