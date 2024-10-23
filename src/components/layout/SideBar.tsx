import { Link, useLocation, useNavigate } from 'react-router-dom';
import DEFINE_ROUTERS from '../../constants/routers-mapper';
import { useDispatch } from 'react-redux';
import cookiesStore from '../../plugins/cookiesStore';
import { setUser } from '../../lib/reducer/userSlice';
import {
  EditOutlined,
  FormOutlined,
  UnorderedListOutlined,
} from '@ant-design/icons';
import isChildUrl from '../../utils/functions/check-active-router';

const routes = [
  {
    path: DEFINE_ROUTERS.dashboard,
    name: 'Dashboard',
    icon: (
      <svg
        className="flex-shrink-0 w-5 h-5 transition duration-75 text-gray-400 group-hover:text-white"
        aria-hidden="true"
        xmlns="http://www.w3.org/2000/svg"
        fill="currentColor"
        viewBox="0 0 22 21"
      >
        <path d="M16.975 11H10V4.025a1 1 0 0 0-1.066-.998 8.5 8.5 0 1 0 9.039 9.039.999.999 0 0 0-1-1.066h.002Z" />
        <path d="M12.5 0c-.157 0-.311.01-.565.027A1 1 0 0 0 11 1.02V10h8.975a1 1 0 0 0 1-.935c.013-.188.028-.374.028-.565A8.51 8.51 0 0 0 12.5 0Z" />
      </svg>
    ),
  },
  {
    path: DEFINE_ROUTERS.kanjiManager,
    name: 'Kanjis',
    icon: (
      <EditOutlined className="transition duration-75 text-gray-400 group-hover:text-white" />
    ),
  },
  {
    path: DEFINE_ROUTERS.accountManager,
    name: 'Account',
    icon: (
      <UnorderedListOutlined className="transition duration-75 text-gray-400 group-hover:text-white" />
    ),
  },
  {
    path: DEFINE_ROUTERS.examManager,
    name: 'Exam',
    icon: (
      <FormOutlined className="transition duration-75 text-gray-400 group-hover:text-white" />
    ),
  },
  // {
  //   path: '/products',
  //   name: 'Products',
  //   icon: (
  //     <svg
  //       className="flex-shrink-0 w-5 h-5 transition duration-75 text-gray-400 group-hover:text-white"
  //       aria-hidden="true"
  //       xmlns="http://www.w3.org/2000/svg"
  //       fill="currentColor"
  //       viewBox="0 0 20 18"
  //     >
  //       <path d="M14 2a3.963 3.963 0 0 0-1.4.267 6.439 6.439 0 0 1-1.331 6.638A4 4 0 1 0 14 2Zm1 9h-1.264A6.957 6.957 0 0 1 15 15v2a2.97 2.97 0 0 1-.184 1H19a1 1 0 0 0 1-1v-1a5.006 5.006 0 0 0-5-5ZM6.5 9a4.5 4.5 0 1 0 0-9 4.5 4.5 0 0 0 0 9ZM8 10H5a5.006 5.006 0 0 0-5 5v2a1 1 0 0 0 1 1h11a1 1 0 0 0 1-1v-2a5.006 5.006 0 0 0-5-5Z" />
  //     </svg>
  //   ),
  // },
];

const Sidebar = () => {
  const location = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogOut = () => {
    dispatch(
      setUser({
        id: '',
        userName: null,
        fullName: null,
        gender: null,
        birthDay: null,
        phoneNumber: null,
        email: '',
        role: 'ADMIN',
        createdAt: '',
        updatedAt: '',
      }),
    );
    cookiesStore.remove('access_token');
    navigate(DEFINE_ROUTERS.loginAdmin);
  };

  return (
    <aside
      id="default-sidebar"
      className="top-0 left-0 z-40 w-64 h-screen transition-transform -translate-x-full sm:translate-x-0"
      aria-label="Sidebar"
    >
      <div className="h-full px-3 py-4 overflow-y-auto bg-gray-800">
        <ul className="space-y-2 font-medium">
          {routes.map((route) => (
            <li key={route.path}>
              <Link
                to={route.path}
                className={`flex items-center p-2 rounded-lg text-white hover:bg-gray-700 group ${
                  isChildUrl(route.path, location.pathname) &&
                  'bg-gray-700 text-white'
                }`}
              >
                {route.icon}
                <span
                  className={`ms-3 ${
                    isChildUrl(route.path, location.pathname) &&
                    'font-bold text-lg'
                  }`}
                >
                  {route.name}
                </span>
              </Link>
            </li>
          ))}
          <li>
            <div
              className={`flex items-center p-2 rounded-lg text-white hover:bg-gray-700 group hover:cursor-pointer`}
              onClick={handleLogOut}
            >
              <svg
                className="flex-shrink-0 w-5 h-5 transition duration-75 text-gray-400 group-hover:text-white"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 18 16"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M1 8h11m0 0L8 4m4 4-4 4m4-11h3a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2h-3"
                />
              </svg>
              <span className={`ms-3`}>Log out</span>
            </div>
          </li>
        </ul>
      </div>
    </aside>
  );
};

export default Sidebar;
