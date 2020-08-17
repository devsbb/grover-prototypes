import handler from '../../../api-utils/connectHandler';
import nextConnect from 'next-connect';

const connectHandler = nextConnect().use(handler);
connectHandler.get(getOrder);
connectHandler.post(createOrder);

export default connectHandler;

async function getOrder(req, res) {
  try {
    const {
      query: { orderNumber },
    } = req;
    const response = await req.api.orderApi.getOrder({
      orderNumber,
    });
    res.statusCode = 200;
    res.json(response);
  } catch (e) {
    res.json({ order: null });
  }
}
async function createOrder(req, res) {
  try {
    const {
      body: { lineItems, orderMode, guestToken },
    } = req;
    const { id } = req.session.user || guestToken;
    const response = await req.api.orderApi.createOrder({
      lineItems,
      userId: id,
      orderMode,
    });
    res.statusCode = 200;
    res.json(response);
  } catch (e) {
    console.error(e);
  }
}
