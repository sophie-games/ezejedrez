import Chess from '../chess';

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

test('White should play first', () => {
  const chess = new Chess();

  expect(chess.whoPlays).toBe('white');
});

test(`It has to return true if there's a piece`, () => {
  const chess = new Chess();

  expect(chess.hasPiece(1, 1)).toBe(true);
});

test(`It has to return false if there's not a piece`, () => {
  const chess = new Chess();

  expect(chess.hasPiece(1, 3)).toBe(false);
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

test('Pawns movements 3 (black)', () => {
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

  expect(chess.hasPiece(0, 2)).toBe(true);
  expect(chess.hasPiece(0, 1)).toBe(false);
});

test('White pawn can move to a valid position 2', () => {
  const chess = new Chess();

  chess.move(1, 1, 1, 2);

  expect(chess.hasPiece(1, 2)).toBe(true);
  expect(chess.hasPiece(1, 1)).toBe(false);
});

test('White pawn can move 2 squares at the begining', () => {
  const chess = new Chess();

  chess.move(0, 1, 0, 3);

  expect(chess.hasPiece(0, 3)).toBe(true);
  expect(chess.hasPiece(0, 1)).toBe(false);
});

test('White pawn can move 2 squares at the begining 2', () => {
  const chess = new Chess();

  chess.move(5, 1, 5, 3);

  expect(chess.hasPiece(5, 3)).toBe(true);
  expect(chess.hasPiece(5, 1)).toBe(false);
});

test('White pawn cannot move 2 squares if Y != 1', () => {
  const chess = new Chess();

  chess.movePiece(4, 1, 4, 2);

  const t = () => {
    chess.move(4, 2, 4, 4);
  };

  expect(t).toThrow('Invalid movement');
});

test('Black pawn cannot move 2 squares if Y != 6', () => {
  const chess = new Chess();

  chess.move(7, 1, 7, 2);
  chess.movePiece(4, 6, 4, 5);

  const t = () => {
    chess.move(4, 5, 4, 3);
  };

  expect(t).toThrow('Invalid movement');
});

test('White pawn can only capture diagonally forward one square to the left or right', () => {
  const chess = new Chess();

  chess.movePiece(3, 1, 3, 3);
  chess.movePiece(4, 6, 4, 4);

  chess.move(3, 3, 4, 4);

  const arrayBoard = chess.getBoardAsArray();

  expect(chess.hasPiece(4, 4)).toBe(true);
  expect(chess.getPiece(4, 4).color).toBe('white');

  expect(
    arrayBoard.filter(
      (piece) => piece.pieceType === 'pawn' && piece.color === 'black',
    ).length,
  ).toBe(7);

  expect(
    arrayBoard.filter(
      (piece) => piece.pieceType === 'pawn' && piece.color === 'white',
    ).length,
  ).toBe(8);
});

test('Black pawn can only capture diagonally forward one square to the left or right', () => {
  const chess = new Chess();

  chess.movePiece(4, 6, 4, 4);
  chess.movePiece(3, 1, 3, 3);

  chess.move(4, 4, 3, 3);

  const arrayBoard = chess.getBoardAsArray();

  expect(chess.hasPiece(3, 3)).toBe(true);
  expect(chess.getPiece(3, 3).color).toBe('black');

  expect(
    arrayBoard.filter(
      (piece) => piece.pieceType === 'pawn' && piece.color === 'black',
    ).length,
  ).toBe(8);

  expect(
    arrayBoard.filter(
      (piece) => piece.pieceType === 'pawn' && piece.color === 'white',
    ).length,
  ).toBe(7);
});

// test('White pawn cannot move if it has a piece in front of it', () => {});

// test('Black pawn cannot move if it has a piece in front of it', () => {});

test('After the white pieces moves, the black pieces move', () => {
  const chess = new Chess();

  chess.move(0, 1, 0, 2);

  expect(chess.whoPlays).toBe('black');
});
