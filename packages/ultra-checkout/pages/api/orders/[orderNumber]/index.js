import handler from '../../../../api-utils/connectHandler';
import nextConnect from 'next-connect';

const connectHandler = nextConnect().use(handler);
connectHandler.delete(deleteOrder);
connectHandler.get(getOrder);
connectHandler.patch(updateOrder);

export default connectHandler;

function deleteOrder(req, res) {
  const {
    query: { orderNumber },
  } = req;
  const response = req.api.orderApi.deleteOrder({
    orderNumber,
  });
  res.statusCode = 200;
  res.json(response);
}
function getOrder(req, res) {
  const {
    query: { orderNumber },
  } = req;
  const response = req.api.orderApi.getOrder({
    orderNumber,
  });
  res.statusCode = 200;
  res.json(response);
}

function updateOrder(req, res) {
  const {
    body: { order },
    query: { orderNumber },
  } = req;
  const { step } = order;
  if (!step) {
    res.statusCode = 400;
    res.json({});
  }
  const response = req.api.orderApi.updateOrder({
    orderNumber,
    property: 'step',
    update: step,
  });
  res.statusCode = 200;
  res.json(response);
}
