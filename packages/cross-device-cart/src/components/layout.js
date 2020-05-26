import React, { useState, useEffect } from "react"
import { Container, Row, Col } from "react-bootstrap"

import Navigation from "./Navigation"
import getFirebase, { FirebaseContext } from "./Firebase"
import { CartProvider } from "./Cart"
import withAuthentication from "./Session/withAuthentication"
import "bootstrap/dist/css/bootstrap.min.css"

const Layout = ({ ...props }) => {
  const [firebase, setFirebase] = useState(null)

  useEffect(() => {
    import("firebase").then(app => {
      const firebase = getFirebase(app)
      setFirebase(firebase)
    })
  }, [])

  return (
    <FirebaseContext.Provider value={firebase}>
      <CartProvider>
        <AppWithAuthentication {...props} />
      </CartProvider>
    </FirebaseContext.Provider>
  )
}

const AppWithAuthentication = withAuthentication(({ children }) => (
  <Container>
    <Row>
      <Col>
        <Navigation />
      </Col>
    </Row>
    <Row>
      <Col>{children}</Col>
    </Row>
  </Container>
))

export default Layout
