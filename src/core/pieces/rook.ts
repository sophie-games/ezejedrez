import Piece from './piece';
import Chess from './../chess';
import Movement from './../movement';
export default class Rook extends Piece {
  constructor(color: string) {
    // code smell
    super('rook', color);
  }

  protected __getMoveMovements(
    x: number,
    y: number,
    chess: Chess,
    board: Piece[][],
    noCalculateIsChecked?: boolean,
  ) {
    const movements: Movement[] = [];
    const player = chess.getPlayer(this.color);

    let x2, y2;

    // Top
    y2 = y + 1;
    while (this.__addIfValidMovement(x, y2, movements, chess, board)) {
      y2++;
    }

    // Bottom
    y2 = y - 1;
    while (this.__addIfValidMovement(x, y2, movements, chess, board)) {
      y2--;
    }

    // Left
    x2 = x - 1;
    while (this.__addIfValidMovement(x2, y, movements, chess, board)) {
      x2--;
    }

    // Right
    x2 = x + 1;
    while (this.__addIfValidMovement(x2, y, movements, chess, board)) {
      x2++;
    }

    if (noCalculateIsChecked) {
      return movements;
    }

    const myKingPosition = chess.getKingPosition(this.color);

    // Workaround: Some tests does not have king
    if (!myKingPosition) {
      return movements;
    }

    return movements.filter((possibleMov) => {
      const copy = chess.copyBoard();

      // Simulates the movement of the possibleCapture in the copy.
      copy[possibleMov.x][possibleMov.y] = copy[x][y];
      copy[x][y] = null;

      const isChecked = chess.isCheckedPosition(
        myKingPosition.x,
        myKingPosition.y,
        player.enemyColor,
        copy,
      );

      return !isChecked;
    });
  }

  protected __getCaptureMovements(
    x: number,
    y: number,
    chess: Chess,
    board: Piece[][],
    noCalculateIsChecked?: boolean,
  ) {
    const movements: Movement[] = [];
    const player = chess.getPlayer(this.color);

    let x2, y2;

    // Top
    y2 = y + 1;
    while (
      chess.isValidPosition(x, y2) &&
      !chess.isThereAllyPiece(this, x, y2, board) &&
      !this.__addIfValidCapture(x, y2, movements, this, chess, board)
    ) {
      y2++;
    }

    // Bottom
    y2 = y - 1;
    while (
      chess.isValidPosition(x, y2) &&
      !chess.isThereAllyPiece(this, x, y2, board) &&
      !this.__addIfValidCapture(x, y2, movements, this, chess, board)
    ) {
      y2--;
    }

    // Left
    x2 = x - 1;
    while (
      chess.isValidPosition(x2, y) &&
      !chess.isThereAllyPiece(this, x2, y, board) &&
      !this.__addIfValidCapture(x2, y, movements, this, chess, board)
    ) {
      x2--;
    }

    // Right
    x2 = x + 1;
    while (
      chess.isValidPosition(x2, y) &&
      !chess.isThereAllyPiece(this, x2, y, board) &&
      !this.__addIfValidCapture(x2, y, movements, this, chess, board)
    ) {
      x2++;
    }

    if (noCalculateIsChecked) {
      return movements;
    }

    const myKingPosition = chess.getKingPosition(this.color);

    // Workaround: Some tests does not have king
    if (!myKingPosition) {
      return movements;
    }

    return movements.filter((possibleCapture) => {
      const copy = chess.copyBoard();

      // Simulates the movement of the possibleCapture in the copy.
      copy[possibleCapture.x][possibleCapture.y] = copy[x][y];
      copy[x][y] = null;

      const isChecked = chess.isCheckedPosition(
        myKingPosition.x,
        myKingPosition.y,
        player.enemyColor,
        copy,
      );

      return !isChecked;
    });
  }
}
