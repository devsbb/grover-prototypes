import Head from 'next/head';
import { AuthProvider, AuthGuard } from '../components/auth/AuthProvider';
import {
  CheckoutBlock,
  AuthCheckoutBlock,
} from '../components/demo/CheckoutBlock';
import { DemoView } from '../components/demo/viewer/ComponentViewer';
import { createCart, createMixCart } from '../mocks';
import styles from './Home.module.scss';

export default function Demo({ flexOrder, guestOrder, mixCart, swapCart }) {
  return (
    <div>
      <Head>
        <title>Ultra Demo</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.container}>
        <AuthProvider>
          <DemoView>
            <CheckoutBlock name="guest" heading="Guest" machine={guestOrder} />
            <CheckoutBlock
              withAuth
              name="auth"
              heading="Auth"
              machine={flexOrder}
            />
            <CheckoutBlock name="mix" heading="MIX" machine={mixCart} />
            <CheckoutBlock name="swap" heading="SWAP" machine={swapCart} />
          </DemoView>
        </AuthProvider>
      </main>
    </div>
  );
}

Demo.getInitialProps = async () => {
  const guestOrder = await createCart();
  const flexOrder = await createCart({ auth: { userId: 43242 } });
  const mixCart = await createMixCart({});
  const swapCart = await createMixCart({ swap: true });
  return {
    flexOrder: { order: flexOrder, orderMode: 'FLEX' },
    guestOrder: { order: guestOrder, orderMode: 'FLEX' },
    mixCart: { order: mixCart, orderMode: 'MIX' },
    swapCart: { order: swapCart, orderMode: 'SWAP' },
  };
};
