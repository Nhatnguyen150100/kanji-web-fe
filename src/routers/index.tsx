import { createBrowserRouter } from 'react-router-dom';
import App from '../pages/App';
import ErrorPage from '../pages/not-found';
import DEFINE_ROUTERS from '../constants/routers-mapper';
import AdminPage from '../modules/admin';
import LoginPage from '../modules/auth/login';

const router = createBrowserRouter([
  {
    path: DEFINE_ROUTERS.home,
    element: <App />,
    errorElement: <ErrorPage />,
  },
  {
    path: DEFINE_ROUTERS.auth.login,
    element: <LoginPage />,
  },
  {
    path: DEFINE_ROUTERS.auth.logout,
    element: <LoginPage />,
  },
  {
    path: DEFINE_ROUTERS.admin,
    element: <AdminPage />,
  },
]);

export default router;
