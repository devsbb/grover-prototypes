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
  const {
    body: { items, userId },
    query: { orderMode },
  } = req;
  const response = await req.api.orderApi.createOrder({
    items,
    userId,
    orderMode,
  });
  res.statusCode = 200;
  res.json(response);
}
