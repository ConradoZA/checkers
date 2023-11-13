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
      className='tw-flex tw-min-h-screen tw-min-w-[100vw]
      tw-flex-col tw-content-center tw-justify-center
      tw-bg-amber-50 tw-px-[calc((100vw-85vmin)/2)]
      dark:tw-bg-stone-700 md:tw-flex-row md:tw-px-[calc((100vw-100vmin)/2)] md:tw-py-[calc((100vh-85vmin)/2)]'
    >
      <div className='tw-flex tw-h-[8vmin] tw-w-[85vmin] tw-flex-row tw-justify-evenly tw-border tw-border-orange-950 tw-bg-white tw-px-1 tw-text-[2vmin] md:tw-h-[85vmin] md:tw-w-[15vmin] md:tw-flex-col'>
        <p>
          {wording.turn}: <span className='tw-font-bold'>{boardState.getTurnNumber()}</span>
          <br />
          {wording.play}:&nbsp;
          <span className='tw-font-bold'>
            {boardState.getTurnColor() === 'white' ? wording.white : wording.black}
          </span>
        </p>
        <p>
          {wording.noCapture}: {25 - boardState.getTurnsUntilDraw()}
        </p>
        <p>
          {wording.whitePieces}: &nbsp;{boardState.getWhiteMenNum()} /&nbsp;
          {boardState.getWhiteQueensNum()}
          <br />
          {wording.blackPieces}: &nbsp;{boardState.getBlackMenNum()} /&nbsp;
          {boardState.getBlackQueensNum()}
        </p>
        {boardState.getFinishResult() !== 'notFinished' && (
          <p>
            {wording.finished} {wording[boardState.getFinishResult()]}
          </p>
        )}
      </div>
      <DndProvider options={HTML5toTouch}>
        <div className='tw-grid tw-max-h-[85vmin] tw-max-w-[85vmin] tw-grid-cols-10 tw-gap-0'>
          {createBoard()}
        </div>
      </DndProvider>
    </div>
  );
};

export default Checkers;
