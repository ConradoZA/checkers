export type PieceType = 'wm' | 'wq' | 'bm' | 'bq';
export type PieceColor = 'white' | 'black';
export type PieceRank = 'queen' | 'man';
export type PieceAction = 'move' | 'capture';
export type FinishState = 'notFinished' | 'draw' | 'whiteWins' | 'blackWins';

export const identifyType = (type: PieceType): { color: PieceColor; rank: PieceRank } => {
  const color = type.substring(0, 1) === 'w' ? 'white' : 'black';
  const rank = type.substring(1, 2) === 'q' ? 'queen' : 'man';
  return { color, rank };
};
