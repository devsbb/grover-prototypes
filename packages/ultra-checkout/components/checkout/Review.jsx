import { ScaffoldBlinker, ScaffoldGrid } from '../brutalism/Scaffold';

export const Review = ({ data, send }) => (
  <ScaffoldGrid>
    <ScaffoldBlinker onClick={() => send('GOTO.shippingAddress')}>
      Go to shipping
    </ScaffoldBlinker>
    <ScaffoldBlinker onClick={() => send('GOTO.homeAddress')}>
      Go to home
    </ScaffoldBlinker>
    <ScaffoldBlinker onClick={() => send('GOTO.payment')}>
      Go to payment
    </ScaffoldBlinker>
  </ScaffoldGrid>
);
