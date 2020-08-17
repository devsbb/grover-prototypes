import handler from '../../../../api-utils/connectHandler';
import nextConnect from 'next-connect';

const connectHandler = nextConnect().use(handler);
connectHandler.patch(updatePaymentMethod);
export default connectHandler;

async function updatePaymentMethod(req, res) {
  try {
    const {
      body: { paymentMethod },
      query: { orderNumber },
    } = req;
    const response = await req.api.orderApi.updateOrder({
      orderNumber,
      property: 'paymentMethod',
      update: paymentMethod,
    });
    res.statusCode = 200;
    res.json(response);
  } catch (e) {
    res.json({ paymentMethod: null });
  }
}
