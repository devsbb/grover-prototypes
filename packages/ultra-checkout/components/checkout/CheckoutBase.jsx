import { useMachine } from '@xstate/react';

import { HomeAddress } from './HomeAddress';
import { ShippingAddress } from './ShippingAddress';
import { Payment } from './Payment';
import { Review } from './Review';
import { Summary } from './Summary';
import { ItemList } from '../elements/ItemList';

import {
  ScaffoldBlinkGrid,
  ScaffoldHeader,
  ScaffoldGrid,
} from '../brutalism/Scaffold';

const sendUpdate = (step, send) => {
  return {
    update: (field, e) =>
      send('update', { value: { step, updated: { [field]: e.target.value } } }),
  };
};

export const CheckoutBase = ({ checkout, children }) => {
  const [current, send] = useMachine(checkout);

  return (
    <section>
      <ScaffoldHeader>
        {children}
        <span>Step: {current.value}</span>
        <ItemList order={current.context.order} />
      </ScaffoldHeader>
      <ScaffoldBlinkGrid>
        <button onClick={() => send('STEP_BACK')}>Step back!</button>
        <button onClick={() => send('STEP_CHANGE')}>Step!</button>
      </ScaffoldBlinkGrid>
      {current.matches('idle') && <div>Idling...</div>}

      {current.matches('homeAddress') && (
        <HomeAddress
          sendUpdate={sendUpdate}
          data={current.context.order.homeAddress}
          send={send}
        />
      )}
      {current.matches('shippingAddress') && (
        <ShippingAddress
          sendUpdate={sendUpdate}
          data={current.context.order.shippingAddress}
          send={send}
        />
      )}
      {current.matches('payment') && <Payment />}
      {current.matches('review') && (
        <Review
          sendUpdate={sendUpdate}
          data={current.context.order}
          send={send}
        />
      )}
      {current.matches('summary') && <Summary />}
    </section>
  );
};
