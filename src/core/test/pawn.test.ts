import Chess from '../chess';
import Doge from '../pieces/doge';
import Pawn from '../pieces/pawn';

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

  describe('.getMovements(x,y)', () => {
    test('Pawns movements 1', () => {
      const chess = new Chess();

      const movements = chess.getPieceMovements(0, 1);

      expect(movements.length).toBe(2);
      expect(movements.find((m) => m.x === 0 && m.y === 2)).not.toBe(undefined);
      expect(movements.find((m) => m.x === 0 && m.y === 3)).not.toBe(undefined);
    });

    test('Pawns movements 2', () => {
      const chess = new Chess();

      const movements = chess.getPieceMovements(1, 1);

      expect(movements.length).toBe(2);
      expect(movements.find((m) => m.x === 1 && m.y === 2)).not.toBe(undefined);
      expect(movements.find((m) => m.x === 1 && m.y === 3)).not.toBe(undefined);
    });

    test('Pawns movements 3 (black)', () => {
      const chess = new Chess();

      const movements = chess.getPieceMovements(1, 6);

      expect(movements.length).toBe(2);
      expect(movements.find((m) => m.x === 1 && m.y === 5)).not.toBe(undefined);
      expect(movements.find((m) => m.x === 1 && m.y === 4)).not.toBe(undefined);
    });

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
  });
});
