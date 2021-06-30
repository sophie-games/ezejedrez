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
    chess: Chess
  ) {
    if (chess.isAValidPosition(x, y) && !chess.hasPiece(x, y)) {
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
    chess: Chess
  ) {
    if (
      chess.isAValidPosition(x, y) &&
      chess.hasPiece(x, y) &&
      chess.getPiece(x, y).color !== pieceThatCaptures.color
    ) {
      movements.push({ x: x, y: y });
      return true;
    }

    return false;
  }

  protected __getMoveMovements(x: number, y: number, chess: Chess): Movement[] {
    throw new Error('Implement in subclass');
  }

  protected __getCaptureMovements(
    x: number,
    y: number,
    chess: Chess
  ): Movement[] {
    throw new Error('Implement in subclass');
  }

  getMovements(x: number, y: number, chess: Chess) {
    const movements = this.__getMoveMovements(x, y, chess);
    const captureMovements = this.__getCaptureMovements(x, y, chess);
    const allMovements = movements.concat(captureMovements);
    return allMovements;
  }
}
