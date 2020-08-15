import Head from 'next/head';
import { ScaffoldContainer } from '../components/brutalism/Scaffold';
import { CheckoutBase } from '../components/checkout/CheckoutBase';
import { checkoutMachine } from '../flow/machine';
import { useMachine } from '@xstate/react';
import styles from './Home.module.scss';

export default function Home() {
  const [current, send] = useMachine(checkoutMachine);
  const { order } = current.context;

  return (
    <div>
      <Head>
        <title>Ultra Checkout</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.container}>
        <ScaffoldContainer>
          <pre className={styles.pre}>{JSON.stringify(order)}</pre>
          <CheckoutBase current={current} send={send} />
        </ScaffoldContainer>
      </main>
    </div>
  );
}
