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
    board: Piece[][],
  ) {
    this.__addIfValidMovement(x, y + 1 * yDirection, movements, chess, board);

    if (y === pawnLine && !chess.hasPiece(x, y + 1 * yDirection, board)) {
      this.__addIfValidMovement(x, y + 2 * yDirection, movements, chess, board);
    }
  }

  protected __getMoveMovements(
    x: number,
    y: number,
    chess: Chess,
    board: Piece[][],
  ) {
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
      board,
    );

    return movements;
  }

  protected __getCaptureMovements(
    x: number,
    y: number,
    chess: Chess,
    board: Piece[][],
  ) {
    const movements: Movement[] = [];

    const piecePlayer = chess.getPlayer(this.color);

    function addDiagonalCaptureMovement(
      x: number,
      y: number,
      movements: Movement[],
      xOffset: number,
      yOffset: number,
      enemyColor: string,
    ) {
      if (
        chess.isValidPosition(x + xOffset, y + yOffset) &&
        chess.hasPiece(x + xOffset, y + yOffset, board) &&
        chess.getPiece(x + xOffset, y + yOffset, board).color === enemyColor
      ) {
        movements.push({
          x: x + xOffset,
          y: y + yOffset,
        });
      }
    }

    addDiagonalCaptureMovement(
      x,
      y,
      movements,
      1,
      piecePlayer.yDirection,
      piecePlayer.enemyColor,
    );
    addDiagonalCaptureMovement(
      x,
      y,
      movements,
      -1,
      piecePlayer.yDirection,
      piecePlayer.enemyColor,
    );

    return movements;
  }
}
