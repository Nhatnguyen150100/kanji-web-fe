import * as React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../lib/store';
import { Navigate, Outlet } from 'react-router-dom';
import DEFINE_ROUTERS from '../../constants/routers-mapper';
import SideBar from '../../components/layout/SideBar';

interface IProps {}

export default function AdminPage({}: IProps) {
  const user = useSelector((state: RootState) => state.user);
  const isLoggedIn = user.id && user.role === 'ADMIN';

  return (
    <>
      {!isLoggedIn ? (
        <Navigate to={DEFINE_ROUTERS.loginAdmin} replace />
      ) : (
        <div className="h-full w-full flex flex-row">
          <SideBar />
          <div className="p-10 w-full">
            <Outlet />
          </div>
        </div>
      )}
    </>
  );
}
