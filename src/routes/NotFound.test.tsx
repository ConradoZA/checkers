import Home from './Home';
import NotFound from './NotFound';
import { fireEvent, render, screen } from '@testing-library/react';
import { RouterProvider, createMemoryRouter } from 'react-router-dom';

describe('Not Found Tests', () => {
  beforeEach(() => {
    const routes = [{ path: '/', element: <Home />, errorElement: <NotFound /> }];

    const router = createMemoryRouter(routes, {
      initialEntries: ['/', '/bad/url'],
      initialIndex: 1,
    });

    render(<RouterProvider router={router} />);
  });

  it('should show error page', () => {
    expect(screen.getByTestId('error-page').children.item(0)?.textContent).toBe('Oops!');
  });

  it('should go back', () => {
    const button = screen.getByTestId('error-go-back');

    fireEvent.click(button);

    expect(screen.queryByText(/home/i)).not.toBeNull;
  });

  it.skip('should show error as unknown', () => {
    // vi.mock('react-router-dom', async () => {
    //   const actual = await vi.importActual('react-router-dom');
    //   return {
    //     ...actual,
    //     useRouteError: vi.fn().mockReturnValueOnce(undefined),
    //   };
    // });

    expect(screen.getByTestId('error-message').textContent).toBe('Unknown error');
  });
});
