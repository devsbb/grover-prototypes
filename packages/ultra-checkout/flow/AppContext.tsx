import { createContext } from 'react';
import { CartValues, AuthValues } from './types';
import { Step } from './types';

export const CartContext = createContext<Partial<CartValues>>({});
export const AuthContext = createContext<Partial<AuthValues>>({
  login: () => {},
});

export const AuthGuard = ({ children }) => (
  <AuthContext.Consumer>
    {({ user, login, logout }) =>
      !user ? (
        <em>
          forbidden <button onClick={login}>Login</button>
        </em>
      ) : (
        <>
          <button onClick={logout}>Logout</button>
          {children}
        </>
      )
    }
  </AuthContext.Consumer>
);
