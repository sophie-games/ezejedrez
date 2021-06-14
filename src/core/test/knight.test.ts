import Chess from '../chess';
import Knight from '../pieces/knight';

describe('Knight suite', () => {
  test('Knights should be in its correct place', () => {
    const chess = new Chess();
    const arrayBoard = chess.getBoardAsArray();
    const whiteKnight1 = chess.getPiece(1, 0);
    const whiteKnight2 = chess.getPiece(6, 0);
    const blackKnight1 = chess.getPiece(1, 7);
    const blackKnight2 = chess.getPiece(6, 7);

    expect(whiteKnight1.pieceType).toBe('knight');
    expect(blackKnight1.pieceType).toBe('knight');
    expect(whiteKnight1.color).toBe('white');
    expect(blackKnight1.color).toBe('black');

    expect(whiteKnight2.pieceType).toBe('knight');
    expect(blackKnight2.pieceType).toBe('knight');
    expect(whiteKnight2.color).toBe('white');
    expect(blackKnight2.color).toBe('black');

    expect(
      arrayBoard.filter((piece) => piece && piece.pieceType === 'knight').length
    ).toBe(4);
  });

  describe('.getMovements(x,y)', () => {
    test('The knight can only move to a valid position', () => {
      const chess = new Chess();

      chess.cleanBoard();

      chess.addPiece(new Knight('white'), 4, 3);

      const movements = chess.getPieceMovements(4, 3);

      expect(movements.length).toBe(8);
      expect(movements.find((m) => m.x === 3 && m.y === 5)).not.toBe(undefined);
      expect(movements.find((m) => m.x === 2 && m.y === 4)).not.toBe(undefined);
      expect(movements.find((m) => m.x === 2 && m.y === 2)).not.toBe(undefined);
      expect(movements.find((m) => m.x === 3 && m.y === 1)).not.toBe(undefined);
      expect(movements.find((m) => m.x === 5 && m.y === 1)).not.toBe(undefined);
      expect(movements.find((m) => m.x === 6 && m.y === 2)).not.toBe(undefined);
      expect(movements.find((m) => m.x === 6 && m.y === 4)).not.toBe(undefined);
      expect(movements.find((m) => m.x === 5 && m.y === 5)).not.toBe(undefined);
    });

    test('A Knight can jump over pieces to reach its destination', () => {
      const chess = new Chess();

      const movements = chess.getPieceMovements(1, 0);

      expect(movements.length).toBe(2);
      expect(movements.find((m) => m.x === 0 && m.y === 2)).not.toBe(undefined);
      expect(movements.find((m) => m.x === 2 && m.y === 2)).not.toBe(undefined);

      const movements2 = chess.getPieceMovements(6, 0);

      expect(movements2.length).toBe(2);
      expect(movements2.find((m) => m.x === 5 && m.y === 2)).not.toBe(
        undefined
      );
      expect(movements2.find((m) => m.x === 7 && m.y === 2)).not.toBe(
        undefined
      );
    });
  });
});
