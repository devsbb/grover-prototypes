import React, { Component } from "react"
import { navigate } from "gatsby"

import { withFirebase } from "../Firebase"
import * as ROUTES from "../../constants/routes"
import { Alert, Button, Form } from "react-bootstrap"

const INITIAL_STATE = {
  email: "",
  password: "",
  error: null,
}

class SignInFormBase extends Component {
  constructor(props) {
    super(props)

    this.state = { ...INITIAL_STATE }
  }

  onSubmit = event => {
    const { email, password } = this.state

    this.props.firebase
      .doSignInWithEmailAndPassword(email, password)
      .then(() => {
        this.listener = this.props.firebase.onAuthUserListener(
          () => {
            navigate(ROUTES.HOME);
          },
          () => navigate(ROUTES.HOME),
        );
        this.setState({ ...INITIAL_STATE })
      })
      .catch(error => {
        this.setState({ error })
      })

    event.preventDefault()
  }

  onChange = event => {
    this.setState({ [event.target.name]: event.target.value })
  }

  componentWillUnmount() {
    this.listener && this.listener();
  }

  render() {
    const { email, password, error } = this.state

    const isInvalid = password === "" || email === ""

    return (
      <Form onSubmit={this.onSubmit}>
        <Form.Group controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            type="email"
            name="email"
            placeholder="Enter email"
            value={email}
            onChange={this.onChange}
          />
          <Form.Text className="text-muted">
            We'll never share your email with anyone else.
          </Form.Text>
        </Form.Group>
        <Form.Group controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Password"
            name="password"
            value={password}
            onChange={this.onChange}
          />
        </Form.Group>
        <Button variant="primary" type="submit" disabled={isInvalid}>
          Sign in
        </Button>
        {error && (
          <Alert variant="danger" className="mt-3">
            {error.message}
          </Alert>
        )}
      </Form>
    )
  }
}
const SignInForm = withFirebase(SignInFormBase)

export default SignInForm
