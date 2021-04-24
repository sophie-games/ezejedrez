// Columns and Rows of the board.
const COLUMNS = 8;
const ROWS = 8;

export default class Chess {
  constructor() {
    this._board = this.createBoard();
    this.turnNumber = 1;
  }

  get whoPlays() {
    return this.turnNumber % 2 === 0 ? 'black' : 'white';
  }

  createBoard() {
    // We create the matrix
    const board = [];
    for (let x = 0; x < COLUMNS; x++) {
      board[x] = [];
      for (let y = 0; y < ROWS; y++) {
        board[x][y] = 0;
      }
    }

    const pawnLines = [
      { lineY: 1, color: 'white' },
      { lineY: 6, color: 'black' },
    ];

    pawnLines.forEach((line) => {
      for (let i = 0; i < 8; i++) {
        board[i][line.lineY] = {
          pieceType: 'pawn',
          color: line.color,
        };
      }
    });

    return board;
  }

  getBoard() {
    return this._board;
  }

  getBoardAsArray() {
    const board = this.getBoard();
    let arrayBoard = [];

    for (let i = 0; i < board.length; i++) {
      arrayBoard = arrayBoard.concat(board[i]);
    }

    return arrayBoard;
  }

  getMovements(x, y) {
    if (y === 6) {
      return [
        { x: x, y: 5 },
        { x: x, y: 4 },
      ];
    }

    return [
      { x: x, y: 2 },
      { x: x, y: 3 },
    ];
  }

  getPiece(x, y) {
    const board = this.getBoard();
    return board[x][y];
  }

  /**
   * Moves a Piece to a position without doing any validation
   * @param {Number} fromX
   * @param {Number} fromY
   * @param {Number} toX
   * @param {Number} toY
   */
  movePiece(fromX, fromY, toX, toY) {
    const board = this.getBoard();
    const piece = this.getPiece(fromX, fromY);

    board[fromX][fromY] = 0;
    board[toX][toY] = piece;
  }

  pieceMovement(x, fromX, fromY, toX, toY) {
    const piece = this.getPiece(x, 1);

    if (fromX === x && fromY === 1 && toX === x && toY === 2) {
      piece.y = 2;
      this.movePiece(fromX, fromY, fromX, 2);

      return true;
    } else if (fromX === x && fromY === 1 && toX === x && toY === 3) {
      this.movePiece(fromX, fromY, fromX, 3);

      return true;
    } else {
      return false;
    }
  }

  move(fromX, fromY, toX, toY) {
    this.turnNumber++;

    for (let i = 0; i < 8; i++) {
      if (this.pieceMovement(i, fromX, fromY, toX, toY)) {
        return;
      }
    }

    throw new Error('Invalid movement');
  }
}
