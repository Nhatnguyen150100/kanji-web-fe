import React from 'react';
import { Outlet, Navigate, useLocation } from 'react-router-dom';
import DEFINE_ROUTERS from '../constants/routers-mapper';
import { RootState } from '../lib/store';
import { useSelector } from 'react-redux';
import cookiesStore from '../plugins/cookiesStore';

const App: React.FC = () => {
  const user = useSelector((state: RootState) => state.user);
  const isLoggedIn = Boolean(
    user.id && user.role === 'USER' && cookiesStore.get('access_token'),
  );

  return (
    <>
      {!isLoggedIn ? (
        <Navigate to={DEFINE_ROUTERS.auth.login} replace />
      ) : (
        <Navigate to={DEFINE_ROUTERS.listKanjis} replace />
      )}
    </>
  );
};

export default App;
