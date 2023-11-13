import LangToggle from '../language-toggle/LangToggle';
import React, { useState } from 'react';
import ThemeToggle from '../theme-toggle/ThemeToggle';
import { useLocation, useNavigate } from 'react-router-dom';
import { useTranslate } from '../../hooks/useTranslate';

const Navbar: React.FC = () => {
  const navigate = useNavigate();
  const locate = useLocation();
  const lang = useTranslate();
  const wording = lang.getSection('navbar', lang.getLang());

  const [open, setOpen] = useState(false);

  return (
    <nav className='tw-absolute tw-right-0 tw-top-0 tw-z-20 tw-flex tw-max-h-max tw-max-w-max tw-flex-row-reverse tw-rounded tw-bg-orange-400 tw-bg-opacity-80 tw-px-4 tw-py-2 tw-shadow-md tw-shadow-neutral-800'>
      <button
        className='tw-flex tw-cursor-pointer tw-items-center tw-justify-between'
        onClick={() => setOpen(!open)}
      >
        <svg
          xmlns='http://www.w3.org/2000/svg'
          className='tw-h-6 tw-w-6'
          fill='none'
          stroke='currentColor'
          strokeWidth='2'
        >
          <path strokeLinecap='round' strokeLinejoin='round' d='M4 6h16M4 12h16M4 18h16'></path>
        </svg>
      </button>
      <div
        className={`tw-z-30 tw-block tw-overflow-hidden tw-transition-all tw-duration-500 tw-ease-linear ${
          open
            ? 'tw-visible tw-h-full tw-w-full tw-p-1 tw-opacity-100'
            : 'tw-invisible tw-h-0 tw-w-0 tw-opacity-0'
        }`}
      >
        <LangToggle />
        <ThemeToggle />

        {/* {locate.pathname !== '/' && (
          <button
            className='tw-mx-6 tw-rounded-md
            tw-border-2 tw-border-solid tw-border-orange-700
            tw-px-2 tw-py-1 tw-text-orange-500
            tw-shadow-md tw-shadow-orange-500
          dark:tw-text-orange-200 dark:tw-shadow-orange-900'
            onClick={() => navigate('/')}
          >
            {wording.home}
          </button>
        )}

        {locate.pathname !== '/checkers' && (
          <button
            className='tw-mx-6 tw-rounded-md
            tw-border-2 tw-border-solid tw-border-red-700
            tw-px-2 tw-py-1 tw-text-red-500
            tw-shadow-md tw-shadow-red-500
          dark:tw-text-red-200 dark:tw-shadow-red-900'
            onClick={() => navigate('/checkers')}
          >
            {wording.checkers}
          </button>
        )} */}
      </div>
    </nav>
  );

  /* <nav className=' tw-block tw-h-max tw-w-min tw-rounded tw-border tw-border-white/80 tw-bg-orange-400 tw-bg-opacity-80 tw-px-4 tw-py-2 tw-shadow-md tw-shadow-neutral-800'>
       <div className='tw-flex tw-flex-row-reverse tw-items-center'>
        <button className='tw-h-6 tw-w-6 tw-text-gray-500' onClick={() => setOpen((prev) => !prev)}>
          <span className='-tw-translate-x-1/2 -tw-translate-y-1/2 tw-transform'>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              className='tw-h-6 tw-w-6'
              fill='none'
              stroke='currentColor'
              strokeWidth='2'
            >
              <path strokeLinecap='round' strokeLinejoin='round' d='M4 6h16M4 12h16M4 18h16'></path>
            </svg>
          </span>
        </button>
      </div>
      <div className='tw-invisible tw-max-w-0 tw-h-auto tw-max-h-0 tw-items-center tw-opacity-0 tw-transition-all group-focus:tw-visible group-focus:tw-max-h-screen group-focus:tw-max-w-screen group-focus:tw-opacity-100 group-focus:tw-duration-1000 group-focus:tw-ease-in'>
        <div className='tw-mb-4 tw-mt-2 tw-flex tw-flex-col tw-gap-2 tw-pb-2'>
          <LangToggle />

          {locate.pathname !== '/' && (
            <button
              className='tw-mx-6 tw-rounded-md
          tw-border-2 tw-border-solid tw-border-orange-700
          tw-px-2 tw-py-1 tw-text-orange-500
          tw-shadow-md tw-shadow-orange-500
          dark:tw-text-orange-200 dark:tw-shadow-orange-900'
              onClick={() => navigate('/')}
            >
              {wording.home}
            </button>
          )}

          {locate.pathname !== '/checkers' && (
            <button
              className='tw-mx-6 tw-rounded-md
          tw-border-2 tw-border-solid tw-border-red-700
          tw-px-2 tw-py-1 tw-text-red-500
          tw-shadow-md tw-shadow-red-500
          dark:tw-text-red-200 dark:tw-shadow-red-900'
              onClick={() => navigate('/checkers')}
            >
              {wording.checkers}
            </button>
          )}
          <div
            className='tw-inline-flex
          md:tw-mx-5
          lg:tw-w-1/4 lg:tw-justify-end'
          >
            <ThemeToggle />
          </div>
        </div>
      </div>
     </nav> */
};

export default Navbar;
