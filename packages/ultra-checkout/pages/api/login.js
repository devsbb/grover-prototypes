import handler from '../../api-utils/connectHandler';
import nextConnect from 'next-connect';

const connectHandler = nextConnect().use(handler);
connectHandler.post(login);

export default connectHandler;

async function login(req, res) {
  let user = {
    userId: 230,
    username: 'test',
  };
  try {
    const {
      body: { name },
    } = req;
    user = await req.api.userApi.createUser({ name });
    if (!user) return res.json({ failed: true });
    req.session.user = user;
    await req.session.commit();
    const success = req.session.user;
    res.json(success);
  } catch (e) {
    console.error(e);
  }
}
