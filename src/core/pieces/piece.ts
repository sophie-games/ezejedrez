import Movement from './../movement';
import Chess from './../chess';
export default class Piece {
  pieceType: string;
  color: string;

  constructor(pieceType: string, color: string) {
    this.pieceType = pieceType;
    this.color = color;
  }

  protected __addIfValidMovement(
    x: number,
    y: number,
    movements: Movement[],
    chess: Chess,
    board: Piece[][],
  ) {
    if (chess.isValidPosition(x, y, board) && !chess.hasPiece(x, y, board)) {
      movements.push({ x: x, y: y });
      return true;
    }

    return false;
  }

  protected __addIfValidCapture(
    x: number,
    y: number,
    movements: Movement[],
    pieceThatCaptures: Piece,
    chess: Chess,
    board: Piece[][],
  ) {
    if (
      chess.isValidPosition(x, y, board) &&
      chess.hasPiece(x, y, board) &&
      chess.getPiece(x, y, board).color !== pieceThatCaptures.color
    ) {
      movements.push({ x: x, y: y });
      return true;
    }

    return false;
  }

  protected __getMoveMovements(
    x: number,
    y: number,
    chess: Chess,
    board: Piece[][],
  ): Movement[] {
    throw new Error('Implement in subclass');
  }

  protected __getCaptureMovements(
    x: number,
    y: number,
    chess: Chess,
    board: Piece[][],
  ): Movement[] {
    throw new Error('Implement in subclass');
  }

  getMovements(x: number, y: number, chess: Chess, board?: Piece[][]) {
    if (!board) {
      board = chess.getBoard();
    }

    const movements = this.__getMoveMovements(x, y, chess, board);
    const captureMovements = this.__getCaptureMovements(x, y, chess, board);
    const allMovements = movements.concat(captureMovements);
    return allMovements;
  }
}
