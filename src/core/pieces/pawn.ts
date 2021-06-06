import Piece from './piece';
import Chess from './../chess';
import Movement from './../movement';
export default class Pawn extends Piece {
  constructor(color: string) {
    // code smell
    super('pawn', color);
  }

  private __addMoveMovements(
    x: number,
    y: number,
    chess: Chess,
    movements: Movement[],
    yDirection: number,
    pawnLine: number,
  ) {
    this.__addIfValidMovement(x, y + 1 * yDirection, movements, chess);

    if (y === pawnLine && !chess.hasPiece(x, y + 1 * yDirection)) {
      this.__addIfValidMovement(x, y + 2 * yDirection, movements, chess);
    }
  }

  protected __getMoveMovements(x: number, y: number, chess: Chess) {
    const piece = this;
    const movements: Movement[] = [];

    const piecePlayer = chess.getPlayer(this.color);

    this.__addMoveMovements(
      x,
      y,
      chess,
      movements,
      piecePlayer.yDirection,
      piecePlayer.startPawnYLine,
    );

    return movements;
  }

  protected __getCaptureMovements(x: number, y: number, chess: Chess) {
    const movements: Movement[] = [];
    const piece = this;

    const piecePlayer = chess.getPlayer(this.color);

    function getDiagonalCaptureMovement(
      x: number,
      y: number,
      movements: Movement[],
      xOffset: number,
      yOffset: number,
      enemyColor: string,
    ) {
      if (
        chess.isAValidPosition(x + xOffset, y + yOffset) &&
        chess.hasPiece(x + xOffset, y + yOffset) &&
        chess.getPiece(x + xOffset, y + yOffset).color === enemyColor
      ) {
        movements.push({
          x: x + xOffset,
          y: y + yOffset,
        });
      }
    }

    // peon blanco: (x - 1, y + 1), (x + 1, y + 1).
    // peon negro: (x - 1, y - 1), (x + 1, y - 1).
    getDiagonalCaptureMovement(
      x,
      y,
      movements,
      1,
      piecePlayer.yDirection,
      piecePlayer.enemyColor,
    );
    getDiagonalCaptureMovement(
      x,
      y,
      movements,
      1,
      piecePlayer.yDirection,
      piecePlayer.enemyColor,
    );

    // TODO: sacar if
    // if (piece.color === 'white') {
    // getDiagonalCaptureMovement(x, y, movements, 1, 1, piecePlayer.enemyColor);
    // getDiagonalCaptureMovement(x, y, movements, -1, 1, piecePlayer.enemyColor);
    // }

    // TODO: sacar if
    // if (piece.color === 'black') {
    //   getDiagonalCaptureMovement(x, y, movements, -1, -1, 'white');
    //   getDiagonalCaptureMovement(x, y, movements, +1, -1, 'white');
    // }

    return movements;
  }
}
