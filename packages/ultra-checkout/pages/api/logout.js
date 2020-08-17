import handler from '../../api-utils/connectHandler';
import nextConnect from 'next-connect';

const connectHandler = nextConnect().use(handler);
connectHandler.get(logout);

export default connectHandler;

async function logout(req, res) {
  try {
    const { api } = req;
    const { id } = req.session.user;
    await api.deleteUserData({ userId: id });
  } catch (e) {
    console.error(e);
  }
  req.session.destroy();

  res.json({ user: null });
}
