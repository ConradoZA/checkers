import { create } from 'zustand';
import { immer } from 'zustand/middleware/immer';
import { PieceColor, identifyType } from '../components/checkers/checkersUtils';
import { PiecePosition, useBoardState } from './useBoardState';

const NUMBERS = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];

interface MovementsSlice {
  canPieceMove: (toX: number, toY: number, piece: PiecePosition, board: PiecePosition[]) => boolean;
  canPieceCapture: (piece: PiecePosition, board: PiecePosition[]) => boolean;
  areAnyCapture: (color: PieceColor, board: PiecePosition[]) => boolean;
  hasMovements: (piece: PiecePosition, board: PiecePosition[]) => boolean;
  dropPieceIn: (toX: number, toY: number, piece: PiecePosition, board: PiecePosition[]) => void;
}
export const useMovements = create<MovementsSlice>()(
  immer((_set, get) => ({
    canPieceMove: (toX, toY, piece, board) => {
      const pX = piece.x;
      const pY = piece.y;
      const difX = pX - toX;
      const difY = pY - toY;
      const { color, rank } = identifyType(piece.type);

      const props = { pX, pY, difX, difY, board };

      let response = false;

      if (rank === 'queen') {
        // response = canQueenMove(props);
      } else if (color === 'black') {
        response = canBlackMove(props);
      } else {
        response = canWhiteMove(props);
      }

      return response;
    },

    canPieceCapture: (piece, board) => {
      const { color, rank } = identifyType(piece.type);
      let toCapture: (PiecePosition | null)[] = [];

      if (rank === 'queen') {
        // ({ toCapture } = queenObstructionsAndCaptures({ board, pX: piece.x, pY: piece.y }));
      } else if (color === 'black') {
        ({ toCapture } = blackObstructionsAndCaptures({ board, pX: piece.x, pY: piece.y }));
      } else {
        ({ toCapture } = whiteObstructionsAndCaptures({ board, pX: piece.x, pY: piece.y }));
      }

      let response = false;
      toCapture.map((p) => {
        if (p !== null) response = true;
      });

      return response;
    },

    areAnyCapture: (color, board) => {
      const side = color === 'black' ? 'b' : 'w';
      const pieces = board.filter((p) => p.type.includes(side));
      let res = false;

      for (const piece of pieces) {
        if (get().canPieceCapture(piece, board)) {
          res = true;
          break;
        }
      }

      return res;
    },

    hasMovements: (piece, board) => {
      let res = true;
      const { color, rank } = identifyType(piece.type);
      let toCapture: (PiecePosition | null)[] = [];
      let obstructions: PiecePosition[] = [];

      if (rank === 'queen') {
        // ({ toCapture, obstructions } = queenObstructionsAndCaptures({ board, pX: piece.x, pY: piece.y }));
      } else if (color === 'black') {
        ({ toCapture, obstructions } = blackObstructionsAndCaptures({
          board,
          pX: piece.x,
          pY: piece.y,
        }));
      } else {
        ({ toCapture, obstructions } = whiteObstructionsAndCaptures({
          board,
          pX: piece.x,
          pY: piece.y,
        }));
      }

      if (rank === 'queen') {
        if (obstructions.length === 4 && toCapture.every((p) => p === null)) res = false;
      } else {
        if (obstructions.length === 2 && toCapture.every((p) => p === null)) res = false;
      }

      return res;
    },

    dropPieceIn: (toX, toY, piece, board) => {
      const newPiece: PiecePosition = {
        x: toX,
        y: toY,
        id: piece.id,
        type: piece.type,
      };
      crownMan(newPiece);

      const newBoardState: PiecePosition[] = board.filter((p) => p.id !== piece.id);

      newBoardState.push(newPiece);

      const { color, rank } = identifyType(piece.type);
      let toCapture: (PiecePosition | null)[] = [];
      if (rank === 'queen') {
        // ({ toCapture } = queenObstructionsAndCaptures({ board, pX: piece.x, pY: piece.y }));
      } else if (color === 'black') {
        ({ toCapture } = blackObstructionsAndCaptures({ board, pX: piece.x, pY: piece.y }));
      } else {
        ({ toCapture } = whiteObstructionsAndCaptures({
          board,
          pX: piece.x,
          pY: piece.y,
        }));
      }

      const pieceCaptured: PiecePosition | undefined = toCapture.find((p, idx) => {
        switch (idx) {
          case 0:
            if (p && p.type.substring(0, 1) !== piece.type.substring(0, 1)) {
              if (color === 'white' && rank === 'man' && p.x === toX + 1 && p.y === toY + 1)
                return p;
              if (color === 'black' && rank === 'man' && p.x === toX + 1 && p.y === toY - 1)
                return p;
            }
            break;
          case 1:
            if (p && p.type.substring(0, 1) !== piece.type.substring(0, 1)) {
              if (color === 'white' && rank === 'man' && p.x === toX - 1 && p.y === toY + 1)
                return p;
              if (color === 'black' && rank === 'man' && p.x === toX - 1 && p.y === toY - 1)
                return p;
            }
            break;
          case 2:
            if (
              p &&
              p.type.substring(0, 1) !== piece.type.substring(0, 1) &&
              p.x === toX - 1 &&
              p.y === toY - 1
            )
              return p;
            break;
          case 3:
            if (
              p &&
              p.type.substring(0, 1) !== piece.type.substring(0, 1) &&
              p.x === toX + 1 &&
              p.y === toY - 1
            )
              return p;
            break;

          default:
            return undefined;
        }
      }) as PiecePosition | undefined;

      if (newBoardState.indexOf(pieceCaptured as PiecePosition) !== -1)
        newBoardState.splice(newBoardState.indexOf(pieceCaptured as PiecePosition), 1);

      newBoardState.sort((a, b) => {
        if (a.y - b.y > 0) {
          return 1;
        } else if (a.y - b.y < 0) {
          return -1;
        } else {
          if (a.x - b.x > 0) {
            return 1;
          } else if (a.x - b.x < 0) {
            return -1;
          }
        }
        return 0;
      });

      useBoardState.getState().setBoardState(newPiece, newBoardState);
    },
  })),
);

interface menProps {
  pX: number;
  pY: number;
  difX: number;
  difY: number;
  board: PiecePosition[];
}
const canWhiteMove = ({ pX, pY, difX, difY, board }: menProps): boolean => {
  const { obstructions, toCapture } = whiteObstructionsAndCaptures({ board, pX, pY });

  // 1º: normal white man move
  let moveL = difX === 1 && difY === 1;
  let moveR = difX === -1 && difY === 1;

  // 2º: any obstructing piece: can't move
  obstructions.map((p) => {
    if (p.x === pX - 1 && p.y === pY - 1) {
      moveL = false;
    }
    if (p.x === pX + 1 && p.y === pY - 1) {
      moveR = false;
    }
  });

  // 3º: now, if you can jump over an enemy: can move, MUST muve
  if (toCapture[0]) {
    moveL = difX === 2 && difY === 2;
    if (!toCapture[1]) moveR = false;
  }
  if (toCapture[1]) {
    moveR = difX === -2 && difY === 2;
    if (!toCapture[0]) moveL = false;
  }

  return moveL || moveR;
};
const canBlackMove = ({ pX, pY, difX, difY, board }: menProps): boolean => {
  const { obstructions, toCapture } = blackObstructionsAndCaptures({ board, pX, pY });

  // 1º: normal black man move
  let moveL = difX === 1 && difY === -1;
  let moveR = difX === -1 && difY === -1;

  // 2º: any obstructing piece: can't move
  obstructions.map((p) => {
    if (p.x === pX - 1 && p.y === pY + 1) {
      moveL = false;
    }
    if (p.x === pX + 1 && p.y === pY + 1) {
      moveR = false;
    }
  });

  // 3º: now, if you can jump over an enemy: can move, MUST muve
  if (toCapture[0]) {
    moveL = difX === 2 && difY === -2;
    if (!toCapture[1]) moveR = false;
  }
  if (toCapture[1]) {
    moveR = difX === -2 && difY === -2;
    if (!toCapture[0]) moveL = false;
  }

  return moveL || moveR;
};

interface menCaptureProps {
  pX: number;
  pY: number;
  board: PiecePosition[];
}
const whiteObstructionsAndCaptures = ({
  pX,
  pY,
  board,
}: menCaptureProps): { toCapture: (PiecePosition | null)[]; obstructions: PiecePosition[] } => {
  const obstructions = board.filter((p) => (p.x === pX - 1 || p.x === pX + 1) && p.y === pY - 1);

  const posibleCaptures = obstructions.filter((p) => !p.type.includes('w'));

  const captureL = posibleCaptures.filter(
    (p) =>
      p.x === pX - 1 &&
      p.y === pY - 1 &&
      NUMBERS.includes(pX - 2) &&
      NUMBERS.includes(pY - 2) &&
      !board.some((p) => p.x === pX - 2 && p.y === pY - 2),
  );
  const captureR = posibleCaptures.filter(
    (p) =>
      p.x === pX + 1 &&
      p.y === pY - 1 &&
      NUMBERS.includes(pX + 2) &&
      NUMBERS.includes(pY - 2) &&
      !board.some((p) => p.x === pX + 2 && p.y === pY - 2),
  );

  const response = {
    obstructions,
    toCapture: [captureL.length > 0 ? captureL[0] : null, captureR.length > 0 ? captureR[0] : null],
  };

  return response;
};

const blackObstructionsAndCaptures = ({
  pX,
  pY,
  board,
}: menCaptureProps): { toCapture: (PiecePosition | null)[]; obstructions: PiecePosition[] } => {
  const obstructions = board.filter((p) => (p.x === pX - 1 || p.x === pX + 1) && p.y === pY + 1);

  const posibleCaptures = obstructions.filter((p) => !p.type.includes('b'));

  const captureL = posibleCaptures.filter(
    (p) =>
      p.x === pX - 1 &&
      p.y === pY + 1 &&
      NUMBERS.includes(pX - 2) &&
      NUMBERS.includes(pY + 2) &&
      !board.some((p) => p.x === pX - 2 && p.y === pY + 2),
  );
  const captureR = posibleCaptures.filter(
    (p) =>
      p.x === pX + 1 &&
      p.y === pY + 1 &&
      NUMBERS.includes(pX + 2) &&
      NUMBERS.includes(pY + 2) &&
      !board.some((p) => p.x === pX + 2 && p.y === pY + 2),
  );

  const response = {
    obstructions,
    toCapture: [captureL.length > 0 ? captureL[0] : null, captureR.length > 0 ? captureR[0] : null],
  };

  return response;
};

const crownMan = (piece: PiecePosition): void => {
  if (piece.type === 'wm' && piece.y === 0) piece.type = 'wq';
  if (piece.type === 'bm' && piece.y === 9) piece.type = 'bq';
};
