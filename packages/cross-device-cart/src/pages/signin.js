import React from "react"
import { Container } from "react-bootstrap"

import Layout from "../components/layout"
import SignInForm from "../components/SignIn"
import { SignUpLink } from "../components/SignUp"

const SignInPage = () => (
  <Container>
    <h1>SignIn</h1>
    <SignInForm />
    <SignUpLink />
  </Container>
)

export default () => (
  <Layout>
    <SignInPage />
  </Layout>
)
