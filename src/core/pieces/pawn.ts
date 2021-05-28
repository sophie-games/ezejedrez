import Piece from './piece';
import Chess from './../chess';
import Movement from './../movement';
export default class Pawn extends Piece {
  constructor(color: string) {
    // code smell
    super('pawn', color);
  }

  private __addMoveMovements(x: number, y: number, chess: Chess, movements: Movement[], yDirection: number, pawnLine: number) {
    this.__addIfValidMovement(x, y + 1 * yDirection, movements, chess);

    if (y === pawnLine && !chess.hasPiece(x, y + 1 * yDirection)) {
      this.__addIfValidMovement(x, y + 2 * yDirection, movements, chess);
    }
  }

  protected __getMoveMovements(x: number, y: number, chess: Chess) {
    const piece = this;
    const movements: Movement[] = [];

    const piecePlayer = chess.getPlayer(this.color);

    this.__addMoveMovements(x, y, chess, movements, piecePlayer.yDirection, piecePlayer.startPawnYLine);

    return movements;
  }

  protected __getCaptureMovements(x: number, y: number, chess: Chess) {
    const movements: Movement[] = [];
    const piece = this;

    // TODO: sacar if
    if (piece.color === 'white') {
      if (
        chess.isAValidPosition(x + 1, y + 1) &&
        chess.getPiece(x + 1, y + 1) &&
        chess.getPiece(x + 1, y + 1).color === 'black'
      ) {
        movements.push({
          x: x + 1,
          y: y + 1,
        });
      }

      if (
        chess.isAValidPosition(x - 1, y + 1) &&
        chess.getPiece(x - 1, y + 1) &&
        chess.getPiece(x - 1, y + 1).color === 'black'
      ) {
        movements.push({
          x: x - 1,
          y: y + 1,
        });
      }
    }

    // TODO: sacar if
    if (piece.color === 'black') {
      if (
        chess.isAValidPosition(x - 1, y - 1) &&
        chess.getPiece(x - 1, y - 1) &&
        chess.getPiece(x - 1, y - 1).color === 'white'
      ) {
        movements.push({
          x: x - 1,
          y: y - 1,
        });
      }

      if (
        chess.isAValidPosition(x + 1, y - 1) &&
        chess.getPiece(x + 1, y - 1) &&
        chess.getPiece(x + 1, y - 1).color === 'white'
      ) {
        movements.push({
          x: x + 1,
          y: y - 1,
        });
      }
    }

    return movements;
  }
}
