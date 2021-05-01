import Chess from '../chess';

test('Wait should play first', () => {
  const chess = new Chess();

  expect(chess.whoPlays).toBe('white');
});

test('All pieces should be in its correct place', () => {
  const chess = new Chess();
  const arrayBoard = chess.getBoardAsArray();

  const pawnLines = [
    { lineY: 1, color: 'white' },
    { lineY: 6, color: 'black' },
  ];

  pawnLines.forEach((line) => {
    for (let i = 0; i < 8; i++) {
      const pawn = chess.getPiece(i, line.lineY);
      expect(pawn).not.toBe(0);
      expect(pawn.pieceType).toBe('pawn');
      expect(pawn.color).toBe(line.color);
    }
  });

  expect(arrayBoard.filter((piece) => piece.pieceType === 'pawn').length).toBe(
    16,
  );

  // TODO: testear las otras piezas
});

test('Pawns movements 1', () => {
  const chess = new Chess();

  const movements = chess.getMovements(0, 1);

  expect(movements.length).toBe(2);
  expect(movements.find((m) => m.x === 0 && m.y === 2)).not.toBe(undefined);
  expect(movements.find((m) => m.x === 0 && m.y === 3)).not.toBe(undefined);
});

test('Pawns movements 2', () => {
  const chess = new Chess();

  const movements = chess.getMovements(1, 1);

  expect(movements.length).toBe(2);
  expect(movements.find((m) => m.x === 1 && m.y === 2)).not.toBe(undefined);
  expect(movements.find((m) => m.x === 1 && m.y === 3)).not.toBe(undefined);
});

test('Pawns movements 3', () => {
  const chess = new Chess();

  const movements = chess.getMovements(1, 6);

  expect(movements.length).toBe(2);
  expect(movements.find((m) => m.x === 1 && m.y === 5)).not.toBe(undefined);
  expect(movements.find((m) => m.x === 1 && m.y === 4)).not.toBe(undefined);
});

test('White pawn cannot move to an invalid position', () => {
  const chess = new Chess();

  const t = () => {
    chess.move(0, 1, 1, 2);
  };

  expect(t).toThrow('Invalid movement');
});

test('White pawn can move to a valid position', () => {
  const chess = new Chess();

  chess.move(0, 1, 0, 2);

  expect(chess.getPiece(0, 2)).not.toBe(0);
  expect(chess.getPiece(0, 1)).toBe(0);
});

test('White pawn can move to a valid position 2', () => {
  const chess = new Chess();

  chess.move(1, 1, 1, 2);

  expect(chess.getPiece(1, 2)).not.toBe(0);
  expect(chess.getPiece(1, 1)).toBe(0);
});

test('White pawn can move 2 squares at the begining', () => {
  const chess = new Chess();

  chess.move(0, 1, 0, 3);

  expect(chess.getPiece(0, 3)).not.toBe(0);
  expect(chess.getPiece(0, 1)).toBe(0);
});

test('White pawn can move 2 squares at the begining 2', () => {
  const chess = new Chess();

  chess.move(5, 1, 5, 3);

  expect(chess.getPiece(5, 3)).not.toBe(0);
  expect(chess.getPiece(5, 1)).toBe(0);
});

test(`It should be possible to add a piece in a valid position`, () => {
  const chess = new Chess();

  expect(chess.hasPiece(4, 3)).toBe(false);
  expect(chess.getPieces().length).toBe(16);

  chess.addPiece('king', 'white', 4, 3);

  expect(hasPiece(4, 3)).toBe(true);

  const piece = getPiece(4, 3);

  expect(piece.pieceType).toBe('king');
  expect(piece.color).toBe('white');
  expect(chess.getPieces().length).toBe(17);
});

// test(`It shouldn't be possible to add a piece in a invalid position`, () => {
//   const chess = new Chess();

//   expect(chess.getPiece(3, 1)).not.toBe(0);
//   expect(chess.getPieces().length).toBe(16);

//   chess.addPiece('king', 'white', 3, 1);

//   expect(chess.getPieces()).toBe(`There's already a piece in that position`);
//   expect(chess.getPieces().length).toBe(16);
// });

test('After the white pieces moves, the black pieces move', () => {
  const chess = new Chess();

  chess.move(0, 1, 0, 2);

  expect(chess.whoPlays).toBe('black');
});
