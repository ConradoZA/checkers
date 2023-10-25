import LangToggle from '../language-toggle/LangToggle';
import React from 'react';
import ThemeToggle from '../theme-toggle/ThemeToggle';
import { useNavigate } from 'react-router-dom';
import { useTranslate } from '../../hooks/useTranslate';

const TheHeader: React.FC = () => {
  const navigate = useNavigate();
  const lang = useTranslate();
  const wording = lang.getSection('header', lang.getLang());

  return (
    <header className='tw-absolute tw-w-full tw-bg-[#553C2A] tw-text-gray-200 tw-shadow dark:tw-bg-[#896044]'>
      <div className='tw-mx-auto tw-flex tw-flex-col tw-flex-wrap tw-items-center tw-p-3 md:tw-flex-row'>
        <div className='tw-flex tw-flex-wrap tw-items-center tw-text-base md:tw-ml-auto lg:tw-w-1/4'>
          <LangToggle />
        </div>

        <div
          className='tw-order-first tw-flex tw-items-center tw-font-medium
          md:tw-mb-0
          lg:tw-order-none lg:tw-w-2/4 lg:tw-items-center lg:tw-justify-center'
        >
          <button
            className='tw-rounded-md
            tw-border-2 tw-border-solid tw-border-red-700
            tw-px-2 tw-py-1 tw-text-red-500
            tw-shadow-md tw-shadow-red-500
            dark:tw-text-red-200 dark:tw-shadow-red-900'
            onClick={() => navigate('/checkers')}
          >
            {wording.checkers}
          </button>
        </div>

        <div className='tw-ml-5 tw-inline-flex tw-h-full tw-items-center lg:tw-ml-0 lg:tw-w-1/4 lg:tw-justify-end'>
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
};

export default TheHeader;
