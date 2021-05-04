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
    const board = new Array(COLUMNS);
    for (let x = 0; x < COLUMNS; x++) {
      board[x] = new Array(ROWS);
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

  getMovements(x, y) {
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
    const allPawnMovements = this.getAllPawnMovements(fromX, fromY);

    if (allPawnMovements.find((m) => m.x === toX && m.y === toY)) {
      this.__movePiece(fromX, fromY, toX, toY);
      this.turnNumber++;
      return;
    }

    throw new Error('Invalid movement');
  }

  getTargetMovements(x, y) {
    const movements = [];
    const piece = this.getPiece(x, y);

    if (piece.color === 'white') {
      if (
        // Cuando tenemos la comapracion AND(&&), la propia comparacion se ejecuta en orden sincronico y si UNA de ellas
        // da false el resto no se ejecutan porque ya sabe que toda la comparacion va a dar false.
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

  getAllPawnMovements(x, y) {
    const pawnMovements = this.getMovements(x, y);
    const pawnTargets = this.getTargetMovements(x, y);
    const allPawnMovements = pawnMovements.concat(pawnTargets);

    return allPawnMovements;
  }

  hasPiece(x, y) {
    return this.getPiece(x, y) ? true : false;
  }

  /**
   * Borra todas las piezas del tablero
   */
  cleanBoard() {
    for(let i = 0; i < COLUMNS; i++) {
      for(let j = 0; j < ROWS; j++) {
        this._board[i][j] = 0;
      }
    }
  }
  
  /**
   * Borra el tablero actual y permite interactuar con el board interno en el callback para agregar piezas.
   * @param {Function} callback
   */
  setBoard( callback ) {
    this.cleanBoard();
    callback(this._board);
  }
}
