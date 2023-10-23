import Home from './routes/Home';
import NotFound from './routes/NotFound';
import React from 'react';
import TheHeader from './components/the-header/TheHeader';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import { useTheme } from './hooks/useTheme';

const App: React.FC = () => {
  const router = createBrowserRouter([
    {
      path: '/',
      element: <Home />,
      errorElement: <NotFound />,
    },
  ]);

  return (
    <div className={useTheme().getTheme()}>
      <TheHeader />
      <RouterProvider router={router} />
    </div>
  );
};

export default App;
