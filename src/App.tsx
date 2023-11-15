import Checkers from './routes/Checkers';
import Navbar from './components/navbar/Navbar';
import NotFound from './routes/NotFound';
import React, { useEffect } from 'react';
import { Outlet, RouterProvider, createBrowserRouter } from 'react-router-dom';
import { useBoardState } from './hooks/useBoardState';
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
  const boardState = useBoardState();
  const theme = useTheme();
  const router = createBrowserRouter([
    {
      path: '/checkers',
      element: <Layout />,
      errorElement: <NotFound />,
      children: [
        {
          path: '',
          element: <Checkers />,
        },
      ],
    },
  ]);

  useEffect(() => {
    const data = localStorage.getItem('damas');
    const obj = JSON.parse(data as string);
    if (data) {
      boardState.reloadBoard(obj);
    }
  }, []);

  return (
    <div className={theme.getTheme()}>
      <RouterProvider router={router} />
    </div>
  );
};

export default App;
