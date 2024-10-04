const _prefixSegment = '/auth';

const authRouter = {
  login: `${_prefixSegment}/login`,
  register: `${_prefixSegment}/register`,
};

const DEFINE_ROUTERS = {
  home: '/',
  admin: '/admin',
  auth: authRouter,
  user: '/dashboard',
  listKanjis: '/dashboard/list-kanjis',
};
export default DEFINE_ROUTERS;
