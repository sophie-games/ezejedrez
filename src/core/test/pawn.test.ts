import Chess from '../chess';
import Doge from '../pieces/doge';
import Pawn from '../pieces/pawn';
import Piece from '../pieces/piece';

describe('Pawn suite', () => {
  test('Pawns should be in its correct place', () => {
    const chess = new Chess();
    const arrayBoard = chess.getBoardAsArray();

    const pawnLines = [
      { lineY: 1, color: 'white' },
      { lineY: 6, color: 'black' },
    ];

    pawnLines.forEach((line) => {
      for (let i = 0; i < 8; i++) {
        const pawn = chess.getPiece(i, line.lineY);
        expect(pawn.pieceType).toBe('pawn');
        expect(pawn.color).toBe(line.color);
      }
    });

    expect(
      arrayBoard.filter((piece) => piece && piece.pieceType === 'pawn').length
    ).toBe(16);
  });

  describe('.getMovements()', () => {
    // GENERAL
    test('A pawn cannot capture another piece that has the same color', () => {
      const chess = new Chess();

      chess.cleanBoard();

      chess.addPiece(new Pawn('white'), 4, 3);
      chess.addPiece(new Pawn('white'), 5, 4);

      const movements = chess.getPieceMovements(4, 3);

      expect(movements.length).toBe(1);

      expect(movements.find((m) => m.x === 4 && m.y === 4)).not.toBe(undefined);
    });

    test('A pawn cannot overstep a piece if it is in its initial position', () => {
      const chess = new Chess();

      chess.cleanBoard();

      chess.addPiece(new Pawn('white'), 4, 1);
      chess.addPiece(new Pawn('white'), 4, 2);

      const movements = chess.getPieceMovements(4, 1);

      expect(movements.length).toBe(0);
    });

    // WHITE PAWNS MOVES
    test('White pawns movements (initial position)', () => {
      const chess = new Chess();

      const movements = chess.getPieceMovements(0, 1);

      expect(movements.length).toBe(2);
      expect(movements.find((m) => m.x === 0 && m.y === 2)).not.toBe(undefined);
      expect(movements.find((m) => m.x === 0 && m.y === 3)).not.toBe(undefined);
    });

    test('White pawns movements 2(initial position)', () => {
      const chess = new Chess();

      const movements = chess.getPieceMovements(1, 1);

      expect(movements.length).toBe(2);
      expect(movements.find((m) => m.x === 1 && m.y === 2)).not.toBe(undefined);
      expect(movements.find((m) => m.x === 1 && m.y === 3)).not.toBe(undefined);
    });

    test("White pawns can only move 1 square forward if they aren't in initial position", () => {
      const chess = new Chess();

      chess.addPiece(new Pawn('white'), 2, 2);

      const movements = chess.getPieceMovements(2, 2);

      expect(movements.length).toBe(1);
      expect(movements.find((m) => m.x === 2 && m.y === 3)).not.toBe(undefined);
    });

    test('A white pawn cannot move if it has a piece in front of it', () => {
      const chess = new Chess();

      chess.addPiece(new Pawn('white'), 3, 3);
      chess.addPiece(new Pawn('black'), 3, 4);

      const movements = chess.getPieceMovements(3, 3);

      expect(movements.length).toBe(0);
    });

    // WHITE PAWNS CAPTURES
    test(`Pawns should capture only in their correctly directions`, () => {
      const chess = new Chess();

      chess.cleanBoard();

      chess.addPiece(new Pawn('white'), 4, 3);
      chess.addPiece(new Doge('black'), 3, 4);
      chess.addPiece(new Doge('black'), 4, 4);
      chess.addPiece(new Doge('black'), 5, 4);
      chess.addPiece(new Doge('black'), 5, 3);
      chess.addPiece(new Doge('black'), 5, 2);
      chess.addPiece(new Doge('black'), 4, 2);
      chess.addPiece(new Doge('black'), 3, 2);
      chess.addPiece(new Doge('black'), 3, 3);

      const movements = chess.getPieceMovements(4, 3);

      expect(movements.length).toBe(2);
      expect(movements.find((m) => m.x === 3 && m.y === 4)).not.toBe(undefined);
      expect(movements.find((m) => m.x === 5 && m.y === 4)).not.toBe(undefined);
    });

    test('White pawn can only capture diagonally forward one square to the left or right', () => {
      const chess = new Chess();

      chess.addPiece(new Pawn('white'), 3, 3);
      chess.addPiece(new Pawn('black'), 2, 4);
      chess.addPiece(new Pawn('black'), 4, 4);
      chess.addPiece(new Pawn('black'), 3, 4);

      const movements = chess.getPieceMovements(3, 3);

      expect(movements.length).toBe(2);
      expect(movements.find((m) => m.x === 2 && m.y === 4)).not.toBe(undefined);
      expect(movements.find((m) => m.x === 4 && m.y === 4)).not.toBe(undefined);
    });

    // BLACK PAWNS MOVES
    test('Black pawns movements (initial position)', () => {
      const chess = new Chess();

      const movements = chess.getPieceMovements(1, 6);

      expect(movements.length).toBe(2);
      expect(movements.find((m) => m.x === 1 && m.y === 5)).not.toBe(undefined);
      expect(movements.find((m) => m.x === 1 && m.y === 4)).not.toBe(undefined);
    });

    test("Black pawns can only move 1 square forward if they aren't in initial position", () => {
      const chess = new Chess();

      chess.addPiece(new Pawn('black'), 2, 5);

      const movements = chess.getPieceMovements(2, 5);

      expect(movements.length).toBe(1);
      expect(movements.find((m) => m.x === 2 && m.y === 4)).not.toBe(undefined);
    });

    test('Black pawn cannot move if it has a piece in front of it', () => {
      const chess = new Chess();

      chess.addPiece(new Pawn('black'), 6, 4);
      chess.addPiece(new Pawn('white'), 6, 3);

      const movements = chess.getPieceMovements(6, 4);

      expect(movements.length).toBe(0);
    });

    // BLACK PAWNS CAPTURES
    test('Black pawn can only capture diagonally forward one square to the left or right', () => {
      const chess = new Chess();

      chess.addPiece(new Pawn('black'), 4, 4);
      chess.addPiece(new Pawn('white'), 3, 3);
      chess.addPiece(new Pawn('white'), 5, 3);
      chess.addPiece(new Pawn('white'), 4, 3);

      const movements = chess.getPieceMovements(4, 4);

      expect(movements.length).toBe(2);
      expect(movements.find((m) => m.x === 3 && m.y === 3)).not.toBe(undefined);
      expect(movements.find((m) => m.x === 5 && m.y === 3)).not.toBe(undefined);
    });
  });

  describe('Capture in passing', () => {
    test("White pawn can capture 'in passing'", () => {
      const chess = new Chess();

      chess.cleanBoard();

      chess.addPiece(new Pawn('white'), 1, 4);
      chess.addPiece(new Pawn('black'), 0, 6);

      // Change the turn so the black can move
      chess.turnNumber = 2;

      chess.move(0, 6, 0, 4);

      const movements = chess.getPieceMovements(1, 4);
      expect(movements.find((m) => m.x === 0 && m.y === 5)).not.toBe(undefined);

      chess.move(1, 4, 0, 5);

      expect(chess.hasPiece(0, 4)).toBe(false);
    });

    test("White pawn can capture 'in passing' case 2 (right)", () => {
      const chess = new Chess();

      chess.cleanBoard();

      chess.addPiece(new Pawn('white'), 0, 4);
      chess.addPiece(new Pawn('black'), 1, 6);

      // Change the turn so the black can move
      chess.turnNumber = 2;

      chess.move(1, 6, 1, 4);

      const movements = chess.getPieceMovements(0, 4);
      expect(movements.find((m) => m.x === 1 && m.y === 5)).not.toBe(undefined);

      chess.move(0, 4, 1, 5);

      expect(chess.hasPiece(1, 4)).toBe(false);
    });

    test("Black pawn can capture 'in passing'", () => {
      const chess = new Chess();

      chess.cleanBoard();

      chess.addPiece(new Pawn('black'), 1, 3);
      chess.addPiece(new Pawn('white'), 0, 1);

      chess.move(0, 1, 0, 3);

      const movements = chess.getPieceMovements(1, 3);
      expect(movements.find((m) => m.x === 0 && m.y === 2)).not.toBe(undefined);

      chess.move(1, 3, 0, 2);

      expect(chess.hasPiece(0, 3)).toBe(false);
    });

    test("White pawn can capture 'in passing' negative case", () => {
      const chess = new Chess();

      chess.cleanBoard();

      chess.addPiece(new Pawn('white'), 0, 4);
      chess.addPiece(new Pawn('black'), 1, 5);

      // Change the turn so the black can move
      chess.turnNumber = 2;

      chess.move(1, 5, 1, 4);

      const movements = chess.getPieceMovements(0, 4);
      expect(movements.find((m) => m.x === 1 && m.y === 5)).toBe(undefined);
    });
  });
});
