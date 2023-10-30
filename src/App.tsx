import Checkers from './routes/Checkers';
import Home from './routes/Home';
import NotFound from './routes/NotFound';
import React from 'react';
import TheFooter from './components/the-footer/TheFooter';
import TheHeader from './components/the-header/TheHeader';
import { Outlet, RouterProvider, createBrowserRouter } from 'react-router-dom';
import { useTheme } from './hooks/useTheme';

const Layout = () => {
  return (
    <>
      <TheHeader />
      <Outlet />
      <TheFooter />
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
          element: <Checkers />,
        },
        {
          path: '/privacy',
          element: (
            <div className='tw-h-screen tw-w-screen tw-bg-amber-50 dark:tw-bg-stone-700'>Hola</div>
          ),
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
