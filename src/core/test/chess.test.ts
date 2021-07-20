import Chess from '../chess';
import King from '../pieces/king';
import Doge from '../pieces/doge';
import Pawn from '.././pieces/pawn';
import Bishop from '../pieces/bishop';
import Queen from '../pieces/queen';
import Knight from '../pieces/knight';

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

  describe('.addPiece()', () => {
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

  describe('.removePiece()', () => {
    test('It should remove a piece effectly', () => {
      const chess = new Chess();

      expect(chess.hasPiece(0, 0)).toBe(true);

      chess.removePiece(0, 0);

      expect(chess.hasPiece(0, 0)).toBe(false);
    });
  });

  describe('.cleanBoard()', () => {
    test('cleanBoard just clears the board', () => {
      const chess = new Chess();

      chess.cleanBoard();

      expect(chess.getPieces().length).toBe(0);
    });
  });

  describe('.setBoard()', () => {
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

  describe('.hasPiece()', () => {
    test(`It has to return true if there's a piece`, () => {
      const chess = new Chess();

      expect(chess.hasPiece(1, 1)).toBe(true);
    });

    test(`It has to return false if there's not a piece`, () => {
      const chess = new Chess();

      expect(chess.hasPiece(1, 3)).toBe(false);
    });
  });

  describe('.isThereAllyPiece()', () => {
    test(`It has to return true if there's an ally piece`, () => {
      const chess = new Chess();

      const piece = chess.getPiece(0, 0);

      expect(chess.isThereAllyPiece(piece, 0, 1)).toBe(true);
    });

    test(`It has to return false if there's not an ally piece`, () => {
      const chess = new Chess();

      const piece = chess.getPiece(0, 0);

      expect(chess.isThereAllyPiece(piece, 0, 4)).toBe(false);
    });

    test(`It has to return false if there's an enemy piece`, () => {
      const chess = new Chess();

      const piece = chess.getPiece(0, 0);

      expect(chess.isThereAllyPiece(piece, 0, 7)).toBe(false);
    });
  });

  describe('.isCheckedPosition()', () => {
    test('It must return the correct result for white', () => {
      const chess = new Chess();

      chess.cleanBoard();

      chess.addPiece(new Bishop('white'), 3, 3);

      expect(chess.isCheckedPosition(2, 4, 'white')).toBe(true);
      expect(chess.isCheckedPosition(3, 4, 'white')).toBe(false);
      expect(chess.isCheckedPosition(4, 4, 'white')).toBe(true);
    });

    test('It must return the correct result for black', () => {
      const chess = new Chess();

      chess.cleanBoard();

      chess.addPiece(new Bishop('black'), 3, 3);

      expect(chess.isCheckedPosition(2, 4, 'black')).toBe(true);
      expect(chess.isCheckedPosition(3, 4, 'black')).toBe(false);
      expect(chess.isCheckedPosition(4, 4, 'black')).toBe(true);
    });

    it('King should be able to move', () => {
      const chess = new Chess();

      // Move pawns
      chess.move(4, 1, 4, 3);
      chess.move(4, 6, 4, 4);

      // King should be able to move
      chess.move(4, 0, 4, 1);

      expect(chess.hasPiece(4, 1)).toBe(true);
      expect(chess.getPiece(4, 1).pieceType).toBe('king');
    });
  });

  describe('.getPieceMovements()', () => {
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

  describe('.move()', () => {
    test('A piece cannot move out of the board', () => {
      const chess = new Chess();

      chess.cleanBoard();

      chess.addPiece(new King('white'), 4, 0);

      const t = () => {
        chess.move(4, 0, 4, -1);
      };

      expect(t).toThrow('Invalid movement');
    });

    test('A piece cannot move to a position that is not in its possible movements', () => {
      const chess = new Chess();

      const pieceMovements = chess.getPieceMovements(0, 1);

      // The piece cannot go to (0,4)
      expect(pieceMovements.find((m) => m.x === 0 && m.y === 4)).toBe(
        undefined
      );

      const t = () => {
        chess.move(0, 1, 0, 4);
      };

      expect(t).toThrow('Invalid movement');
    });

    test('A piece can move to a position that is in its possible movements', () => {
      const chess = new Chess();

      const pieceMovements = chess.getPieceMovements(0, 1);

      // The piece can go to (0,3)
      expect(pieceMovements.find((m) => m.x === 0 && m.y === 3)).not.toBe(
        undefined
      );

      chess.move(0, 1, 0, 3);

      expect(chess.hasPiece(0, 1)).toBe(false);
      expect(chess.hasPiece(0, 3)).toBe(true);
    });

    test('A white piece cannot move if black plays', () => {
      const chess = new Chess();

      chess.move(0, 1, 0, 2);

      const t = () => {
        chess.move(0, 2, 0, 3);
      };

      expect(t).toThrow('Invalid movement');
    });

    test('A black piece cannot move if white plays', () => {
      const chess = new Chess();

      const t = () => {
        chess.move(0, 6, 0, 5);
      };

      expect(t).toThrow('Invalid movement');
    });

    test('If a pawn goes to the last line, it will become into a queen', () => {
      const chess = new Chess();

      chess.cleanBoard();

      chess.addPiece(new Pawn('white'), 0, 6);

      chess.move(0, 6, 0, 7);

      expect(chess.getPiece(0, 7).pieceType).toBe('queen');
    });
  });

  describe('.copyBoard()', () => {
    test('Modifying the copy should not modify the original board', () => {
      const chess = new Chess();
      const copy = chess.copyBoard();

      expect(chess.getPiece(0, 0).pieceType).toBe('rook');
      expect(copy[0][0].pieceType).toBe('rook');

      copy[0][0] = null;

      expect(chess.getPiece(0, 0).pieceType).toBe('rook');
    });

    test('Copy should has the actual state of the chess', () => {
      const chess = new Chess();

      expect(chess.getPiece(0, 1).pieceType).toBe('pawn');

      chess.move(0, 1, 0, 3);

      const copy = chess.copyBoard();

      expect(copy[0][3].pieceType).toBe('pawn');
    });

    test('Moving a piece in diagonal in the original board should not affect the copy', () => {
      const chess = new Chess();
      const copy = chess.copyBoard();

      chess.move(1, 0, 0, 2);

      expect(copy[1][0].pieceType).toBe('knight');
      expect(copy[0][2]).toBe(null);
    });
  });

  describe('.getKingPosition', () => {
    test('Should return the correct position for white', () => {
      const chess = new Chess();

      expect(chess.getKingPosition('white')).toEqual({
        x: 4,
        y: 0,
      });
    });

    test('Should return the correct position for black', () => {
      const chess = new Chess();

      expect(chess.getKingPosition('black')).toEqual({
        x: 4,
        y: 7,
      });
    });
  });

  describe('Checkmate', () => {
    test('Basic checkmate', () => {
      // Mock the finish game callback
      const onFinish = jest.fn();
      const chess = new Chess(onFinish);

      chess.cleanBoard();

      chess.addPiece(new King('black'), 3, 7);

      chess.addPiece(new King('white'), 3, 5);
      chess.addPiece(new Queen('white'), 7, 6);

      // Move the queen and checkmate
      console.log('hola');
      chess.move(7, 6, 3, 6);

      // The onFinish chess function should be called once
      expect(onFinish.mock.calls.length).toBe(1);

      // The returned value of the onFinish must be equal to:
      expect(onFinish.mock.calls[0][0]).toEqual({
        winner: 'white', // White wins
        draw: false, // It is not draw
      });
    });

    test('Discovered checkmate', () => {
      // Mock the finish game callback
      const onFinish = jest.fn();
      const chess = new Chess(onFinish);

      chess.cleanBoard();

      chess.addPiece(new King('black'), 0, 0);

      chess.addPiece(new Queen('white'), 0, 2);
      chess.addPiece(new King('white'), 1, 2);
      chess.addPiece(new Knight('white'), 2, 2);
      chess.addPiece(new Bishop('white'), 0, 1);

      // Move the bishop and make a discovered checkmate with the queen
      chess.move(0, 1, 1, 0);

      // The onFinish chess function should be called once
      expect(onFinish.mock.calls.length).toBe(1);

      // The returned value of the onFinish must be equal to:
      expect(onFinish.mock.calls[0][0]).toEqual({
        winner: 'white', // White wins
        draw: false, // It is not draw
      });
    });
  });

  describe('Draw', () => {
    test('Draw case 1', () => {
      // Mock the finish game callback
      const onFinish = jest.fn();
      const chess = new Chess(onFinish);

      chess.cleanBoard();

      chess.addPiece(new Pawn('black'), 0, 1);
      chess.addPiece(new King('black'), 0, 3);

      // The white king is cornered
      chess.addPiece(new King('white'), 0, 0);

      chess.turnNumber++; // Pass the turn so the black can play

      // Move the black king and drown the white king
      chess.move(0, 3, 0, 2);

      // The onFinish chess function should be called once
      expect(onFinish.mock.calls.length).toBe(1);

      // The returned value of the onFinish must be equal to:
      expect(onFinish.mock.calls[0][0]).toEqual({
        winner: null, // There is no winner
        draw: true, // It is draw
      });
    });

    test('Draw case 2', () => {
      // Mock the finish game callback
      const onFinish = jest.fn();
      const chess = new Chess(onFinish);

      chess.cleanBoard();

      chess.addPiece(new Pawn('black'), 0, 1);
      chess.addPiece(new King('black'), 0, 3);

      // The white king is cornered
      chess.addPiece(new King('white'), 0, 0);

      // Add some pieces paralyzed out there
      chess.addPiece(new Pawn('black'), 7, 4);
      chess.addPiece(new Pawn('white'), 7, 3);

      chess.turnNumber++; // Pass the turn so the black can play

      // Move the black king and drown the white king
      chess.move(0, 3, 0, 2);

      // The onFinish chess function should be called once
      expect(onFinish.mock.calls.length).toBe(1);

      // The returned value of the onFinish must be equal to:
      expect(onFinish.mock.calls[0][0]).toEqual({
        winner: null, // There is no winner
        draw: true, // It is draw
      });
    });
  });
});
