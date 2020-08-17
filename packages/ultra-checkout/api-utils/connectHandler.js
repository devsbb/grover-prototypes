import nextConnect from 'next-connect';
import { session } from 'next-session';

import { mockApi } from './api';
const options = {
  cookieName: 'test',
  password: process.env.SESSION_TOKEN,
  // if your localhost is served on http:// then disable the secure flag
  cookieOptions: {
    secure: process.env.NODE_ENV === 'production',
  },
};

const handler = nextConnect();
handler.use(session({ ...options }));
handler.use(function (req, res, next) {
  req.api = mockApi;
  next();
});
export default handler;
