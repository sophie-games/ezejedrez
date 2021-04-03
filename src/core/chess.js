export default class Chess {
  constructor() {
    this.board = this.createBoard();
    this.turnNumber = 1;
  }

  get whoPlays() {
    return this.turnNumber % 2 === 0 ? 'black' : 'white';
  }

  createBoard() {
    const board = [];

    const pawnLines = [
      { lineY: 1, color: 'white' },
      { lineY: 6, color: 'black' },
    ];

    pawnLines.forEach((line) => {
      for (let i = 0; i < 8; i++) {
        board.push({
          pieceType: 'pawn',
          color: line.color,
          x: i,
          y: line.lineY,
        });
      }
    });

    return board;
  }

  getBoard() {
    return this.board;
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

  pieceMovement(x, fromX, fromY, toX, toY) {
    const board = this.getBoard();

    function getPiece(x, y) {
      return board.find((piece) => piece.x === x && piece.y === 1);
    }

    if (fromX === x && fromY === 1 && toX === x && toY === 2) {
      const piece = getPiece(x, 1);
      piece.y = 2;

      return true;
    } else {
      return false;
    }
  }

  move(fromX, fromY, toX, toY) {
    const board = this.getBoard();

    this.turnNumber = this.turnNumber + 1;

    for (let i = 0; i < 8; i++) {
      if (this.pieceMovement(i, fromX, fromY, toX, toY)) {
        return;
      }
    }

    throw new Error('Invalid movement');
  }
}
