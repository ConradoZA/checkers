import Home from './routes/Home';
import NotFound from './routes/NotFound';
import React from 'react';
import TheHeader from './components/the-header/TheHeader';
import { Outlet, RouterProvider, createBrowserRouter } from 'react-router-dom';
import { useTheme } from './hooks/useTheme';

const Layout = () => {
  return (
    <>
      <TheHeader />
      <Outlet />
    </>
  );
};

const App: React.FC = () => {
  const router = createBrowserRouter([
    {
      path: '/',
      element: <Layout />,
      errorElement: <NotFound />,
      children: [
        {
          path: '/',
          element: <Home />,
        },
        {
          path: '/checkers',
          element: <div>Hola</div>,
        },
      ],
    },
  ]);

  return (
    <div className={useTheme().getTheme()}>
      <RouterProvider router={router} />
    </div>
  );
};

export default App;
