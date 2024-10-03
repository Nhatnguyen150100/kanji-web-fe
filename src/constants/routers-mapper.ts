const _prefixSegment = '/auth';

const authRouter = {
  login: `${_prefixSegment}/login`,
  logout: `${_prefixSegment}/logout`,
};

const ROUTERS_DEFINE = {
  home: '/',
  admin: '/admin',
  auth: authRouter,
  user: '/dashboard',
};
export default ROUTERS_DEFINE;
