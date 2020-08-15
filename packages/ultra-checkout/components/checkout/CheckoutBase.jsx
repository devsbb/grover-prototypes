import { HomeAddress } from './HomeAddress';
import { ShippingAddress } from './ShippingAddress';
import { Payment } from './Payment';
import { Review } from './Review';
import { Summary } from './Summary';

const sendUpdate = (step, send) => {
  return {
    update: (field, e) =>
      send('update', { value: { step, updated: { [field]: e.target.value } } }),
  };
};

export const CheckoutBase = ({ current, send }) => (
  <>
    <h2>Checkout</h2>
    <section>
      <button onClick={() => send('STEP_BACK')}>Step back!</button>
      <button onClick={() => send('STEP_CHANGE')}>Step!</button>
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
      {current.matches('review') && <Review />}
      {current.matches('summary') && <Summary />}
    </section>
  </>
);
