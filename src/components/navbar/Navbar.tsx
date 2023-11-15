import LangToggle from '../language-toggle/LangToggle';
import React, { useState } from 'react';
import ThemeToggle from '../theme-toggle/ThemeToggle';
import { useBoardState } from '../../hooks/useBoardState';
import { useTranslate } from '../../hooks/useTranslate';

const Navbar: React.FC = () => {
  const board = useBoardState();
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
        className={`tw-z-30 tw-flex tw-flex-col tw-place-items-center tw-gap-3 tw-overflow-hidden tw-transition-all tw-duration-500 tw-ease-linear ${
          open
            ? 'tw-visible tw-h-full tw-w-full tw-p-1 tw-opacity-100'
            : 'tw-invisible tw-h-0 tw-w-0 tw-opacity-0'
        }`}
      >
        <LangToggle />
        <ThemeToggle />
        <button className='tw-truncate tw-font-medium' onClick={board.restartBoard}>
          {wording.reset}
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
