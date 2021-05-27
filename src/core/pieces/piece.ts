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
  ) {
    if (!chess.hasPiece(x, y) && chess.isAValidPosition(x, y)) {
      movements.push({ x: x, y: y });
    }
  }

  protected __addIfValidCapture(
    x: number,
    y: number,
    movements: Movement[],
    pieceThatCaptures: Piece,
    chess: Chess,
  ) {
    const hasPiece = chess.hasPiece(x, y);
    const isAValidPosition = chess.isAValidPosition(x, y);
    const pieceToCapture = chess.getPiece(x, y);

    if (
      hasPiece &&
      isAValidPosition &&
      pieceThatCaptures.color !== pieceToCapture.color
    ) {
      movements.push({ x: x, y: y });
    }
  }

  protected __getMoveMovements(x: number, y: number, chess: Chess): Movement[] {
    throw new Error('Implement in subclass');
  }

  protected __getCaptureMovements(
    x: number,
    y: number,
    chess: Chess,
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
