import Piece from './piece';
import Chess from './../chess';
import Movement from './../movement';
export default class Pawn extends Piece {
  constructor(color: string) {
    // code smell
    super('pawn', color);
  }

  protected __getMoveMovements(x: number, y: number, chess: Chess) {
    const piece = this;
    const movements: Movement[] = [];

    // TODO: sacar if
    if (piece.color === 'white') {
      this.__addIfValidMovement(x, y + 1, movements, chess);

      if (y === 1 && !chess.hasPiece(x, y + 1)) {
        this.__addIfValidMovement(x, y + 2, movements, chess);
      }
    }

    // TODO: sacar if
    if (piece.color === 'black') {
      this.__addIfValidMovement(x, y - 1, movements, chess);

      if (y === 6 && !chess.hasPiece(x, y - 1)) {
        this.__addIfValidMovement(x, y - 2, movements, chess);
      }
    }

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
