// Columns and Rows of the board.
const COLUMNS = 8;
const ROWS = 8;

import Piece from './pieces/piece';
import Pawn from './pieces/pawn';
import King from './pieces/king';
import Knight from './pieces/knight';
import Rook from './pieces/rook';
import Bishop from './pieces/bishop';
import Queen from './pieces/queen';

import Movement from './movement';
import Castling, { Castle } from './castling';

interface Result {
  winner: string;
  draw: boolean;
}
interface Player {
  color: string;
  enemyColor: string;
  yDirection: number;
  startPawnYLine: number;
  lastPawnYLine: number;
  castling: Castling;
}

export default class Chess {
  private __board: Piece[][];
  private __previousBoard: Piece[][]; // Last turn board
  private __players: Player[];
  turnNumber: number;
  onFinish?: (result: Result) => any; // This function is called when the game ends

  constructor(onFinish?: () => any) {
    this.__board = this.createBoard();
    this.turnNumber = 1;
    this.onFinish = onFinish;

    this.__players = [
      {
        color: 'white',
        enemyColor: 'black',
        yDirection: 1,
        startPawnYLine: 1,
        lastPawnYLine: 7,
        castling: {
          short: {
            positions: [
              { x: 5, y: 0 },
              { x: 6, y: 0 },
            ],
            kingStartPosition: { x: 4, y: 0 },
            kingFinalPosition: { x: 6, y: 0 },
            rookStartPosition: { x: 7, y: 0 },
            rookFinalPosition: { x: 5, y: 0 },
          },
          long: {
            positions: [
              { x: 3, y: 0 },
              { x: 2, y: 0 },
              { x: 1, y: 0 },
            ],
            kingStartPosition: { x: 4, y: 0 },
            kingFinalPosition: { x: 2, y: 0 },
            rookStartPosition: { x: 0, y: 0 },
            rookFinalPosition: { x: 3, y: 0 },
          },
        },
      },
      {
        color: 'black',
        enemyColor: 'white',
        yDirection: -1,
        startPawnYLine: 6,
        lastPawnYLine: 0,
        castling: {
          short: {
            positions: [
              { x: 5, y: 7 },
              { x: 6, y: 7 },
            ],
            kingStartPosition: { x: 4, y: 7 },
            kingFinalPosition: { x: 6, y: 7 },
            rookStartPosition: { x: 7, y: 7 },
            rookFinalPosition: { x: 5, y: 7 },
          },
          long: {
            positions: [
              { x: 3, y: 7 },
              { x: 2, y: 7 },
              { x: 1, y: 7 },
            ],
            kingStartPosition: { x: 4, y: 7 },
            kingFinalPosition: { x: 2, y: 7 },
            rookStartPosition: { x: 0, y: 7 },
            rookFinalPosition: { x: 3, y: 7 },
          },
        },
      },
    ];
  }

  get currentPlayer() {
    const idx = (this.turnNumber - 1) % 2;
    return this.__players[idx];
  }

  get whoPlays() {
    const idx = (this.turnNumber - 1) % 2;
    return this.__players[idx].color;
  }

  getPlayer(color: string) {
    return this.__players.find((player) => player.color == color);
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

    // Adding pawns
    const pawnLines = [
      { lineY: 1, color: 'white' },
      { lineY: 6, color: 'black' },
    ];

    pawnLines.forEach((line) => {
      for (let i = 0; i < 8; i++) {
        board[i][line.lineY] = new Pawn(line.color);
      }
    });

    // Adding kings
    board[4][0] = new King('white');
    board[4][7] = new King('black');

    // Adding knights
    board[1][0] = new Knight('white');
    board[6][0] = new Knight('white');
    board[1][7] = new Knight('black');
    board[6][7] = new Knight('black');

    // Adding rooks
    board[0][0] = new Rook('white');
    board[7][0] = new Rook('white');
    board[0][7] = new Rook('black');
    board[7][7] = new Rook('black');

    // Adding bishops
    board[2][0] = new Bishop('white');
    board[5][0] = new Bishop('white');
    board[2][7] = new Bishop('black');
    board[5][7] = new Bishop('black');

    // Adding queens
    board[3][0] = new Queen('white');
    board[3][7] = new Queen('black');

    return board;
  }

  getPreviousBoard() {
    return this.__previousBoard;
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

  /**
   * Removes all the pieces of the board.
   */
  cleanBoard() {
    for (let i = 0; i < COLUMNS; i++) {
      for (let j = 0; j < ROWS; j++) {
        this.removePiece(i, j);
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

  /**
   *  Copies the actual board and its state.
   */
  copyBoard() {
    const copy = new Array(COLUMNS);
    for (let x = 0; x < COLUMNS; x++) {
      copy[x] = new Array(ROWS);
      for (let y = 0; y < ROWS; y++) {
        copy[x][y] = this.__board[x][y];
      }
    }

    return copy;
  }

  getPiece(x: number, y: number, board: Piece[][] = this.__board) {
    return board[x][y];
  }

  /**
   * Moves a Piece to a position without doing any validation.
   */
  private __movePiece(fromX: number, fromY: number, toX: number, toY: number) {
    const board = this.getBoard();
    const piece = this.getPiece(fromX, fromY);

    board[fromX][fromY] = null;
    board[toX][toY] = piece;

    piece.hasMoved = true;
  }

  private __canMove(color: string, board: Piece[][] = this.__board) {
    for (let c = 0; c < COLUMNS; c++) {
      for (let r = 0; r < ROWS; r++) {
        const piece = this.getPiece(c, r, board);

        if (
          piece &&
          piece.color === color &&
          this.getPieceMovements(c, r, board).length
        ) {
          return true;
        }
      }
    }

    return false;
  }

  isValidPosition(x: number, y: number) {
    if (x < 0 || x > 7) {
      return false;
    }

    if (y < 0 || y > 7) {
      return false;
    }

    return true;
  }

  /**
   * Returns if a position is checked by a color
   * @param x position x
   * @param y position y
   * @param color color
   * @returns is checked?
   */
  isCheckedPosition(
    x: number,
    y: number,
    color: string,
    board: Piece[][] = this.__board
  ) {
    for (let c = 0; c < COLUMNS; c++) {
      for (let r = 0; r < ROWS; r++) {
        const piece = this.getPiece(c, r, board);

        if (
          piece &&
          piece.color === color &&
          this.getPieceMovements(c, r, board, true).find(
            (m) => m.x === x && m.y === y
          )
        ) {
          return true;
        }
      }
    }

    return false;
  }

  getKingPosition(color: string) {
    for (let c = 0; c < COLUMNS; c++) {
      for (let r = 0; r < ROWS; r++) {
        const piece = this.getPiece(c, r);

        if (piece && piece.pieceType === 'king' && piece.color === color) {
          return { x: c, y: r };
        }
      }
    }

    return null;
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

  removePiece(x: number, y: number) {
    this.__board[x][y] = null;
  }

  isThereAllyPiece(
    piece: Piece,
    x: number,
    y: number,
    board: Piece[][] = this.__board
  ) {
    const possibleAlly = this.getPiece(x, y, board);

    if (!possibleAlly) {
      return false;
    }

    return piece.color === possibleAlly.color;
  }

  move(fromX: number, fromY: number, toX: number, toY: number) {
    const piece = this.getPiece(fromX, fromY);

    if (piece.color !== this.whoPlays) {
      throw new Error('Invalid movement');
    }

    const pieceMovements = this.getPieceMovements(fromX, fromY);
    const movement = pieceMovements.find((m) => m.x === toX && m.y === toY);

    if (!movement) {
      throw new Error('Invalid movement');
    }

    // Save the board before move
    this.__previousBoard = this.copyBoard();

    this.__movePiece(fromX, fromY, toX, toY);

    const player = this.getPlayer(piece.color);

    // Castling
    if (movement.castle) {
      for (const [castleType, castle] of Object.entries(player.castling)) {
        if (
          movement.x === castle.kingFinalPosition.x &&
          movement.y === castle.kingFinalPosition.y
        ) {
          this.__movePiece(
            castle.rookStartPosition.x,
            castle.rookStartPosition.y,
            castle.rookFinalPosition.x,
            castle.rookFinalPosition.y
          );
        }
      }
    }

    // Passing
    if (movement.passing) {
      this.removePiece(toX, toY - player.yDirection);
    }

    if (piece.pieceType === 'pawn' && toY === player.lastPawnYLine) {
      this.removePiece(toX, toY);
      this.addPiece(new Queen(piece.color), toX, toY);
    }

    // Pass the turn
    this.turnNumber++;

    /*
      ----- Start checkmate and draw logic -----
    */
    const currentColor = this.currentPlayer.color;
    const enemyColor = this.currentPlayer.enemyColor;
    const kingPosition = this.getKingPosition(currentColor);

    // Workaround: some tests have no king
    if (!kingPosition) {
      return;
    }

    const canMove = this.__canMove(currentColor);

    if (!canMove) {
      const isPlayerChecked = this.isCheckedPosition(
        kingPosition.x,
        kingPosition.y,
        enemyColor
      );

      if (isPlayerChecked) {
        this.onFinish({
          winner: enemyColor,
          draw: false,
        });
      } else {
        this.onFinish({
          winner: null,
          draw: true,
        });
      }
    }
    /*
      ----- End checkmate and draw logic -----
    */
  }

  getPieceMovements(
    x: number,
    y: number,
    board: Piece[][] = this.__board,
    noCalculateIsChecked?: boolean
  ) {
    const piece = this.getPiece(x, y, board);

    return piece.getMovements(x, y, this, board, noCalculateIsChecked);
  }

  hasPiece(x: number, y: number, board: Piece[][] = this.__board) {
    return this.getPiece(x, y, board) ? true : false;
  }

  canCastle(color: string, castle: Castle) {
    const king = this.getPiece(
      castle.kingStartPosition.x,
      castle.kingStartPosition.y
    );
    const rook = this.getPiece(
      castle.rookStartPosition.x,
      castle.rookStartPosition.y
    );

    if (!king || !rook) {
      return false;
    }

    if (king.pieceType !== 'king' || rook.pieceType !== 'rook') {
      return false;
    }

    if (king.color !== color || rook.color !== color) {
      return false;
    }

    // If the king or the rook has moved, the player cannot castle
    if (king.hasMoved || rook.hasMoved) {
      return false;
    }

    const player = this.getPlayer(color);

    // Positions between the king and the rook
    for (const position of castle.positions) {
      // There should be no pieces between the king and the rook to castle
      if (this.hasPiece(position.x, position.y)) {
        return false;
      }

      // There should be no attacked positions between the king and the rook to castle
      if (this.isCheckedPosition(position.x, position.y, player.enemyColor)) {
        return false;
      }
    }

    // The king position must not be under attack to castle
    if (
      this.isCheckedPosition(
        castle.kingStartPosition.x,
        castle.kingStartPosition.y,
        player.enemyColor
      )
    ) {
      return false;
    }

    // The rook position must not be under attack to castle
    if (
      this.isCheckedPosition(
        castle.rookStartPosition.x,
        castle.rookStartPosition.y,
        player.enemyColor
      )
    ) {
      return false;
    }

    return true;
  }
}
