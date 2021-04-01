export default class Chess {
  get whoPlays() {
    return 'white';
  }

  getBoard() {
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

  move() {
    throw new Error('Invalid movement');
  }
}
