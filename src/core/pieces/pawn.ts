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
    board: Piece[][]
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
    board: Piece[][]
  ) {
    const movements: Movement[] = [];

    const player = chess.getPlayer(this.color);

    this.__addMoveMovements(
      x,
      y,
      chess,
      movements,
      player.yDirection,
      player.startPawnYLine,
      board
    );

    return movements;
  }

  private __getCaptureInPassingMovements(x: number, y: number, chess: Chess) {
    const previousBoard = chess.getPreviousBoard();

    const movements: Movement[] = [];

    const player = chess.getPlayer(this.color);
    const enemyPlayer = chess.getPlayer(player.enemyColor);

    const fourthYLine = enemyPlayer.startPawnYLine + enemyPlayer.yDirection * 2;

    // The pawn must be in its fourth line
    if (y !== fourthYLine) {
      return movements;
    }

    // ----- Start Left -----
    let leftPiece;
    if (chess.isValidPosition(x - 1, y)) {
      leftPiece = chess.getPiece(x - 1, y);
    }
    let previousLeftPiece;
    if (chess.isValidPosition(x - 1, enemyPlayer.startPawnYLine)) {
      previousLeftPiece = chess.getPiece(
        x - 1,
        enemyPlayer.startPawnYLine,
        previousBoard
      );
    }

    if (
      leftPiece &&
      leftPiece.color === player.enemyColor &&
      previousLeftPiece
    ) {
      movements.push({
        x: x - 1,
        y: y + player.yDirection,
        passing: true,
      });
    }
    // ----- End Left -----

    // ----- Start Right -----
    let rightPiece;
    if (chess.isValidPosition(x + 1, y)) {
      rightPiece = chess.getPiece(x + 1, y);
    }
    let previousRightPiece;
    if (chess.isValidPosition(x + 1, enemyPlayer.startPawnYLine)) {
      previousRightPiece = chess.getPiece(
        x + 1,
        enemyPlayer.startPawnYLine,
        previousBoard
      );
    }

    if (
      rightPiece &&
      rightPiece.color === player.enemyColor &&
      previousRightPiece
    ) {
      movements.push({
        x: x + 1,
        y: y + player.yDirection,
        passing: true,
      });
    }
    // ----- End Right -----

    return movements;
  }

  protected __getCaptureMovements(
    x: number,
    y: number,
    chess: Chess,
    board: Piece[][]
  ) {
    const movements: Movement[] = [];

    const player = chess.getPlayer(this.color);

    function addDiagonalCaptureMovement(
      x: number,
      y: number,
      movements: Movement[],
      xOffset: number,
      yOffset: number,
      enemyColor: string
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
      player.yDirection,
      player.enemyColor
    );
    addDiagonalCaptureMovement(
      x,
      y,
      movements,
      -1,
      player.yDirection,
      player.enemyColor
    );

    return movements.concat(this.__getCaptureInPassingMovements(x, y, chess));
  }
}
