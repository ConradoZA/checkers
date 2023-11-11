import React from 'react';
import UnderlayForMove from './UnderlayForMove';
import { useDrop } from 'react-dnd';
import { PiecePosition, useBoardState } from '../../hooks/useBoardState';
import { useMovements } from '../../hooks/useMovements';

type SquareProps = {
  x: number;
  y: number;
  children?: React.ReactNode;
};

const Square: React.FC<SquareProps> = ({ x, y, children }) => {
  const state = useBoardState();
  const pieces = state.getBoardState();
  const movs = useMovements();

  const backgroundColor = (x + y) % 2 === 0 ? ' tw-bg-white' : ' tw-bg-black';

  const [{ isOver, canDrop }, drop] = useDrop({
    accept: ['man', 'queen'],
    canDrop: (item: { piece: PiecePosition }) => movs.canPieceMove(x, y, item.piece, pieces),
    drop: (item: { piece: PiecePosition }) => movs.dropPieceIn(x, y, item.piece, pieces),
    collect: (monitor) => ({
      isOver: monitor.isOver(),
      canDrop: monitor.canDrop(),
    }),
  });

  return (
    <div ref={drop}>
      <div
        className={'tw-h-[8.5vmin] tw-w-[8.5vmin] tw-border tw-border-yellow-900' + backgroundColor}
      >
        {children}
      </div>
      {isOver && !canDrop && <UnderlayForMove color='red' />}
      {!isOver && canDrop && <UnderlayForMove color='yellow' />}
      {isOver && canDrop && <UnderlayForMove color='green' />}
    </div>
  );
};

export default Square;
