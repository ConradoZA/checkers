import React from 'react';
import { useDrag } from 'react-dnd';
import { PiecePosition, useBoardState } from '../../hooks/useBoardState';
import { useMovements } from '../../hooks/useMovements';
import { identifyType } from './checkersUtils';

type PieceProps = {
  piece: PiecePosition;
};

const Piece: React.FC<PieceProps> = ({ piece }) => {
  const { color, rank } = identifyType(piece.type);
  const movs = useMovements();
  const board = useBoardState();
  const turnColor = board.getTurnColor();
  const boardPieces = board.getBoardState();
  const areCaptures = movs.areAnyCapture(color, boardPieces);
  const hasToCapture = movs.canPieceCapture(piece, boardPieces);
  const hasMovements = movs.hasMovements(piece, boardPieces);
  const isGameFinished = board.getFinishResult() !== 'notFinished';

  const myCanDrag =
    color === turnColor && hasMovements && (!areCaptures || hasToCapture) && !isGameFinished;

  const [{ isDragging }, drag, dragPreview] = useDrag(
    () => ({
      type: rank,
      item: { piece },
      canDrag: myCanDrag,
      collect: (monitor) => ({
        isDragging: monitor.isDragging(),
      }),
    }),
    [hasToCapture, turnColor, isGameFinished],
  );

  const generalStyles = `tw-z-10 tw-relative tw-mx-auto tw-mt-[10%] tw-h-[80%] tw-w-[80%] 
  tw-rounded-full tw-object-center tw-pl-[5%] tw-pt-[5%] ${
    color === 'white' ? 'tw-bg-amber-100' : 'tw-bg-red-900'
  }`;

  const innerPiece: JSX.Element = (
    <div
      className={`tw-h-[90%] tw-w-[90%] tw-rounded-full tw-border-2 md:tw-ml-[1px] md:tw-mt-[1px] ${
        color === 'white' ? 'tw-border-amber-400' : 'tw-border-red-950'
      }`}
    >
      {rank === 'queen' && (
        <div
          className={`tw-text-center tw-text-[4vmin] tw-leading-none ${
            color === 'white' ? 'tw-text-neutral-600' : 'tw-text-neutral-400'
          }`}
        >
          ♕
        </div>
      )}
    </div>
  );

  return isDragging ? (
    <div
      className={generalStyles + ' tw-cursor-grabbing tw-opacity-50 tw-animate-ping'}
      id={piece.id}
      ref={dragPreview}
    >
      {innerPiece}
    </div>
  ) : (
    <div
      className={
        generalStyles +
        (hasToCapture && color === turnColor
          ? ' tw-border-2 tw-border-dashed tw-border-rose-500'
          : '') +
        (myCanDrag ? ' tw-cursor-grab' : ' tw-cursor-not-allowed')
      }
      id={piece.id}
      ref={drag}
    >
      {innerPiece}
    </div>
  );
};

export default Piece;
