import Chess from '../chess';
import Piece from '../pieces/piece';
import King from '../pieces/king';
import Doge from '../pieces/doge';
import Pawn from '.././pieces/pawn';

describe('Chess suite', () => {
  describe('.whoPlays', () => {
    test('White should play first', () => {
      const chess = new Chess();

      expect(chess.whoPlays).toBe('white');
    });

    test('After the white pieces moves, the black pieces move', () => {
      const chess = new Chess();

      chess.move(0, 1, 0, 2);

      expect(chess.whoPlays).toBe('black');
    });
  });

  describe('.addPiece(pieceType, color, x, y)', () => {
    test(`It should be possible to add a piece in a valid position`, () => {
      const chess = new Chess();
      const piecesLength = chess.getPieces().length;

      expect(chess.hasPiece(4, 3)).toBe(false);

      chess.addPiece(new King('white'), 4, 3);

      expect(chess.hasPiece(4, 3)).toBe(true);

      const piece = chess.getPiece(4, 3);

      expect(piece.pieceType).toBe('king');
      expect(piece.color).toBe('white');
      expect(chess.getPieces().length).toBe(piecesLength + 1);
    });

    test(`It shouldn't be possible to add a piece in a invalid position`, () => {
      const chess = new Chess();

      const t = () => {
        chess.addPiece(new King('white'), 3, 1);
      };

      expect(t).toThrow(`There's already a piece in that position`);
    });
  });

  describe('.cleanBoard()', () => {
    test('cleanBoard just clears the board', () => {
      const chess = new Chess();

      chess.cleanBoard();

      expect(chess.getPieces().length).toBe(0);
    });
  });

  describe('.setBoard(callback)', () => {
    test('setBoard should allow to create a custom board', () => {
      const chess = new Chess();

      chess.setBoard((board) => {
        board[4][4] = new Pawn('white');
      });

      expect(chess.hasPiece(4, 4)).toBe(true);
      expect(chess.getPiece(4, 4).color).toBe('white');
      expect(chess.getPiece(4, 4).pieceType).toBe('pawn');
      expect(chess.getPieces().length).toBe(1);
    });
  });

  describe('.hasPiece(x, y)', () => {
    test(`It has to return true if there's a piece`, () => {
      const chess = new Chess();

      expect(chess.hasPiece(1, 1)).toBe(true);
    });

    test(`It has to return false if there's not a piece`, () => {
      const chess = new Chess();

      expect(chess.hasPiece(1, 3)).toBe(false);
    });
  });

  describe('.getPieceMovements(x, y)', () => {
    test('A piece cannot move to a position that has a piece with the same color', () => {
      const chess = new Chess();

      chess.cleanBoard();

      chess.addPiece(new King('white'), 4, 3);

      chess.addPiece(new Doge('white'), 3, 3);

      const movements = chess.getPieceMovements(4, 3);

      expect(movements.find((m) => m.x === 3 && m.y === 3)).toBe(undefined);
    });

    test('getPieceMovements() allows you to move only into a piece valid position', () => {
      const chess = new Chess();

      chess.cleanBoard();

      chess.addPiece(new King('white'), 4, 3);

      chess.addPiece(new Doge('black'), 4, 4);
      chess.addPiece(new Doge('black'), 3, 4);
      chess.addPiece(new Doge('black'), 3, 3);
      chess.addPiece(new Doge('black'), 3, 2);
      chess.addPiece(new Doge('black'), 4, 2);
      chess.addPiece(new Doge('black'), 5, 2);
      chess.addPiece(new Doge('black'), 5, 3);
      chess.addPiece(new Doge('black'), 5, 4);

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

    test('A piece cannot move out of the board', () => {
      const chess = new Chess();

      const movements = chess.getPieceMovements(1, 0);

      expect(movements.length).toBe(2);
      expect(movements.find((m) => m.x === 0 && m.y === 2)).not.toBe(undefined);
      expect(movements.find((m) => m.x === 2 && m.y === 2)).not.toBe(undefined);
    });
  });

  describe('.move(fromX, fromY, toX, toY)', () => {
    test('A piece cannot move out of the board', () => {
      const chess = new Chess();

      chess.cleanBoard();

      chess.addPiece(new King('white'), 4, 0);

      const t = () => {
        chess.move(4, 0, 4, -1);
      };

      expect(t).toThrow('Invalid movement');
    });

    test('A piece cannot capture another piece that has the same color', () => {
      const chess = new Chess();

      chess.cleanBoard();

      chess.addPiece(new Pawn('white'), 4, 3);
      chess.addPiece(new Pawn('white'), 5, 4);

      const t = () => {
        chess.move(4, 3, 5, 4);
      };

      expect(t).toThrow('Invalid movement');
    });
  });
});
