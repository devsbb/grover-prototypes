import { CartOrder, isMix } from '../../../flow/types';
import { MixList, FlexList } from './List';

interface Props {
  order: CartOrder<any>;
}

export const ItemList = (props: Props) => {
  const { order } = props;
  if (isMix(order)) return <MixList lineItems={order.lineItems} />;
  return <FlexList lineItems={order.lineItems} />;
};
