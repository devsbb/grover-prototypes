import React, { Component } from "react"
import { Link, navigate } from "gatsby"

import { withFirebase } from "../Firebase"
import * as ROUTES from "../../constants/routes"
import { Alert, Button, Form } from "react-bootstrap"

const INITIAL_STATE = {
  username: "",
  email: "",
  passwordOne: "",
  passwordTwo: "",
  error: null,
}

const ERROR_CODE_ACCOUNT_EXISTS = "auth/email-already-in-use"

const ERROR_MSG_ACCOUNT_EXISTS = `
  An account with this E-Mail address already exists.
  Try to login with this account instead. If you think the
  account is already used from one of the social logins, try
  to sign in with one of them. Afterward, associate your accounts
  on your personal account page.
`

class SignUpFormBase extends Component {
  constructor(props) {
    super(props)

    this.state = { ...INITIAL_STATE }
  }

  onSubmit = event => {
    const { username, email, passwordOne } = this.state

    this.props.firebase
      .doCreateUserWithEmailAndPassword(email, passwordOne)
      .then(authUser => {
        // Create a user in your Firebase realtime database
        return this.props.firebase.user(authUser.user.uid).set({
          username,
          email,
        })
      })
      .then(() => {
        this.setState({ ...INITIAL_STATE })
        navigate(ROUTES.HOME)
      })
      .catch(error => {
        if (error.code === ERROR_CODE_ACCOUNT_EXISTS) {
          error.message = ERROR_MSG_ACCOUNT_EXISTS
        }

        this.setState({ error })
      })

    event.preventDefault()
  }

  onChange = event => {
    this.setState({ [event.target.name]: event.target.value })
  }

  onChangeCheckbox = event => {
    this.setState({ [event.target.name]: event.target.checked })
  }

  render() {
    const { username, email, passwordOne, passwordTwo, error } = this.state

    const isInvalid =
      passwordOne !== passwordTwo ||
      passwordOne === "" ||
      email === "" ||
      username === ""

    return (
      <Form onSubmit={this.onSubmit}>
        <Form.Group controlId="formBasicName">
          <Form.Label>Full name</Form.Label>
          <Form.Control
            type="text"
            name="username"
            placeholder="Enter full name"
            value={username}
            onChange={this.onChange}
          />
        </Form.Group>
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
            placeholder="Enter password"
            name="passwordOne"
            value={passwordOne}
            onChange={this.onChange}
          />
        </Form.Group>
        <Form.Group controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Confirm password"
            name="passwordTwo"
            value={passwordTwo}
            onChange={this.onChange}
          />
        </Form.Group>
        <Button variant="primary" type="submit" disabled={isInvalid}>
          Sign up
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

const SignUpLink = () => (
  <p>
    Don't have an account? <Link to={ROUTES.SIGN_UP}>Sign Up</Link>
  </p>
)

export default withFirebase(SignUpFormBase)

export { SignUpLink }
