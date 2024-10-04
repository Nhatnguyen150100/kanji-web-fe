import React from 'react';
import { Outlet, Navigate } from 'react-router-dom';
import DEFINE_ROUTERS from '../constants/routers-mapper';
import { RootState } from '../lib/store';
import { useSelector } from 'react-redux';

const App: React.FC = () => {
  const user = useSelector((state: RootState) => state.user);
  const isLoggedIn = user.id;

  return (
    <>
      {!isLoggedIn ? (
        <Navigate to={DEFINE_ROUTERS.auth.login} replace />
      ) : (
        <Navigate to={DEFINE_ROUTERS.user} replace />
      )}
    </>
  );
};

export default App;
