import handler from '../../api-utils/connectHandler';
import nextConnect from 'next-connect';

const connectHandler = nextConnect().use(handler);
connectHandler.get(getUser);

export default connectHandler;

async function getUser(req, res) {
  try {
    const user = await req.session.get('user');
    if (!user) return res.json({ user: null });
    const response = await req.api.userApi.getUser({ userId: user.id });
    res.statusCode = 200;
    res.json(response);
  } catch (error) {
    console.error(error);
    res.statusCode = 500;
    res.json({ error });
  }
}
