import { createContext } from 'react';
import { useState } from 'react';

import { AuthValues } from '../../flow/types';

export const AuthContext = createContext<Partial<AuthValues>>({
  login: ({ name }: { name?: string }) => {},
});

export const AuthApi = {
  login: async ({ name }) => {
    const res = await fetch('http://localhost:3000/api/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name: 'nusa' }),
    });
    return res.json();
  },
  logout: async () => {
    const res = await fetch('http://localhost:3000/api/logout', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    return res.json();
  },
};
export const AuthGuard = ({ children, name }) => (
  <AuthContext.Consumer>
    {({ user, login, logout }) =>
      !user ? (
        <em>
          forbidden <button onClick={() => login({ name })}>Login</button>
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

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  return (
    <AuthContext.Provider
      value={{
        user,
        login: ({ name }) =>
          AuthApi.login({ name }).then((data) => {
            setUser(data);
          }),
        logout: () => AuthApi.logout().then(() => setUser(null)),
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
