import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslate } from '../../hooks/useTranslate';

const TheFooter: React.FC = () => {
  const navigate = useNavigate();
  const lang = useTranslate();
  const wording = lang.getSection('footer', lang.getLang());
  return (
    <footer className='tw-absolute tw-bottom-0 tw-w-screen tw-bg-[#BD9847]'>
      <hr className='tw-border-zinc-400' />
      <div className='tw-flex tw-flex-col tw-items-center md:tw-flex-row md:tw-justify-between'>
        <p className='tw-ml-4 tw-text-sm md:tw-w-1/6'>
          <span className='tw-inline-block tw-rotate-180'>©</span> Copyleft 2023. No Rights
          Reserved.
        </p>

        <div
          className='tw-h-16 tw-w-screen
          tw-bg-[url("/als_ich_kan.webp")] tw-bg-cover tw-bg-center
          md:tw-w-4/6'
        >
          {' '}
        </div>

        <div className='tw-mt-0 tw-flex tw-justify-evenly md:tw-w-1/6'>
          <button className='' onClick={() => navigate('/privacy')}>
            {wording.privacy}
          </button>
          {/* <button className='' onClick={() => navigate('/about')}>
            {wording.about}
          </button> */}
        </div>
      </div>
    </footer>
  );
};

export default TheFooter;
