import handler from '../../../../api-utils/connectHandler';
import nextConnect from 'next-connect';

const connectHandler = nextConnect().use(handler);
connectHandler.patch(completeOrder);
export default connectHandler;

async function completeOrder(req, res) {
  try {
    const {
      query: { orderNumber },
    } = req;
    const response = await req.api.orderApi.completeOrder({
      orderNumber,
    });
    res.statusCode = 200;
    res.json(response);
  } catch (e) {
    res.json({ order: null });
  }
}
