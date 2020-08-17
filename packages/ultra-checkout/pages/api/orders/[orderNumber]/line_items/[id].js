import handler from '../../../../../api-utils/connectHandler';
import nextConnect from 'next-connect';

const connectHandler = nextConnect().use(handler);

connectHandler.patch(updateItem);
connectHandler.delete(deleteItem);

export default connectHandler;

async function updateItem(req, res) {
  try {
    const {
      body: { item },
      query: { orderNumber, id },
    } = req;
    const response = await req.api.orderApi.updateItem({
      itemId: id,
      orderNumber,
      item,
    });
    res.statusCode = 200;
    res.json(response);
  } catch (e) {
    res.json({ item: null });
  }
}
async function deleteItem(req, res) {
  try {
    const {
      query: { orderNumber, id },
    } = req;
    const response = await req.api.orderApi.deleteItem({
      itemId: id,
      orderNumber,
    });
    res.statusCode = 200;
    res.json(response);
  } catch (e) {
    res.json({ item: null });
  }
}
