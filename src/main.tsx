import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './stylesheet/index.scss';
import { RouterProvider } from 'react-router-dom';
import router from './routers';

const rootElement = document.getElementById('root');

if (rootElement) {
  createRoot(rootElement).render(
    <StrictMode>
      <RouterProvider router={router} />
    </StrictMode>,
  );
}
