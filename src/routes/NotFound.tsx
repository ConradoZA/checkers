import React from 'react';
import { isRouteErrorResponse, useNavigate, useRouteError } from 'react-router-dom';
import { useTranslate } from '../hooks/useTranslate';

const NotFound: React.FC = () => {
  const navigate = useNavigate();
  const error = useRouteError();
  const translator = useTranslate();

  const wording: Record<string, string> = translator.getSection('404', translator.getLang());

  let errorMessage: string;

  if (isRouteErrorResponse(error)) {
    errorMessage = error.data || error.statusText;
  } else if (error instanceof Error) {
    errorMessage = error.message;
  } else if (typeof error === 'string') {
    errorMessage = error;
  } else {
    console.error(error);
    errorMessage = wording.unknown;
  }

  return (
    <div
      data-testid='error-page'
      className='tw-flex tw-h-screen tw-flex-col tw-items-center tw-gap-8 tw-bg-black tw-bg-[url("ur.jpg")] tw-bg-cover tw-bg-bottom tw-bg-no-repeat 2xl:tw-bg-contain'
    >
      <h1 className='tw-mt-12 tw-text-4xl tw-font-bold tw-text-slate-100'>Oops!</h1>
      <p className='tw-text-slate-100'>{wording.message}</p>
      <p className='tw-text-slate-400'>
        <i data-testid='error-message'>{errorMessage}</i>
      </p>
      <button
        className='tw-text-slate-100'
        data-testid='error-go-back'
        onClick={() => navigate(-1)}
      >
        👈 {wording.goBack}
      </button>
      <button
        className='tw-text-slate-100'
        data-testid='error-go-home'
        onClick={() => navigate('/')}
      >
        🏠 {wording.goHome}
      </button>
    </div>
  );
};

export default NotFound;
