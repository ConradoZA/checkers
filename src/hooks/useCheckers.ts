import { create } from 'zustand';
import { immer } from 'zustand/middleware/immer';

interface CheckersSlice {
  movementsWithoutCapture: number;
  maxMovsWithoutCapture: 25;
  resetMovsToDraw: () => void;
  turnWithoutCapture: () => void;
  isDraw: () => boolean;
  whiteMen: number;
  blackMen: number;
  isWhiteWinner: () => boolean;
  isBlackWinner: () => boolean;
  whiteCapture: () => void;
  blackCapture: () => void;
  whitePieces: () => number;
  blackPieces: () => number;
  turnNumber: number;
  playerTurn: 'white' | 'black';
  isTurn: () => number;
  isPlayerTurn: () => 'white' | 'black';
  changeTurn: () => void;
}

export const useCheckers = create<CheckersSlice>()(
  immer((set, get) => ({
    movementsWithoutCapture: 0,
    maxMovsWithoutCapture: 25,
    resetMovsToDraw: () =>
      set((state) => {
        state.movementsWithoutCapture = 0;
      }),
    turnWithoutCapture: () =>
      set((state) => {
        state.movementsWithoutCapture += 1;
      }),
    isDraw: () => get().movementsWithoutCapture >= get().maxMovsWithoutCapture,
    whiteMen: 15,
    blackMen: 15,
    isWhiteWinner: () => get().blackMen === 0,
    isBlackWinner: () => get().whiteMen === 0,
    whiteCapture: () =>
      set((state) => {
        state.blackMen -= 1;
      }),
    blackCapture: () =>
      set((state) => {
        state.whiteMen -= 1;
      }),
    whitePieces: () => get().whiteMen,
    blackPieces: () => get().blackMen,
    turnNumber: 0,
    playerTurn: 'white',
    isTurn: () => get().turnNumber,
    isPlayerTurn: () => get().playerTurn,
    changeTurn: () =>
      set((state) => {
        state.turnNumber += 1;
        get().playerTurn === 'black' ? (state.playerTurn = 'white') : (state.playerTurn = 'black');
      }),
  })),
);
