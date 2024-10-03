import React from 'react';
import { Provider } from 'react-redux';
import { Outlet } from 'react-router-dom';
import { store } from '../lib/store';

const App: React.FC = () => {
  return (
    <>
      <Provider store={store}>
        <Outlet />
      </Provider>
    </>
  );
};

export default App;
