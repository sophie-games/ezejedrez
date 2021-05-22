// Columns and Rows of the board.
const COLUMNS = 8;
const ROWS = 8;

import Piece from './pieces/piece' // TODO: eliminar

import WhitePawn from './pieces/white_pawn'
import BlackPawn from './pieces/black_pawn'
import King from './pieces/king'

import Movement from './movement'

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
          board[i][line.lineY] = new Piece('pawn', line.color);
      }
    });

    // Adding kings
      board[4][0] = new King('white');

      board[4][7] = new King('black');

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

  addPiece(newPiece: Piece, x: number, y: number) {
    const board = this.getBoard();
    const hasPiece = this.hasPiece(x, y);

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

  getPieceMovements(x: number, y: number) {
    const piece = this.getPiece(x, y);

      return piece.getMovements(x, y, this);
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
