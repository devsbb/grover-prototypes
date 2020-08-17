import handler from '../../api-utils/connectHandler';
import nextConnect from 'next-connect';

const connectHandler = nextConnect().use(handler);
connectHandler.get(logout);

export default connectHandler;

async function logout(req, res) {
  try {
    const { api } = req;
    const { userId } = req.session.get('user');
    await api.deleteUserData({ userId });
  } catch (e) {
    console.error(e);
  }
  req.session.destroy();

  res.send('Logged out');
}
