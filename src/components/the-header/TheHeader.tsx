import React from 'react';
import ThemeToggle from '../theme-toggle/ThemeToggle';

const TheHeader: React.FC = () => {
  return (
    <header className='tw-z-0 tw-h-12 tw-flex-auto tw-bg-blue-700 dark:tw-bg-orange-500'>
      <ThemeToggle />
    </header>
  );
};

export default TheHeader;
