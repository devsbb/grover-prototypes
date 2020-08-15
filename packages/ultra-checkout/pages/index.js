import Head from 'next/head';
import { ScaffoldContainer } from '../components/brutalism/Scaffold';
import { CheckoutBase } from '../components/checkout/CheckoutBase';
import { createCheckoutMachine } from '../flow/machine';
import { createCart, createMixCart } from '../mocks';
import styles from './Home.module.scss';

export default function Home({ flexOrder, guestOrder, mixCart, swapCart }) {
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
        <ScaffoldContainer>
          <CheckoutBase checkout={guestMachine}>
            <h2>Guest</h2>
          </CheckoutBase>
        </ScaffoldContainer>
        <ScaffoldContainer>
          {/* <pre className={styles.pre}>
            {JSON.stringify(regularMachine.current.context.order)}
          </pre> */}

          <CheckoutBase checkout={regularMachine}>
            <h2>Auth</h2>
          </CheckoutBase>
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
