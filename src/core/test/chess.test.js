import Chess from '../chess';

test('Wait should play first', () => {
  const chess = new Chess();

  expect(chess.whoPlays).toBe('white');
});

test('All pieces should be in its correct place', () => {
  const chess = new Chess();
  const board = chess.getBoard();

  const pawnLines = [
    { lineY: 1, color: 'white' },
    { lineY: 6, color: 'black' },
  ];

  pawnLines.forEach((line) => {
    for (let i = 0; i < 8; i++) {
      const pawn = board.find(
        (piece) => piece.x === i && piece.y === line.lineY,
      );
      expect(pawn).not.toBe(undefined);
      expect(pawn.pieceType).toBe('pawn');
      expect(pawn.color).toBe(line.color);
    }
  });

  expect(board.filter((piece) => piece.pieceType === 'pawn').length).toBe(16);

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

test('Cannot move to an invalid position', () => {
  const chess = new Chess();

  const t = () => {
    chess.move(0, 1, 1, 2);
  };

  expect(t).toThrow('Invalid movement');
});

test('Can move to a valid position', () => {
  const chess = new Chess();

  chess.move(0, 1, 0, 2);

  const board = chess.getBoard();

  expect(board.find((piece) => piece.x === 0 && piece.y === 2)).not.toBe(
    undefined,
  );

  expect(board.find((piece) => piece.x === 0 && piece.y === 1)).toBe(undefined);
});

test('Can move to a valid position 2', () => {
  const chess = new Chess();

  chess.move(1, 1, 1, 2);

  const board = chess.getBoard();

  expect(board.find((piece) => piece.x === 1 && piece.y === 2)).not.toBe(
    undefined,
  );

  expect(board.find((piece) => piece.x === 1 && piece.y === 1)).toBe(undefined);
});
