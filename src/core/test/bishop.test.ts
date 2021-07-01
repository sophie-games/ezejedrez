import Chess from '../chess';
import Bishop from '../pieces/bishop';
import Doge from '../pieces/doge';

describe('Bishop suite', () => {
  test('Bishops should be in its correct place', () => {
    const chess = new Chess();
    const arrayBoard = chess.getBoardAsArray();
    const whiteBishop1 = chess.getPiece(2, 0);
    const whiteBishop2 = chess.getPiece(5, 0);
    const blackBishop1 = chess.getPiece(2, 7);
    const blackBishop2 = chess.getPiece(5, 7);

    expect(whiteBishop1.pieceType).toBe('bishop');
    expect(whiteBishop2.pieceType).toBe('bishop');
    expect(whiteBishop1.color).toBe('white');
    expect(whiteBishop2.color).toBe('white');

    expect(blackBishop1.pieceType).toBe('bishop');
    expect(blackBishop2.pieceType).toBe('bishop');
    expect(blackBishop1.color).toBe('black');
    expect(blackBishop2.color).toBe('black');

    expect(
      arrayBoard.filter((piece) => piece && piece.pieceType === 'bishop')
        .length,
    ).toBe(4);
  });

  describe('.getMovements(x,y)', () => {
    test('The bishop can only move diagonally forward or backward', () => {
      const chess = new Chess();

      chess.cleanBoard();

      chess.addPiece(new Bishop('white'), 4, 3);

      const movements = chess.getPieceMovements(4, 3);

      // Forward top left
      expect(movements.find((m) => m.x === 3 && m.y === 4)).not.toBe(undefined);
      expect(movements.find((m) => m.x === 2 && m.y === 5)).not.toBe(undefined);
      expect(movements.find((m) => m.x === 1 && m.y === 6)).not.toBe(undefined);
      expect(movements.find((m) => m.x === 0 && m.y === 7)).not.toBe(undefined);

      // Forward top right
      expect(movements.find((m) => m.x === 5 && m.y === 4)).not.toBe(undefined);
      expect(movements.find((m) => m.x === 6 && m.y === 5)).not.toBe(undefined);
      expect(movements.find((m) => m.x === 7 && m.y === 6)).not.toBe(undefined);

      // Backward bottom left
      expect(movements.find((m) => m.x === 3 && m.y === 2)).not.toBe(undefined);
      expect(movements.find((m) => m.x === 2 && m.y === 1)).not.toBe(undefined);
      expect(movements.find((m) => m.x === 1 && m.y === 0)).not.toBe(undefined);

      // Backward bottom right
      expect(movements.find((m) => m.x === 5 && m.y === 2)).not.toBe(undefined);
      expect(movements.find((m) => m.x === 6 && m.y === 1)).not.toBe(undefined);
      expect(movements.find((m) => m.x === 7 && m.y === 0)).not.toBe(undefined);

      expect(movements.length).toBe(13);
    });

    test('The bishop cannot overstep ally pieces', () => {
      const chess = new Chess();

      chess.cleanBoard();

      chess.addPiece(new Bishop('white'), 4, 3);

      // Forward top left
      chess.addPiece(new Doge('white'), 2, 5);

      // Forward top right
      chess.addPiece(new Doge('white'), 6, 5);

      // Backward bottom left
      chess.addPiece(new Doge('white'), 2, 1);

      // Backward bottom right
      chess.addPiece(new Doge('white'), 6, 1);

      const movements = chess.getPieceMovements(4, 3);

      // Forward top left
      expect(movements.find((m) => m.x === 3 && m.y === 4)).not.toBe(undefined);

      // Forward top right
      expect(movements.find((m) => m.x === 5 && m.y === 4)).not.toBe(undefined);

      // Backward bottom left
      expect(movements.find((m) => m.x === 3 && m.y === 2)).not.toBe(undefined);

      // Backward bottom right
      expect(movements.find((m) => m.x === 5 && m.y === 2)).not.toBe(undefined);

      expect(movements.length).toBe(4);
    });

    test('The bishop cannot overstep enemy pieces, only capture the first ones that cross it in each direction', () => {
      const chess = new Chess();

      chess.cleanBoard();

      chess.addPiece(new Bishop('white'), 4, 3);

      // Forward top left
      chess.addPiece(new Doge('black'), 1, 6);
      chess.addPiece(new Doge('black'), 2, 5);

      // Forward top right
      chess.addPiece(new Doge('black'), 7, 6);
      chess.addPiece(new Doge('black'), 6, 5);

      // Backward bottom left
      chess.addPiece(new Doge('black'), 1, 0);
      chess.addPiece(new Doge('white'), 2, 1);

      // Backward bottom right
      chess.addPiece(new Doge('black'), 7, 0);
      chess.addPiece(new Doge('black'), 6, 1);

      const movements = chess.getPieceMovements(4, 3);

      // Forward top left
      expect(movements.find((m) => m.x === 3 && m.y === 4)).not.toBe(undefined);
      expect(movements.find((m) => m.x === 2 && m.y === 5)).not.toBe(undefined);

      // Forward top right
      expect(movements.find((m) => m.x === 5 && m.y === 4)).not.toBe(undefined);
      expect(movements.find((m) => m.x === 6 && m.y === 5)).not.toBe(undefined);

      // Backward bottom left
      expect(movements.find((m) => m.x === 3 && m.y === 2)).not.toBe(undefined);

      // Backward bottom right
      expect(movements.find((m) => m.x === 5 && m.y === 2)).not.toBe(undefined);
      expect(movements.find((m) => m.x === 6 && m.y === 1)).not.toBe(undefined);

      expect(movements.length).toBe(7);
    });
  });
});
