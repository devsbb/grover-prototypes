import React, { useContext } from "react"
import { withCart } from "./context"
import { Alert, Button, Table } from "react-bootstrap"
import AuthUserContext from "../Session/context"

const Cart = ({ cart: { data, addToCart, removeFromCart, complete } }) => {
  const isEmpty = !data.items || !data.items.length
  const user = useContext(AuthUserContext)
  return (
    <>
      <h3>Your cart!</h3>
      <div className="d-flex justify-content-between mb-3">
        <Button variant="primary" onClick={addToCart}>
          Add to cart, baby!
        </Button>
        {!isEmpty && user && (
          <Button variant="success" onClick={complete}>
            Send order!
          </Button>
        )}
      </div>
      {isEmpty && <Alert variant="secondary">Oops, cart is empty!</Alert>}
      {!isEmpty && (
        <Table striped bordered hover responsive>
          <thead>
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Price</th>
              <th className="text-center">X</th>
            </tr>
          </thead>
          <tbody>
            {data.items.map((item, i) => (
              <tr key={item.name + item.price}>
                <td>${i + 1}</td>
                <td>{item.name}</td>
                <td>{item.price}</td>
                <td className="text-center">
                  <Button variant="danger" onClick={() => removeFromCart(item)}>
                    Remove
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </>
  )
}

export default withCart(Cart)
