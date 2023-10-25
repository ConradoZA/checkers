import Home from './Home';
import NotFound from './NotFound';
import { fireEvent, render, screen } from '@testing-library/react';
import { RouterProvider, createMemoryRouter } from 'react-router-dom';

/* eslint-disable @typescript-eslint/no-explicit-any */

describe('Not Found Tests', () => {
  beforeEach(() => {
    // vi.clearAllMocks();
    const routes = [
      { path: '/', element: <Home /> },
      { path: '*', element: <NotFound /> },
    ];

    const router = createMemoryRouter(routes, {
      initialEntries: ['/', '/bad/url', '/bad/other'],
      initialIndex: 2,
    });

    render(<RouterProvider router={router} />);
  });

  // afterEach(() => {
  //   vi.restoreAllMocks();
  // });

  it('should show error page', () => {
    expect(screen.queryByTestId('error-page')?.children.item(0)?.textContent).toBe('Oops!');
    expect(screen.queryByTestId('error-message')).toBeDefined();
  });

  it('should go back one step', () => {
    const button = screen.getByTestId('error-go-back');

    fireEvent.click(button);

    expect(screen.queryByTestId('error-message')).toBeDefined();
  });

  it('should go home', () => {
    const button = screen.getByTestId('error-go-home');

    fireEvent.click(button);

    expect(screen.queryByTestId('error-message')).toBeNull();
  });

  // it('should show error of type ErrorResponse', () => {
  //   vi.mock('react-router-dom', async () => {
  //     const actual: Record<any, any> = await vi.importActual('react-router-dom');
  //     return {
  //       ...actual,
  //       useRouteError: vi
  //         .fn()
  //         .mockClear()
  //         .mockReturnValue({ data: 'Prueba', statusText: 'algo', status: 400 }),
  //       isRouteErrorResponse: vi.fn().mockClear().mockResolvedValue(true),
  //     };
  //   });

  //   expect(screen.getByTestId('error-message').textContent).toBe('Prueba');
  // });

  // it('should show error of type string', () => {
  //   vi.mock('react-router-dom', async () => {
  //     const actual: Record<any, any> = await vi.importActual('react-router-dom');
  //     return {
  //       ...actual,
  //       useRouteError: vi.fn().mockClear().mockReturnValue('string'),
  //     };
  //   });

  //   expect(screen.getByTestId('error-message').textContent).toBe('string');
  // });
});
