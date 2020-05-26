import React from "react"

import { AuthUserContext } from "../Session"
import SignOutButton from "../SignOut"
import * as ROUTES from "../../constants/routes"
import { Link } from "gatsby"

const Navigation = () => (
  <AuthUserContext.Consumer>
    {authUser => <NavigationComponent authUser={authUser} />}
  </AuthUserContext.Consumer>
)

const NavigationComponent = ({ authUser }) => (
  <div className="d-flex mt-3 mb-3 align-items-center">
    <Link className="nav-item mr-3" to={ROUTES.HOME}>
      Home
    </Link>
    {!authUser ? (
      <Link className="nav-item" to={ROUTES.SIGN_IN}>
        Sign in
      </Link>
    ) : (
      <SignOutButton />
    )}
  </div>
)

export default Navigation
