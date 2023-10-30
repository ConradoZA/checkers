import React from 'react';
import { HTML5toTouch } from 'rdndmb-html5-to-touch';
import { DndProvider } from 'react-dnd-multi-backend';

const Checkers: React.FC = () => {
  return (
    <>
      {/* tablero info */}
      <DndProvider options={HTML5toTouch}>
        <div className='tw-h-screen tw-w-screen tw-bg-amber-50 tw-pt-20 dark:tw-bg-stone-700'>
          hola
        </div>
      </DndProvider>
    </>
  );
};

export default Checkers;
