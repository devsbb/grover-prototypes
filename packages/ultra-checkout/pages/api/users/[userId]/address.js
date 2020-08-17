import connectHandler from '../../../../api-utils/connectHandler';
import nextConnect from 'next-connect';

const handler = nextConnect().use(connectHandler);
handler.get(getAddresses);
handler.post(addAddress);
handler.patch(updateAddress);

export default handler;

async function updateAddress(req, res) {
  try {
    const {
      body: { address },
      query: { userId },
    } = req;
    const response = await req.api.userApi.updateAddress({
      userId,
      address,
    });
    res.statusCode = 200;
    res.json(response);
  } catch (e) {
    console.error(e);
    res.json({ addresses: e });
  }
}

async function addAddress(req, res) {
  try {
    const {
      body: { address },
      query: { userId },
    } = req;
    const response = await req.api.userApi.addAddress({
      userId,
      address,
    });
    res.statusCode = 200;
    res.json(response);
  } catch (e) {
    console.error(e);

    res.json({ address: null });
  }
}

async function getAddresses(req, res) {
  try {
    const {
      query: { userId },
    } = req;
    const response = await req.api.userApi.getAddresses({
      userId,
    });
    res.statusCode = 200;
    res.json(response);
  } catch (e) {
    console.error(e);
    res.json({ addresses: null });
  }
}
