import Chess from '../chess';
import Doge from '../pieces/doge';
import Rook from '../pieces/rook';

describe('Rook suite', () => {
  test('Rooks should be in its correct place', () => {
    const chess = new Chess();
    const arrayBoard = chess.getBoardAsArray();
    const whiteRook1 = chess.getPiece(0, 0);
    const whiteRook2 = chess.getPiece(7, 0);
    const blackRook1 = chess.getPiece(0, 7);
    const blackRook2 = chess.getPiece(7, 7);

    expect(whiteRook1.pieceType).toBe('rook');
    expect(whiteRook2.pieceType).toBe('rook');
    expect(whiteRook1.color).toBe('white');
    expect(whiteRook2.color).toBe('white');

    expect(blackRook1.pieceType).toBe('rook');
    expect(blackRook2.pieceType).toBe('rook');
    expect(blackRook1.color).toBe('black');
    expect(blackRook2.color).toBe('black');

    expect(
      arrayBoard.filter((piece) => piece && piece.pieceType === 'rook').length
    ).toBe(4);
  });

  describe('.getMovements()', () => {
    test('The rook can only move in straight lines', () => {
      const chess = new Chess();

      chess.cleanBoard();

      chess.addPiece(new Rook('white'), 4, 3);

      const movements = chess.getPieceMovements(4, 3);

      // Top
      expect(movements.find((m) => m.x === 4 && m.y === 4)).not.toBe(undefined);
      expect(movements.find((m) => m.x === 4 && m.y === 5)).not.toBe(undefined);
      expect(movements.find((m) => m.x === 4 && m.y === 6)).not.toBe(undefined);
      expect(movements.find((m) => m.x === 4 && m.y === 7)).not.toBe(undefined);

      // Bottom
      expect(movements.find((m) => m.x === 4 && m.y === 2)).not.toBe(undefined);
      expect(movements.find((m) => m.x === 4 && m.y === 1)).not.toBe(undefined);
      expect(movements.find((m) => m.x === 4 && m.y === 0)).not.toBe(undefined);

      // Left
      expect(movements.find((m) => m.x === 3 && m.y === 3)).not.toBe(undefined);
      expect(movements.find((m) => m.x === 2 && m.y === 3)).not.toBe(undefined);
      expect(movements.find((m) => m.x === 1 && m.y === 3)).not.toBe(undefined);
      expect(movements.find((m) => m.x === 0 && m.y === 3)).not.toBe(undefined);

      // Right
      expect(movements.find((m) => m.x === 5 && m.y === 3)).not.toBe(undefined);
      expect(movements.find((m) => m.x === 6 && m.y === 3)).not.toBe(undefined);
      expect(movements.find((m) => m.x === 7 && m.y === 3)).not.toBe(undefined);

      expect(movements.length).toBe(14);
    });

    test('The rook cannot overstep ally pieces', () => {
      const chess = new Chess();

      chess.cleanBoard();

      chess.addPiece(new Rook('white'), 4, 3);

      // Top
      chess.addPiece(new Doge('white'), 4, 7);

      // Bottom
      chess.addPiece(new Doge('white'), 4, 2);

      // Left
      chess.addPiece(new Doge('white'), 1, 3);

      // Right
      chess.addPiece(new Doge('white'), 7, 3);

      const movements = chess.getPieceMovements(4, 3);

      // Top
      expect(movements.find((m) => m.x === 4 && m.y === 4)).not.toBe(undefined);
      expect(movements.find((m) => m.x === 4 && m.y === 5)).not.toBe(undefined);
      expect(movements.find((m) => m.x === 4 && m.y === 6)).not.toBe(undefined);

      // Bottom (none)

      // Left
      expect(movements.find((m) => m.x === 3 && m.y === 3)).not.toBe(undefined);
      expect(movements.find((m) => m.x === 2 && m.y === 3)).not.toBe(undefined);

      // Right
      expect(movements.find((m) => m.x === 5 && m.y === 3)).not.toBe(undefined);
      expect(movements.find((m) => m.x === 6 && m.y === 3)).not.toBe(undefined);

      expect(movements.length).toBe(7);
    });

    test('The rook cannot overstep enemy pieces, only capture the first ones that cross it in each direction', () => {
      const chess = new Chess();

      chess.cleanBoard();

      chess.addPiece(new Rook('white'), 4, 3);

      // Top
      chess.addPiece(new Doge('black'), 4, 7);
      chess.addPiece(new Doge('black'), 4, 6);

      // Bottom
      chess.addPiece(new Doge('black'), 4, 2);
      chess.addPiece(new Doge('white'), 4, 1);

      // Left
      chess.addPiece(new Doge('white'), 2, 3);
      chess.addPiece(new Doge('black'), 1, 3);

      // Right
      chess.addPiece(new Doge('black'), 6, 3);
      chess.addPiece(new Doge('white'), 7, 3);

      const movements = chess.getPieceMovements(4, 3);

      // Top
      expect(movements.find((m) => m.x === 4 && m.y === 4)).not.toBe(undefined);
      expect(movements.find((m) => m.x === 4 && m.y === 5)).not.toBe(undefined);
      expect(movements.find((m) => m.x === 4 && m.y === 6)).not.toBe(undefined);

      // Bottom
      expect(movements.find((m) => m.x === 4 && m.y === 2)).not.toBe(undefined);

      // Left
      expect(movements.find((m) => m.x === 3 && m.y === 3)).not.toBe(undefined);

      // Right
      expect(movements.find((m) => m.x === 5 && m.y === 3)).not.toBe(undefined);
      expect(movements.find((m) => m.x === 6 && m.y === 3)).not.toBe(undefined);

      expect(movements.length).toBe(7);
    });
  });
});
