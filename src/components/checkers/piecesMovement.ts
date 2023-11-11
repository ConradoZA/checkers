import { PiecePosition } from '../../hooks/useBoardState';

const NUMBERS = [1, 2, 3, 4, 5, 6, 7, 8, 9];

/* *** QUEEN *** */
export const queenCanCapture = (
  piece: PiecePosition,
  otherPieces: PiecePosition[],
): { toCapture: PiecePosition[]; obstructions: PiecePosition[] } => {
  const side = piece.type.substring(0, 1);
  const OX = piece.x;
  const OY = piece.y;

  // Pieces in the way of the queen
  const obstructions = otherPieces.filter((item) => {
    const FX = Math.abs(OX - item.x);
    const FY = Math.abs(OY - item.y);
    return FX === FY && NUMBERS.includes(FX) && NUMBERS.includes(FY);
  });

  // Which of those pieces are not on my side?
  const posibleCaptures = obstructions.filter((item) => !item.type.includes(side));
  const capturesInTL = posibleCaptures.filter(
    (obj) =>
      OX - obj.x === OY - obj.y &&
      OX < obj.x &&
      OY < obj.y &&
      NUMBERS.includes(obj.x + 1) &&
      NUMBERS.includes(obj.y + 1),
  );
  const capturesInTR = posibleCaptures.filter(
    (obj) =>
      OX - obj.x === (OY - obj.y) * -1 &&
      OX > obj.x &&
      OY < obj.y &&
      NUMBERS.includes(obj.x - 1) &&
      NUMBERS.includes(obj.y + 1),
  );
  const capturesInBR = posibleCaptures.filter(
    (obj) =>
      OX - obj.x === OY - obj.y &&
      OX > obj.x &&
      OY > obj.y &&
      NUMBERS.includes(obj.x - 1) &&
      NUMBERS.includes(obj.y - 1),
  );
  const capturesInBL = posibleCaptures.filter(
    (obj) =>
      (OX - obj.x) * -1 === OY - obj.y &&
      OX < obj.x &&
      OY > obj.y &&
      NUMBERS.includes(obj.x + 1) &&
      NUMBERS.includes(obj.y - 1),
  );

  // Always in the same order: Top-Left, Top-Right, Bottom-Right, Bottom-Left
  // Only returns the first capture possible in each diagonal
  const toCapture = [];
  toCapture.push(capturesInTL[0]);
  toCapture.push(capturesInTR[0]);
  toCapture.push(capturesInBR[0]);
  toCapture.push(capturesInBL[0]);

  return { toCapture, obstructions };
};

export const queenCanMove = (
  toX: number,
  toY: number,
  piece: PiecePosition,
  pieces: PiecePosition[],
): { res: boolean; captures: PiecePosition[] } => {
  const OX = piece.x;
  const OY = piece.y;
  const FX = Math.abs(OX - toX);
  const FY = Math.abs(OY - toY);

  // Move diagonally but within the board
  const QUEEN_MOVEMENT = FX === FY && NUMBERS.includes(FX) && NUMBERS.includes(FY);

  let queenCanMoveTL = QUEEN_MOVEMENT && OY < toY && OX < toX;
  let queenCanMoveTR = QUEEN_MOVEMENT && OY < toY && OX > toX;
  let queenCanMoveBR = QUEEN_MOVEMENT && OY > toY && OX > toX;
  let queenCanMoveBL = QUEEN_MOVEMENT && OY > toY && OX < toX;

  const { toCapture, obstructions } = queenCanCapture(piece, pieces);
  const cantContinue = obstructions.filter((piece1) =>
    toCapture.every((piece2) => piece1.id !== piece2.id),
  );

  // Ah, ah, ah... you didn't say the magic word
  cantContinue.map((item) => {
    if (toX <= item.x && toY >= item.y && OX > item.x && OY < item.y) {
      queenCanMoveTR = queenCanMoveTR && toX > item.x && toY < item.y;
    } else if (toX >= item.x && toY >= item.y && OX < item.x && OY < item.y) {
      queenCanMoveTL = queenCanMoveTL && toX < item.x && toY < item.y;
    } else if (toX >= item.x && toY <= item.y && OX < item.x && OY > item.y) {
      queenCanMoveBL = queenCanMoveBL && toX < item.x && toY > item.y;
    } else if (toX <= item.x && toY <= item.y && OX > item.x && OY > item.y) {
      queenCanMoveBR = queenCanMoveBR && toX > item.x && toY > item.y;
    }
  });

  // Even if you can move in one diagonal, if there is a capture in other diagonal you HAVE TO capture
  if (!toCapture[0] && (toCapture[1] || toCapture[2] || toCapture[3])) queenCanMoveTL = false;
  if (!toCapture[1] && (toCapture[0] || toCapture[2] || toCapture[3])) queenCanMoveTR = false;
  if (!toCapture[2] && (toCapture[0] || toCapture[1] || toCapture[3])) queenCanMoveBR = false;
  if (!toCapture[3] && (toCapture[0] || toCapture[1] || toCapture[2])) queenCanMoveBL = false;

  // To capture, you have to have space behind the piece
  if (toCapture[0]) {
    queenCanMoveTL =
      queenCanMoveTL &&
      toX !== toCapture[0].x &&
      toY !== toCapture[0].y &&
      NUMBERS.includes(toCapture[0].x + 1) &&
      NUMBERS.includes(toCapture[0].y + 1);
  }
  if (toCapture[1]) {
    queenCanMoveTR =
      queenCanMoveTR &&
      toX !== toCapture[1].x &&
      toY !== toCapture[1].y &&
      NUMBERS.includes(toCapture[1].x - 1) &&
      NUMBERS.includes(toCapture[1].y + 1);
  }
  if (toCapture[2]) {
    queenCanMoveBR =
      queenCanMoveBR &&
      toX !== toCapture[2].x &&
      toY !== toCapture[2].y &&
      NUMBERS.includes(toCapture[2].x - 1) &&
      NUMBERS.includes(toCapture[2].y - 1);
  }
  if (toCapture[3]) {
    queenCanMoveBL =
      queenCanMoveBL &&
      toX !== toCapture[3].x &&
      toY !== toCapture[3].y &&
      NUMBERS.includes(toCapture[3].x + 1) &&
      NUMBERS.includes(toCapture[3].y - 1);
  }

  return {
    res: queenCanMoveTL || queenCanMoveTR || queenCanMoveBR || queenCanMoveBL,
    captures: toCapture,
  };
};
