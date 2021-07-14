import Piece from './piece';
import Chess from './../chess';
import Movement from './../movement';
export default class Bishop extends Piece {
  constructor(color: string) {
    // code smell
    super('bishop', color);
  }

  protected __getMoveMovements(
    x: number,
    y: number,
    chess: Chess,
    board: Piece[][],
  ) {
    const movements: Movement[] = [];

    let x2, y2;

    // Forward top left
    x2 = x - 1;
    y2 = y + 1;
    while (this.__addIfValidMovement(x2, y2, movements, chess, board)) {
      x2--;
      y2++;
    }

    // Forward top right
    x2 = x + 1;
    y2 = y + 1;
    while (this.__addIfValidMovement(x2, y2, movements, chess, board)) {
      x2++;
      y2++;
    }

    // Backward bottom left
    x2 = x - 1;
    y2 = y - 1;
    while (this.__addIfValidMovement(x2, y2, movements, chess, board)) {
      x2--;
      y2--;
    }

    // Backward bottom right
    x2 = x + 1;
    y2 = y - 1;
    while (this.__addIfValidMovement(x2, y2, movements, chess, board)) {
      x2++;
      y2--;
    }

    return movements;
  }

  protected __getCaptureMovements(
    x: number,
    y: number,
    chess: Chess,
    board: Piece[][],
  ) {
    const movements: Movement[] = [];

    let x2, y2;

    // Forward top left
    x2 = x - 1;
    y2 = y + 1;
    while (
      chess.isValidPosition(x2, y2, board) &&
      !chess.isThereAllyPiece(this, x2, y2, board) &&
      !this.__addIfValidCapture(x2, y2, movements, this, chess, board)
    ) {
      x2--;
      y2++;
    }

    // Forward top right
    x2 = x + 1;
    y2 = y + 1;
    while (
      chess.isValidPosition(x2, y2, board) &&
      !chess.isThereAllyPiece(this, x2, y2, board) &&
      !this.__addIfValidCapture(x2, y2, movements, this, chess, board)
    ) {
      x2++;
      y2++;
    }

    // Backward bottom left
    x2 = x - 1;
    y2 = y - 1;
    while (
      chess.isValidPosition(x2, y2, board) &&
      !chess.isThereAllyPiece(this, x2, y2, board) &&
      !this.__addIfValidCapture(x2, y2, movements, this, chess, board)
    ) {
      x2--;
      y2--;
    }

    // Backward bottom right
    x2 = x + 1;
    y2 = y - 1;
    while (
      chess.isValidPosition(x2, y2, board) &&
      !chess.isThereAllyPiece(this, x2, y2, board) &&
      !this.__addIfValidCapture(x2, y2, movements, this, chess, board)
    ) {
      x2++;
      y2--;
    }
    return movements;
  }
}
