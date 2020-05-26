import React, { useCallback } from "react"

import { withFirebase } from "../Firebase"
import { Button } from "react-bootstrap"
import { withCart } from "../Cart"

const SignOutButton = ({ firebase, cart: { resetCart } }) => {
  const onClick = useCallback(() => {

    if (firebase) {
      firebase.doSignOut().then(resetCart)
    }
  }, [resetCart, firebase])
  return (
    <Button variant="danger" onClick={onClick}>
      Sign Out
    </Button>
  )
}

export default withCart(withFirebase(SignOutButton))
