import handler from '../../../../../api-utils/connectHandler';
import nextConnect from 'next-connect';

const connectHandler = nextConnect().use(handler);
connectHandler.post(addItem);

export default connectHandler;

function addItem(req, res) {
  const {
    body: { item },
    query: { orderNumber },
  } = req;
  const response = req.api.orderApi.addItem({
    orderNumber,
    item,
  });
  res.statusCode = 200;
  res.json(response);
}
