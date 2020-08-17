import handler from '../../../../api-utils/connectHandler';
import nextConnect from 'next-connect';

const connectHandler = nextConnect().use(handler);
connectHandler.patch(updateAddress);

export default connectHandler;

function updateAddress(req, res) {
  try {
    const {
      body: { address },
      query: { orderNumber },
    } = req;
    const { type } = address;
    const property = type === 'billing' ? 'billingAddress' : 'shippingAddress';
    const response = req.api.orderApi.updateOrder({
      property,
      orderNumber,
      update: address,
    });
    res.statusCode = 200;
    res.json(response);
  } catch (e) {
    res.json({ address: null });
  }
}
