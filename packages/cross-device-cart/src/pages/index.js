import React from "react"

import Layout from "../components/layout"
import Cart from "../components/Cart/Cart"

const Home = () => (
  <>
    <h1>Home page</h1>
    <Cart />
  </>
)

export default () => (
  <Layout>
    <Home />
  </Layout>
)
