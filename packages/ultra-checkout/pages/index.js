import { useState } from 'react';
import Head from 'next/head';
import { AuthGuard, AuthContext } from '../flow/AppContext';
import { ScaffoldContainer } from '../components/brutalism/Scaffold';
import { CheckoutBase } from '../components/checkout/CheckoutBase';
import { createCheckoutMachine } from '../flow/machine';
import { createCart, createMixCart } from '../mocks';
import styles from './Home.module.scss';

export default function Home({ flexOrder, guestOrder, mixCart, swapCart }) {
  const [user, login] = useState(null);
  const regularMachine = createCheckoutMachine(flexOrder);
  const guestMachine = createCheckoutMachine(guestOrder);
  const mixMachine = createCheckoutMachine(mixCart);
  const swapMachine = createCheckoutMachine(swapCart);

  console.log({ regularMachine, guestMachine });
  return (
    <div>
      <Head>
        <title>Ultra Checkout</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.container}>
        <AuthContext.Provider
          value={{
            user,
            login: () => login({ id: 456 }),
            logout: () => login(null),
          }}
        >
          <ScaffoldContainer>
            <CheckoutBase checkout={guestMachine}>
              <h2>Guest</h2>
            </CheckoutBase>
          </ScaffoldContainer>
          <ScaffoldContainer>
            {/* <pre className={styles.pre}>
            {JSON.stringify(regularMachine.current.context.order)}
          </pre> */}
            <AuthGuard>
              <CheckoutBase checkout={regularMachine}>
                <h2>Auth</h2>
              </CheckoutBase>
            </AuthGuard>
          </ScaffoldContainer>
          <ScaffoldContainer>
            <CheckoutBase checkout={mixMachine}>
              <h2>MIX</h2>
            </CheckoutBase>
          </ScaffoldContainer>
          <ScaffoldContainer>
            <CheckoutBase checkout={swapMachine}>
              <h2>SWAP</h2>
            </CheckoutBase>
          </ScaffoldContainer>
        </AuthContext.Provider>
      </main>
    </div>
  );
}

Home.getInitialProps = async () => {
  const guestOrder = await createCart();
  const flexOrder = await createCart({ auth: { userId: 43242 } });
  const mixCart = await createMixCart({});
  const swapCart = await createMixCart({ swap: true });
  return {
    flexOrder,
    guestOrder,
    mixCart,
    swapCart,
  };
};
