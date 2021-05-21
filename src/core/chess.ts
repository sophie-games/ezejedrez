// Columns and Rows of the board.
const COLUMNS = 8;
const ROWS = 8;

interface Piece {
  pieceType: string;
  color: string;
}

interface Movement {
  x: number;
  y: number;
}

export default class Chess {
  private __board: Piece[][];
  turnNumber: number;

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
        board[x][y] = null;
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
    let arrayBoard: Piece[] = [];

    for (let i = 0; i < board.length; i++) {
      arrayBoard = arrayBoard.concat(board[i]);
    }

    return arrayBoard;
  }

  getPiece(x: number, y: number) {
    const board = this.getBoard();

    return board[x][y];
  }

  /**
   * Moves a Piece to a position without doing any validation
   */
  private __movePiece(fromX: number, fromY: number, toX: number, toY: number) {
    const board = this.getBoard();
    const piece = this.getPiece(fromX, fromY);

    board[fromX][fromY] = null;
    board[toX][toY] = piece;
  }

  private __getPawnMoveMovements(x: number, y: number) {
    const piece = this.getPiece(x, y);
    const movements: Movement[] = [];

    if (piece.color === 'white') {
      this.__addIfValidMovement(x, y + 1, movements);

      if (y === 1 && !this.hasPiece(x, y + 1)) {
        this.__addIfValidMovement(x, y + 2, movements);
      }
    }

    if (piece.color === 'black') {
      this.__addIfValidMovement(x, y - 1, movements);

      if (y === 6 && !this.hasPiece(x, y - 1)) {
        this.__addIfValidMovement(x, y - 2, movements);
      }
    }

    return movements;
  }

  private __getKingCaptureMovements(x: number, y: number) {
    const movements: Movement[] = [];
    const pieceThatCaptures = this.getPiece(x, y);

    const kingPossibleCaptures = [
      { x: x, y: y + 1 },
      { x: x - 1, y: y + 1 },
      { x: x - 1, y: y },
      { x: x - 1, y: y - 1 },
      { x: x, y: y - 1 },
      { x: x + 1, y: y - 1 },
      { x: x + 1, y: y },
      { x: x + 1, y: y + 1 },
    ];

    kingPossibleCaptures.forEach((possibleCapture) =>
      this.__addIfValidCapture(
        possibleCapture.x,
        possibleCapture.y,
        movements,
        pieceThatCaptures
      )
    );

    return movements;
  }

  private __getKingMoveMovements(x: number, y: number) {
    const movements: Movement[] = [];

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

    kingPossibleMovs.forEach((possibleMov) =>
      this.__addIfValidMovement(possibleMov.x, possibleMov.y, movements)
    );

    return movements;
  }

  private __addIfValidCapture(
    x: number,
    y: number,
    movements: object[],
    pieceThatCaptures: Piece
  ) {
    const hasPiece = this.hasPiece(x, y);
    const isAValidPosition = this.isAValidPosition(x, y);
    const pieceToCapture = this.getPiece(x, y);

    if (
      hasPiece &&
      isAValidPosition &&
      pieceThatCaptures.color !== pieceToCapture.color
    ) {
      movements.push({ x: x, y: y });
    }
  }

  private __addIfValidMovement(x: number, y: number, movements: object[]) {
    if (!this.hasPiece(x, y) && this.isAValidPosition(x, y)) {
      movements.push({ x: x, y: y });
    }
  }

  isAValidPosition(x: number, y: number) {
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
    const pieces = arr.filter((piece) => piece);

    return pieces;
  }

  addPiece(type: string, color: string, x: number, y: number) {
    const board = this.getBoard();
    const hasPiece = this.hasPiece(x, y);
    const newPiece = { pieceType: type, color: color };

    if (hasPiece) {
      throw new Error(`There's already a piece in that position`);
    } else {
      board[x][y] = newPiece;
    }
  }

  move(fromX: number, fromY: number, toX: number, toY: number) {
    const pieceMovements = this.getPieceMovements(fromX, fromY);

    if (pieceMovements.find((m) => m.x === toX && m.y === toY)) {
      this.__movePiece(fromX, fromY, toX, toY);
      this.turnNumber++;
      return;
    }

    throw new Error('Invalid movement');
  }

  private __getPawnCaptureMovements(x: number, y: number) {
    const movements: Movement[] = [];
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

  private __getPawnMovements(x: number, y: number) {
    const pawnMovements = this.__getPawnMoveMovements(x, y);
    const captureMovements = this.__getPawnCaptureMovements(x, y);
    const allPawnMovements = pawnMovements.concat(captureMovements);

    return allPawnMovements;
  }

  private __getKingMovements(x: number, y: number) {
    const kingMovements = this.__getKingMoveMovements(x, y);
    const captureMovements = this.__getKingCaptureMovements(x, y);
    const allKingMovements = kingMovements.concat(captureMovements);

    return allKingMovements;
  }

  getPieceMovements(x: number, y: number) {
    const piece = this.getPiece(x, y);

    switch (piece.pieceType) {
      case 'king':
        return this.__getKingMovements(x, y);

      case 'pawn':
        return this.__getPawnMovements(x, y);

      case 'doge':
        return [];
    }
  }

  hasPiece(x: number, y: number) {
    return this.getPiece(x, y) ? true : false;
  }

  /**
   * Removes all the pieces of the board
   */
  cleanBoard() {
    for (let i = 0; i < COLUMNS; i++) {
      for (let j = 0; j < ROWS; j++) {
        this.__board[i][j] = null;
      }
    }
  }

  /**
   * Removes the actual board and allows to interact with the new board in the callback to add new pieces.
   */
  setBoard(callback: (board: Piece[][]) => void) {
    this.cleanBoard();
    callback(this.__board);
  }
}
