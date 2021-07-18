import Movement from './../movement';
import Chess from './../chess';
export default class Piece {
  pieceType: string;
  color: string;
  hasMoved: boolean;

  constructor(pieceType: string, color: string) {
    this.pieceType = pieceType;
    this.color = color;
    this.hasMoved = false;
  }

  protected __addIfValidMovement(
    x: number,
    y: number,
    movements: Movement[],
    chess: Chess,
    board: Piece[][]
  ) {
    if (chess.isValidPosition(x, y) && !chess.hasPiece(x, y, board)) {
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
    board: Piece[][]
  ) {
    if (
      chess.isValidPosition(x, y) &&
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
    noCalculateIsChecked?: boolean
  ): Movement[] {
    throw new Error('Implement in subclass');
  }

  protected __getCaptureMovements(
    x: number,
    y: number,
    chess: Chess,
    board: Piece[][],
    noCalculateIsChecked?: boolean
  ): Movement[] {
    throw new Error('Implement in subclass');
  }

  getMovements(
    x: number,
    y: number,
    chess: Chess,
    board?: Piece[][],
    noCalculateIsChecked?: boolean
  ) {
    if (!board) {
      board = chess.getBoard();
    }

    const moveMovements = this.__getMoveMovements(
      x,
      y,
      chess,
      board,
      noCalculateIsChecked
    );
    const captureMovements = this.__getCaptureMovements(
      x,
      y,
      chess,
      board,
      noCalculateIsChecked
    );
    const movements = moveMovements.concat(captureMovements);

    if (noCalculateIsChecked) {
      return movements;
    }

    const myKingPosition = chess.getKingPosition(this.color);

    // Workaround: Some tests have no king
    if (!myKingPosition) {
      return movements;
    }

    const player = chess.getPlayer(this.color);

    return movements.filter((possibleMov) => {
      const copy = chess.copyBoard();

      // Simulates the movement of the possibleCapture in the copy.
      copy[possibleMov.x][possibleMov.y] = copy[x][y];
      copy[x][y] = null;

      // If this piece is the king, the possible position of the king if
      // this movement is executed will be possibleMov. If not,
      // the possible king position will be the normal king position.
      const kingPossiblePosition = {
        x: this.pieceType === 'king' ? possibleMov.x : myKingPosition.x,
        y: this.pieceType === 'king' ? possibleMov.y : myKingPosition.y,
      };

      const isChecked = chess.isCheckedPosition(
        kingPossiblePosition.x,
        kingPossiblePosition.y,
        player.enemyColor,
        copy
      );

      // The pieces cannot go to positions that leave their king unprotected
      return !isChecked;
    });
  }
}
