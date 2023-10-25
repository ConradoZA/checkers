import React, { useEffect, useRef } from 'react';
import { useTranslate } from '../../hooks/useTranslate';

const LangToggle: React.FC = () => {
  const switcher = useRef<HTMLDivElement>(null);
  const language = useTranslate();

  useEffect(() => {
    if (language.getLang() === 'en') {
      switcher.current?.classList.add('tw-translate-x-2');
    } else {
      switcher.current?.classList.add('-tw-translate-x-2');
    }
  });

  const switchLang = (): void => {
    if (language.getLang() === 'en') {
      language.setLang('es');
      switcher.current?.classList.remove('tw-translate-x-2');
      switcher.current?.classList.add('-tw-translate-x-2');
    } else {
      language.setLang('en');
      switcher.current?.classList.remove('-tw-translate-x-2');
      switcher.current?.classList.add('tw-translate-x-2');
    }
  };

  return (
    <button className='tw-m-2 tw-flex tw-items-center' onClick={() => switchLang()}>
      <span className='tw-mr-1 tw-text-xs tw-font-semibold'>Español</span>
      <div className='tw-h-4 tw-w-8 tw-rounded-full tw-bg-gray-500 tw-p-0.5'>
        <div
          ref={switcher}
          className='tw-mx-auto tw-h-3 tw-w-3
          tw-transform tw-rounded-full
          tw-border-2 tw-border-solid tw-border-black
          tw-bg-white tw-duration-300 tw-ease-in-out'
        ></div>
      </div>
      <span className='tw-ml-1 tw-text-xs tw-font-semibold'>English</span>
    </button>
  );
};

export default LangToggle;
