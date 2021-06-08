import Chess from '../chess';
import King from '../pieces/king';

describe('King suite', () => {
  test('Kings should be in its correct place', () => {
    const chess = new Chess();
    const arrayBoard = chess.getBoardAsArray();
    const whiteKing = chess.getPiece(4, 0);
    const blackKing = chess.getPiece(4, 7);

    expect(whiteKing.pieceType).toBe('king');
    expect(blackKing.pieceType).toBe('king');
    expect(whiteKing.color).toBe('white');
    expect(blackKing.color).toBe('black');

    expect(
      arrayBoard.filter((piece) => piece && piece.pieceType === 'king').length
    ).toBe(2);
  });

  describe('.getMovements(x,y)', () => {
    test('The king can only move to a valid position', () => {
      const chess = new Chess();

      chess.cleanBoard();

      chess.addPiece(new King('white'), 4, 3);

      const movements = chess.getPieceMovements(4, 3);

      expect(movements.length).toBe(8);
      expect(movements.find((m) => m.x === 4 && m.y === 4)).not.toBe(undefined);
      expect(movements.find((m) => m.x === 3 && m.y === 4)).not.toBe(undefined);
      expect(movements.find((m) => m.x === 3 && m.y === 3)).not.toBe(undefined);
      expect(movements.find((m) => m.x === 3 && m.y === 2)).not.toBe(undefined);
      expect(movements.find((m) => m.x === 4 && m.y === 2)).not.toBe(undefined);
      expect(movements.find((m) => m.x === 5 && m.y === 2)).not.toBe(undefined);
      expect(movements.find((m) => m.x === 5 && m.y === 3)).not.toBe(undefined);
      expect(movements.find((m) => m.x === 5 && m.y === 4)).not.toBe(undefined);
    });
  });
});
