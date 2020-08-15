import { createContext } from 'react';
import { CartValues, AuthValues } from './types';

export const CartContext = createContext<Partial<CartValues>>({});
export const AuthContext = createContext<Partial<AuthValues>>({});

export const Step = (props) => (
  <AuthContext.Consumer>
    {({ user }) =>
      !user ? <em>forbidden</em> : <CartContext.Consumer {...props} />
    }
  </AuthContext.Consumer>
);
