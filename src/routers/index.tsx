import { createBrowserRouter } from 'react-router-dom';
import App from '../pages/App';
import ErrorPage from '../pages/not-found';
import ROUTERS_DEFINE from '../constants/routers-mapper';
import AdminPage from '../modules/admin';
import LoginPage from '../modules/auth/login';

const router = createBrowserRouter([
  {
    path: ROUTERS_DEFINE.home,
    element: <App />,
    errorElement: <ErrorPage />,
  },
  {
    path: ROUTERS_DEFINE.auth.login,
    element: <LoginPage />,
  },
  {
    path: ROUTERS_DEFINE.auth.logout,
    element: <LoginPage />,
  },
  {
    path: ROUTERS_DEFINE.admin,
    element: <AdminPage />,
  },
]);

export default router;
