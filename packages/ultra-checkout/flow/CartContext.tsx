import { createContext } from 'react';
import { CartValues, AuthValues } from './types';
import { Step } from './types';

export const CartContext = createContext<Partial<CartValues>>({});
export const AuthContext = createContext<Partial<AuthValues>>({});

export const AuthGuard = ({ children }) => (
  <AuthContext.Consumer>
    {({ user }) => (!user ? <em>forbidden</em> : children)}
  </AuthContext.Consumer>
);
