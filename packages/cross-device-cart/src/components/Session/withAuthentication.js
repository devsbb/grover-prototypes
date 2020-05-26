import React from "react"

import AuthUserContext from "./context"
import { withFirebase } from "../Firebase"
import Storage from "./../../services/storage"
import { LS_USER_KEY } from "./../../constants"
import { withCart } from "../Cart"

const withAuthentication = Component => {
  class WithAuthentication extends React.Component {
    _initFirebase = false

    constructor(props) {
      super(props)

      this.state = {
        authUser: null,
      }
    }

    firebaseInit = () => {
      if (this.props.firebase && !this._initFirebase) {
        this._initFirebase = true

        this.listener = this.props.firebase.onAuthUserListener(
          authUser => {
            Storage.set(LS_USER_KEY, JSON.stringify(authUser))
            this.setState({ authUser })
            const {
              cart: { fetchCart },
            } = this.props
            fetchCart()
          },
          () => {
            Storage.remove(LS_USER_KEY)
            this.setState({ authUser: null })
          }
        )
      }
    }

    componentDidMount() {
      this.setState({
        authUser: JSON.parse(Storage.get(LS_USER_KEY)),
      })

      this.firebaseInit()
    }

    componentDidUpdate() {
      this.firebaseInit()
    }

    componentWillUnmount() {
      this.listener && this.listener()
    }

    render() {
      return (
        <AuthUserContext.Provider value={this.state.authUser}>
          <Component {...this.props} />
        </AuthUserContext.Provider>
      )
    }
  }

  return withCart(withFirebase(WithAuthentication))
}

export default withAuthentication
