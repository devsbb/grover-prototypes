import { CartValues } from '../../../flow/types';
import { MixList, FlexList } from './List';

type OrderMode = 'MIX' | 'FLEX' | 'SWAP';

interface LineItem {
  variant: any;
  quantity: number;
}
interface CartOrder<T> extends CartValues {
  orderMode: T;
  lineItems: Array<LineItem>;
}

type FlexOrder = CartOrder<'FLEX'>;
type MixOrder = CartOrder<'MIX'>;

function isMix(obj: FlexOrder | MixOrder): obj is MixOrder {
  return (obj as MixOrder).orderMode === 'MIX';
}

interface Props {
  order: CartOrder<any>;
}
export const ItemList = (props: Props) => {
  const { order } = props;
  console.log({ order });
  if (isMix(order)) return <MixList lineItems={order.lineItems} />;
  return <FlexList lineItems={order.lineItems} />;
};
