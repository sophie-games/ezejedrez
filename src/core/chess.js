// Columns and Rows of the board.
const COLUMNS = 8;
const ROWS = 8;

export default class Chess {
  constructor() {
    this.__board = this.createBoard();
    this.turnNumber = 1;
  }

  get whoPlays() {
    return this.turnNumber % 2 === 0 ? 'black' : 'white';
  }

  createBoard() {
    // We create the matrix
    const board = new Array(COLUMNS);

    for (let x = 0; x < COLUMNS; x++) {
      board[x] = new Array(ROWS);
      for (let y = 0; y < ROWS; y++) {
        board[x][y] = 0;
      }
    }

    //Adding pawns
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

    // Adding kings
    board[4][0] = {
      pieceType: 'king',
      color: 'white',
    };

    board[4][7] = {
      pieceType: 'king',
      color: 'black',
    };

    return board;
  }

  getBoard() {
    return this.__board;
  }

  getBoardAsArray() {
    const board = this.getBoard();
    let arrayBoard = [];

    for (let i = 0; i < board.length; i++) {
      arrayBoard = arrayBoard.concat(board[i]);
    }

    return arrayBoard;
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
  __movePiece(fromX, fromY, toX, toY) {
    const board = this.getBoard();
    const piece = this.getPiece(fromX, fromY);

    board[fromX][fromY] = 0;
    board[toX][toY] = piece;
  }

  __getPawnMoveMovements(x, y) {
    const piece = this.getPiece(x, y);
    const movements = [];

    const addIfIsAnEmptySquare = (mX, mY) => {
      if (!this.hasPiece(mX, mY)) {
        movements.push({ x: mX, y: mY });
      }
    };

    if (piece.color === 'white') {
      addIfIsAnEmptySquare(x, y + 1);

      if (y === 1 && !this.hasPiece(x, y + 1)) {
        addIfIsAnEmptySquare(x, y + 2);
      }
    }

    if (piece.color === 'black') {
      addIfIsAnEmptySquare(x, y - 1);

      if (y === 6 && !this.hasPiece(x, y - 1)) {
        addIfIsAnEmptySquare(x, y - 2);
      }
    }

    return movements;
  }

  __getKingMoveMovements(x, y) {
    const movements = [];

    const addIfIsAnEmptySquare = (mX, mY) => {
      if (!this.hasPiece(mX, mY)) {
        movements.push({ x: mX, y: mY });
      }
    };

    const kingPossibleMovs = [
      { x: x, y: y + 1 },
      { x: x - 1, y: y + 1 },
      { x: x - 1, y: y },
      { x: x - 1, y: y - 1 },
      { x: x, y: y - 1 },
      { x: x + 1, y: y - 1 },
      { x: x + 1, y: y },
      { x: x + 1, y: y + 1 },
    ];

    for (let i = 0; i < kingPossibleMovs.length; i++) {
      const possibleMov = kingPossibleMovs[i];

      addIfIsAnEmptySquare(possibleMov.x, possibleMov.y);
    }

    return movements;
  }

  isAValidPosition(x, y) {
    if (x < 0 || x > 7) {
      return false;
    }

    if (y < 0 || y > 7) {
      return false;
    }

    return true;
  }

  getPieces() {
    const arr = this.getBoardAsArray();
    const pieces = arr.filter((piece) => piece.pieceType);

    return pieces;
  }

  addPiece(type, color, x, y) {
    const board = this.getBoard();
    const hasPiece = this.hasPiece(x, y);
    const newPiece = { pieceType: type, color: color };

    if (hasPiece) {
      throw new Error(`There's already a piece in that position`);
    } else {
      board[x][y] = newPiece;
    }
  }

  move(fromX, fromY, toX, toY) {
    const pieceMovements = this.getPieceMovements(fromX, fromY);

    if (pieceMovements.find((m) => m.x === toX && m.y === toY)) {
      this.__movePiece(fromX, fromY, toX, toY);
      this.turnNumber++;
      return;
    }

    throw new Error('Invalid movement');
  }

  __getPawnCaptureMovements(x, y) {
    const movements = [];
    const piece = this.getPiece(x, y);

    if (piece.color === 'white') {
      if (
        this.isAValidPosition(x + 1, y + 1) &&
        this.getPiece(x + 1, y + 1) &&
        this.getPiece(x + 1, y + 1).color === 'black'
      ) {
        movements.push({
          x: x + 1,
          y: y + 1,
        });
      }

      if (
        this.isAValidPosition(x - 1, y + 1) &&
        this.getPiece(x - 1, y + 1) &&
        this.getPiece(x - 1, y + 1).color === 'black'
      ) {
        movements.push({
          x: x - 1,
          y: y + 1,
        });
      }
    }

    if (piece.color === 'black') {
      if (
        this.isAValidPosition(x - 1, y - 1) &&
        this.getPiece(x - 1, y - 1) &&
        this.getPiece(x - 1, y - 1).color === 'white'
      ) {
        movements.push({
          x: x - 1,
          y: y - 1,
        });
      }

      if (
        this.isAValidPosition(x + 1, y - 1) &&
        this.getPiece(x + 1, y - 1) &&
        this.getPiece(x + 1, y - 1).color === 'white'
      ) {
        movements.push({
          x: x + 1,
          y: y - 1,
        });
      }
    }

    return movements;
  }

  __getPawnMovements(x, y) {
    const pawnMovements = this.__getPawnMoveMovements(x, y);
    const pawnTargets = this.__getPawnCaptureMovements(x, y);
    const allPawnMovements = pawnMovements.concat(pawnTargets);

    return allPawnMovements;
  }

  __getKingMovements(x, y) {
    const kingMovements = this.__getKingMoveMovements(x, y);

    const allKingMovements = kingMovements;

    return allKingMovements;
  }

  getPieceMovements(x, y) {
    const piece = this.getPiece(x, y);

    switch (piece.pieceType) {
      case 'king':
        return this.__getKingMovements(x, y);

      case 'pawn':
        return this.__getPawnMovements(x, y);
    }
  }

  hasPiece(x, y) {
    return this.getPiece(x, y) ? true : false;
  }

  /**
   * Borra todas las piezas del tablero
   */
  cleanBoard() {
    for (let i = 0; i < COLUMNS; i++) {
      for (let j = 0; j < ROWS; j++) {
        this.__board[i][j] = 0;
      }
    }
  }

  /**
   * Borra el tablero actual y permite interactuar con el board interno en el callback para agregar piezas.
   * @param {Function} callback
   */
  setBoard(callback) {
    this.cleanBoard();
    callback(this.__board);
  }
}
