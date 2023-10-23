import React from 'react';
import { useTheme } from '../../hooks/useTheme';

const ThemeToggle: React.FC = () => {
  const darkIcon = (
    <svg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='currentColor'>
      <path
        strokeLinecap='round'
        strokeLinejoin='round'
        strokeWidth='2'
        d='M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z'
      />
    </svg>
  );
  const lightIcon = (
    <svg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='currentColor'>
      <path
        strokeLinecap='round'
        strokeLinejoin='round'
        strokeWidth='2'
        d='M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z'
      />
    </svg>
  );

  const theme = useTheme();

  return (
    <button
      className='tw-flex tw-h-5 tw-w-10
      tw-items-center tw-rounded-full
      tw-bg-white tw-shadow
      tw-transition tw-duration-300
      dark:tw-bg-black'
      onClick={() => theme.changeTheme()}
    >
      <div
        className='tw-relative tw-h-6 tw-w-6
        -tw-translate-x-2 tw-transform tw-rounded-full
        tw-bg-yellow-500 tw-p-1 tw-text-black
        tw-transition tw-duration-500
        dark:tw-translate-x-full dark:tw-bg-sky-700 dark:tw-text-white'
      >
        {theme.getTheme() === 'tw-dark' ? darkIcon : lightIcon}
      </div>
    </button>
  );
};

export default ThemeToggle;
