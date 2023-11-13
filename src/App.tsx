import Checkers from './routes/Checkers';
import Home from './routes/Home';
import Navbar from './components/navbar/Navbar';
import NotFound from './routes/NotFound';
import React from 'react';
import { Outlet, RouterProvider, createBrowserRouter } from 'react-router-dom';
import { useTheme } from './hooks/useTheme';

const Layout = () => {
  return (
    <>
      <Navbar />
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
          element: <Checkers />,
        },
        {
          path: '/privacy',
          element: (
            <div className='tw-h-screen tw-w-screen tw-bg-amber-50 tw-p-20 dark:tw-bg-stone-700'>
              <div className='tw-h-[8.5vmin] tw-w-[8.5vmin] tw-border tw-border-amber-950 tw-bg-black'>
                <div className='tw-relative tw-mx-auto tw-mt-[10%] tw-h-[80%] tw-w-[80%] tw-rounded-full tw-bg-red-900 tw-object-center tw-pl-[5%] tw-pt-[5%]'>
                  <div className='tw-ml-[1px] tw-mt-[1px] tw-h-[90%] tw-w-[90%] tw-rounded-full tw-border-2 tw-border-red-950'>
                    <div className='tw-text-center tw-text-4xl tw-leading-[2.8rem] tw-text-neutral-400'>
                      ♕
                    </div>
                  </div>
                </div>
              </div>
            </div>
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
