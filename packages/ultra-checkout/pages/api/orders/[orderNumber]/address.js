import handler from '../../../../api-utils/connectHandler';
import nextConnect from 'next-connect';

const connectHandler = nextConnect().use(handler);
connectHandler.patch(updateAddress);

export default connectHandler;

async function updateAddress(req, res) {
  try {
    const {
      body: { address, type },
      query: { orderNumber },
    } = req;
    const property = type === 'billing' ? 'homeAddress' : 'shippingAddress';
    const response = await req.api.orderApi.updateOrder({
      property,
      orderNumber,
      update: address,
    });
    res.statusCode = 200;
    res.json(response);
  } catch (e) {
    console.error(e);
    res.json({ address: null });
  }
}
