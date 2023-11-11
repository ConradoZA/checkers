import Piece from '../components/checkers/Piece';
import React from 'react';
import Square from '../components/checkers/Square';
import { HTML5toTouch } from 'rdndmb-html5-to-touch';
import { DndProvider } from 'react-dnd-multi-backend';
import { useBoardState } from '../hooks/useBoardState';
import { useTranslate } from '../hooks/useTranslate';

const Checkers: React.FC = () => {
  const squaresArray: JSX.Element[] = [];
  const boardState = useBoardState();

  const translator = useTranslate();
  const wording: Record<string, string> = translator.getSection('board', translator.getLang());

  const createBoard = (): JSX.Element[] => {
    for (let i = 0; i <= 99; i++) {
      squaresArray.push(addSquare(i));
    }
    return squaresArray;
  };

  const addSquare = (i: number): JSX.Element => {
    const X = i % 10;
    const Y = Math.floor(i / 10);
    const hasPiece = renderIfThereIsPiece(X, Y);
    return (
      <Square x={X} y={Y} key={i}>
        {hasPiece}
      </Square>
    );
  };

  const renderIfThereIsPiece = (x: number, y: number): JSX.Element | undefined => {
    const piece = boardState.findPieceByPosition(x, y);

    if (piece) return <Piece piece={piece} />;
    return undefined;
  };

  return (
    <div
      className='tw-flex tw-h-screen tw-w-screen
      tw-flex-col tw-content-center tw-justify-center
      tw-bg-amber-50 tw-px-[6vmin]
      dark:tw-bg-stone-700 md:tw-flex-row md:tw-pt-[8vh]'
    >
      <div className='tw-flex tw-h-[8vmin] tw-w-[85vmin] tw-flex-row tw-justify-evenly tw-bg-white tw-text-[2.3vmin] md:tw-h-[85vmin] md:tw-w-[16vmin] md:tw-flex-col'>
        <p>
          {wording.turn}: {boardState.getTurnNumber()} <br />
          {wording.play}: {boardState.getTurnColor() === 'white' ? wording.white : wording.black}
        </p>
        <p>
          {wording.noCapture}: {25 - boardState.getTurnsUntilDraw()}
        </p>
        <p>
          {wording.whitePieces}: {boardState.getWhiteMenNum()} / {boardState.getWhiteQueensNum()}
          <br />
          {wording.blackPieces}: &nbsp;{boardState.getBlackMenNum()} /&nbsp;
          {boardState.getBlackQueensNum()}
        </p>
      </div>
      <DndProvider options={HTML5toTouch}>
        <div className='tw-grid tw-max-h-[85vmin] tw-max-w-[85vmin] tw-grid-cols-10 tw-gap-0'>
          {createBoard()}
        </div>
      </DndProvider>
      {/* TODO: estilos flex, historial, deshacer cambios*/}
      {/* <div>
        <button
          className='tw-rounded-md tw-bg-amber-800 tw-px-4 tw-py-2
          tw-text-white tw-shadow-md tw-shadow-neutral-700
          disabled:tw-cursor-not-allowed disabled:tw-bg-neutral-400
          disabled:tw-text-neutral-800 disabled:tw-opacity-50 disabled:tw-shadow-none
          dark:tw-shadow-neutral-800'
        >
          {wording.nextTurn}
        </button>
      </div> */}
    </div>
  );
};

export default Checkers;
