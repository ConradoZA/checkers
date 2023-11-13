import { create } from 'zustand';
import { immer } from 'zustand/middleware/immer';
import { FinishState, PieceColor, PieceType } from '../components/checkers/checkersUtils';
import { useMovements } from './useMovements';

const initialPositions: PiecePosition[] = [
  {
    x: 1,
    y: 0,
    id: '01',
    type: 'bm',
  },
  {
    x: 3,
    y: 0,
    id: '03',
    type: 'bm',
  },
  {
    x: 5,
    y: 0,
    id: '05',
    type: 'bm',
  },
  {
    x: 7,
    y: 0,
    id: '07',
    type: 'bm',
  },
  {
    x: 9,
    y: 0,
    id: '09',
    type: 'bm',
  },
  {
    x: 0,
    y: 1,
    id: '10',
    type: 'bm',
  },
  {
    x: 2,
    y: 1,
    id: '12',
    type: 'bm',
  },
  {
    x: 4,
    y: 1,
    id: '14',
    type: 'bm',
  },
  {
    x: 6,
    y: 1,
    id: '16',
    type: 'bm',
  },
  {
    x: 8,
    y: 1,
    id: '18',
    type: 'bm',
  },
  {
    x: 1,
    y: 2,
    id: '21',
    type: 'bm',
  },
  {
    x: 3,
    y: 2,
    id: '23',
    type: 'bm',
  },
  {
    x: 5,
    y: 2,
    id: '25',
    type: 'bm',
  },
  {
    x: 7,
    y: 2,
    id: '27',
    type: 'bm',
  },
  {
    x: 9,
    y: 2,
    id: '29',
    type: 'bm',
  },
  {
    x: 0,
    y: 7,
    id: '70',
    type: 'wm',
  },
  {
    x: 2,
    y: 7,
    id: '72',
    type: 'wm',
  },
  {
    x: 4,
    y: 7,
    id: '74',
    type: 'wm',
  },
  {
    x: 6,
    y: 7,
    id: '76',
    type: 'wm',
  },
  {
    x: 8,
    y: 7,
    id: '78',
    type: 'wm',
  },
  {
    x: 1,
    y: 8,
    id: '81',
    type: 'wm',
  },
  {
    x: 3,
    y: 8,
    id: '83',
    type: 'wm',
  },
  {
    x: 5,
    y: 8,
    id: '85',
    type: 'wm',
  },
  {
    x: 7,
    y: 8,
    id: '87',
    type: 'wm',
  },
  {
    x: 9,
    y: 8,
    id: '89',
    type: 'wm',
  },
  {
    x: 0,
    y: 9,
    id: '90',
    type: 'wm',
  },
  {
    x: 2,
    y: 9,
    id: '92',
    type: 'wm',
  },
  {
    x: 4,
    y: 9,
    id: '94',
    type: 'wm',
  },
  {
    x: 6,
    y: 9,
    id: '96',
    type: 'wm',
  },
  {
    x: 8,
    y: 9,
    id: '98',
    type: 'wm',
  },
];

interface BoardStateSlice {
  presentTurn: number;
  maxMovsWithoutCapture: 25;
  history: Play[];
  tempBoard: PiecePosition[];
  getTurn: (turn: number) => Play;
  getBoardState: () => PiecePosition[];
  findPieceById: (id: string) => PiecePosition | undefined;
  findPieceByPosition: (x: number, y: number) => PiecePosition | undefined;
  getTurnNumber: () => number;
  getTurnColor: () => PieceColor;
  getTurnsUntilDraw: () => number;
  getWhiteMenNum: () => number;
  getBlackMenNum: () => number;
  getWhiteQueensNum: () => number;
  getBlackQueensNum: () => number;
  getFinishResult: () => FinishState;
  setBoardState: (newPiece: PiecePosition, newBoard: PiecePosition[]) => void;
}

export interface Play {
  turnNum: number;
  turnColor: PieceColor;
  movementsWithoutCapture: number;
  whiteMenInField: number;
  blackMenInField: number;
  whiteQueensInField: number;
  blackQueensInField: number;
  positions: PiecePosition[];
  finishedGame: FinishState;
}

export interface PiecePosition {
  x: number;
  y: number;
  id: string;
  type: PieceType;
}

export const useBoardState = create<BoardStateSlice>()(
  immer((set, get) => ({
    presentTurn: 1,
    maxMovsWithoutCapture: 25,
    history: [
      {
        turnNum: 0,
        turnColor: 'black',
        movementsWithoutCapture: 0,
        whiteMenInField: 15,
        whiteQueensInField: 0,
        blackMenInField: 15,
        blackQueensInField: 0,
        positions: initialPositions,
        finishedGame: 'notFinished',
      },
    ],
    tempBoard: initialPositions,

    getTurn: (turn) => get().history[turn],

    getBoardState: () => get().tempBoard,

    findPieceById: (id) =>
      get()
        .getBoardState()
        .find((p) => p.id === id),

    findPieceByPosition: (x, y) =>
      get()
        .getBoardState()
        .find((p) => p.x === x && p.y === y),

    getTurnNumber: () => get().presentTurn,

    getTurnColor: () => (get().presentTurn % 2 === 0 ? 'black' : 'white'),

    getTurnsUntilDraw: () =>
      get().maxMovsWithoutCapture - get().getTurn(get().presentTurn - 1).movementsWithoutCapture,

    getWhiteMenNum: () => get().getTurn(get().presentTurn - 1).whiteMenInField,

    getBlackMenNum: () => get().getTurn(get().presentTurn - 1).blackMenInField,

    getWhiteQueensNum: () => get().getTurn(get().presentTurn - 1).whiteQueensInField,

    getBlackQueensNum: () => get().getTurn(get().presentTurn - 1).blackQueensInField,

    getFinishResult: () => {
      if (get().getTurnsUntilDraw() <= 0) {
        return 'draw';
      } else if (
        get().getTurn(get().presentTurn - 1).blackMenInField <= 2 &&
        get().getTurn(get().presentTurn - 1).blackQueensInField < 1
      ) {
        return 'whiteWins';
      } else if (
        get().getTurn(get().presentTurn - 1).whiteMenInField <= 2 &&
        get().getTurn(get().presentTurn - 1).whiteQueensInField < 1
      ) {
        return 'blackWins';
      } else {
        return 'notFinished';
      }
    },

    setBoardState: (newPiece, newBoard) => {
      const hasCaptured = newBoard.length < get().getBoardState().length;
      set((state) => {
        state.tempBoard = newBoard;
      });

      if (!hasCaptured || !useMovements.getState().canPieceCapture(newPiece, newBoard)) {
        const whiteMen = newBoard.filter((p) => p.type === 'wm').length;
        const whiteQueens = newBoard.filter((p) => p.type === 'wq').length;
        const blackMen = newBoard.filter((p) => p.type === 'bm').length;
        const blackQueens = newBoard.filter((p) => p.type === 'bq').length;

        const newPlay: Play = {
          turnNum: get().getTurnNumber(),
          turnColor: get().getTurnColor(),
          movementsWithoutCapture: hasCaptured
            ? 0
            : get().getTurn(get().getTurnNumber() - 1).movementsWithoutCapture + 1,
          whiteMenInField: whiteMen,
          whiteQueensInField: whiteQueens,
          blackMenInField: blackMen,
          blackQueensInField: blackQueens,
          positions: newBoard,
          finishedGame: get().getFinishResult(),
        };

        set((state) => {
          state.presentTurn = get().getTurnNumber() + 1;
          state.history.push(newPlay);
          state.tempBoard = newBoard;
        });
      }
    },
  })),
);
