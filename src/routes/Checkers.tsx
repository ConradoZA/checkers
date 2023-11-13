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
      className='tw-flex tw-min-h-screen tw-min-w-full
      tw-flex-col tw-content-center tw-justify-center
      tw-bg-amber-50 tw-px-[calc((100vw-85vmin)/2)]
      dark:tw-bg-stone-700 md:tw-flex-row'
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
