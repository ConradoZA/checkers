import './index.css';
import Home from './routes/Home';
import NotFound from './routes/NotFound';
import React from 'react';
import ReactDOM from 'react-dom/client';
import TheHeader from './components/the-header/TheHeader';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Home />,
    errorElement: <NotFound />,
  },
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <TheHeader />
    <RouterProvider router={router} />
  </React.StrictMode>,
);
