import Chess from '../chess';
import King from '../pieces/king';
import Bishop from '../pieces/bishop';
import Pawn from '../pieces/pawn';
import Rook from '../pieces/rook';

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

  describe('.getMovements()', () => {
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

    test('King cannot be moved to cheked positions', () => {
      const chess = new Chess();

      chess.cleanBoard();

      chess.addPiece(new King('white'), 4, 3);
      chess.addPiece(new Bishop('black'), 3, 5);

      const movements = chess.getPieceMovements(4, 3);

      expect(movements.find((m) => m.x === 4 && m.y === 4)).toBe(undefined);
      expect(movements.find((m) => m.x === 5 && m.y === 3)).toBe(undefined);
    });
  });

  test('King cannot be moved to an enemy pawn checked position', () => {
    const chess = new Chess();

    chess.cleanBoard();

    chess.addPiece(new King('white'), 4, 3);
    chess.addPiece(new Pawn('black'), 3, 5);

    const movements = chess.getPieceMovements(4, 3);

    expect(movements.find((m) => m.x === 4 && m.y === 4)).toBe(undefined);
  });

  test('King cannot capture a pawn defended by an other enemy pawn', () => {
    const chess = new Chess();

    chess.cleanBoard();

    chess.addPiece(new King('white'), 4, 3);
    chess.addPiece(new Pawn('black'), 4, 4);

    // Defender
    chess.addPiece(new Pawn('black'), 3, 5);

    const movements = chess.getPieceMovements(4, 3);

    expect(movements.find((m) => m.x === 4 && m.y === 4)).toBe(undefined);
  });

  test('King cannot be moved beside of the enemy king', () => {
    const chess = new Chess();

    chess.cleanBoard();

    chess.addPiece(new King('white'), 4, 4);
    chess.addPiece(new King('black'), 4, 6);

    const movements = chess.getPieceMovements(4, 4);

    expect(movements.find((m) => m.x === 4 && m.y === 5)).toBe(undefined);
  });

  test('King cannot capture a pawn defended by the enemy king', () => {
    const chess = new Chess();

    chess.cleanBoard();

    chess.addPiece(new King('white'), 4, 4);
    chess.addPiece(new Pawn('black'), 4, 5);
    chess.addPiece(new King('black'), 4, 6);

    const movements = chess.getPieceMovements(4, 4);

    expect(movements.find((m) => m.x === 4 && m.y === 5)).toBe(undefined);
  });

  test('A player cannot move a piece if, doing this, let his king checked', () => {
    const chess = new Chess();

    chess.cleanBoard();

    chess.addPiece(new King('white'), 4, 3);
    chess.addPiece(new Bishop('black'), 1, 6);

    // This pawn is covering the king from the bishop,
    // so it cannot move
    chess.addPiece(new Pawn('white'), 3, 4);

    const movements = chess.getPieceMovements(3, 4);

    // The pawn cannot advance because it will let the king unprotected
    expect(movements.find((m) => m.x === 3 && m.y === 5)).toBe(undefined);
  });

  test('A player cannot move a piece if, doing this, let his king checked 2', () => {
    const chess = new Chess();

    chess.cleanBoard();

    chess.addPiece(new King('white'), 4, 3);
    chess.addPiece(new Bishop('black'), 1, 6);

    // This rook is covering the king from the bishop,
    // so it cannot move
    chess.addPiece(new Rook('white'), 3, 4);

    const movements = chess.getPieceMovements(3, 4);

    // The rook cannot advance because it will let the king unprotected
    expect(movements.find((m) => m.x === 3 && m.y === 5)).toBe(undefined);
  });

  describe('Castling', () => {
    test('Short castling white', () => {
      const chess = new Chess();

      // We remove the bishop and the knight
      // so the king can castle
      chess.removePiece(5, 0);
      chess.removePiece(6, 0);

      const movements = chess.getPieceMovements(4, 0);

      // The king will be able to castle to (6,0)
      expect(movements.find((m) => m.x === 6 && m.y === 0)).not.toBe(undefined);

      chess.move(4, 0, 6, 0);

      // At (6,0) should be the king now, and at (5,0) the rook
      expect(chess.getPiece(6, 0).pieceType).toBe('king');
      expect(chess.getPiece(5, 0).pieceType).toBe('rook');

      // At (7,0), where it was the rook, there should be no pieces now
      expect(chess.hasPiece(7, 0)).toBe(false);
    });

    test('Long castling white', () => {
      const chess = new Chess();

      // We remove the queen, the bishop and the knight
      // so the king can castle
      chess.removePiece(3, 0);
      chess.removePiece(2, 0);
      chess.removePiece(1, 0);

      const movements = chess.getPieceMovements(4, 0);

      // The king will be able to castle to (2,0)
      expect(movements.find((m) => m.x === 2 && m.y === 0)).not.toBe(undefined);

      chess.move(4, 0, 2, 0);

      // At (2,0) should be the king now, and at (3,0) the rook
      expect(chess.getPiece(2, 0).pieceType).toBe('king');
      expect(chess.getPiece(3, 0).pieceType).toBe('rook');

      // At (0,0), where it was the rook, there should be no pieces now
      expect(chess.hasPiece(0, 0)).toBe(false);
    });

    test('Short castling black', () => {
      const chess = new Chess();

      // Pass the turn so the black can play now
      chess.turnNumber++;

      // We remove the bishop and the knight
      // so the king can castle
      chess.removePiece(5, 7);
      chess.removePiece(6, 7);

      const movements = chess.getPieceMovements(4, 7);

      // The king will be able to castle to (6,7)
      expect(movements.find((m) => m.x === 6 && m.y === 7)).not.toBe(undefined);

      chess.move(4, 7, 6, 7);

      // At (6,7) should be the king now, and at (5,7) the rook
      expect(chess.getPiece(6, 7).pieceType).toBe('king');
      expect(chess.getPiece(5, 7).pieceType).toBe('rook');

      // At (7,7), where it was the rook, there should be no pieces now
      expect(chess.hasPiece(7, 7)).toBe(false);
    });

    test('Long castling black', () => {
      const chess = new Chess();

      // Pass the turn so the black can play now
      chess.turnNumber++;

      // We remove the queen, the bishop and the knight
      // so the king can castle
      chess.removePiece(3, 7);
      chess.removePiece(2, 7);
      chess.removePiece(1, 7);

      const movements = chess.getPieceMovements(4, 7);

      // The king will be able to castle to (2,7)
      expect(movements.find((m) => m.x === 2 && m.y === 7)).not.toBe(undefined);

      chess.move(4, 7, 2, 7);

      // At (2,7) should be the king now, and at (3,7) the rook
      expect(chess.getPiece(2, 7).pieceType).toBe('king');
      expect(chess.getPiece(3, 7).pieceType).toBe('rook');

      // At (0,7), where it was the rook, there should be no pieces now
      expect(chess.hasPiece(0, 7)).toBe(false);
    });

    /*
      ----- Some cases that the player cannot make a castle -----
    */
    test('You cannot castle if the king has already moved', () => {
      const chess = new Chess();

      // We remove the bishop and the knight
      // so the king be able to castle
      chess.removePiece(5, 0);
      chess.removePiece(6, 0);

      // Move the king
      chess.move(4, 0, 5, 0);
      chess.turnNumber++; // Pass the turn so the player can play again
      chess.move(5, 0, 4, 0); // The king returns to the original position
      chess.turnNumber++; // Pass the turn so the player can play again

      const movements = chess.getPieceMovements(4, 0);

      // The king will not be able to castle
      expect(movements.find((m) => m.x === 6 && m.y === 0)).toBe(undefined);
    });

    test('You cannot castle if the rook has already moved', () => {
      const chess = new Chess();

      // We remove the bishop and the knight
      // so the king be able to castle
      chess.removePiece(5, 0);
      chess.removePiece(6, 0);

      // Move the rook
      chess.move(7, 0, 6, 0);
      chess.turnNumber++; // Pass the turn so the player can play again
      chess.move(6, 0, 7, 0); // The rook returns to the original position
      chess.turnNumber++; // Pass the turn so the player can play again

      const movements = chess.getPieceMovements(4, 0);

      // The king will not be able to castle
      expect(movements.find((m) => m.x === 6 && m.y === 0)).toBe(undefined);
    });

    test('You cannot castle if you are in check', () => {
      const chess = new Chess();

      // We remove the bishop and the knight
      // so the king be able to castle
      chess.removePiece(5, 0);
      chess.removePiece(6, 0);

      // Remove the king pawn
      chess.removePiece(4, 1);

      // This rook is checking the king
      chess.addPiece(new Rook('black'), 4, 3);

      const movements = chess.getPieceMovements(4, 0);

      // The king will not be able to castle
      expect(movements.find((m) => m.x === 6 && m.y === 0)).toBe(undefined);
    });

    test('You cannot castle with a rook that is under attack', () => {
      const chess = new Chess();

      // We remove the bishop and the knight
      // so the king be able to castle
      chess.removePiece(5, 0);
      chess.removePiece(6, 0);

      // Remove the rook pawn
      chess.removePiece(7, 1);

      // This rook is attacking the rook that we want to castle
      chess.addPiece(new Rook('black'), 7, 3);

      const movements = chess.getPieceMovements(4, 0);

      // The king will not be able to castle
      expect(movements.find((m) => m.x === 6 && m.y === 0)).toBe(undefined);
    });

    test('You cannot castle if any of the squares between the king and the rook is under attack case 1', () => {
      const chess = new Chess();

      // We remove the bishop and the knight
      // so the king be able to castle
      chess.removePiece(5, 0);
      chess.removePiece(6, 0);

      // Remove the defender pawn
      chess.removePiece(6, 1);

      // This rook is attacking the square
      chess.addPiece(new Rook('black'), 6, 3);

      const movements = chess.getPieceMovements(4, 0);

      // The king will not be able to castle
      expect(movements.find((m) => m.x === 6 && m.y === 0)).toBe(undefined);
    });

    test('You cannot castle if any of the squares between the king and the rook is under attack case 2', () => {
      const chess = new Chess();

      // We remove the queen, the bishop and the knight
      // so the king be able to castle
      chess.removePiece(3, 0);
      chess.removePiece(2, 0);
      chess.removePiece(1, 0);

      // Remove the queen pawn
      chess.removePiece(3, 1);

      // This rook is attacking the pawn
      chess.addPiece(new Rook('black'), 3, 3);

      const movements = chess.getPieceMovements(4, 0);

      // The king will not be able to castle
      expect(movements.find((m) => m.x === 2 && m.y === 0)).toBe(undefined);
    });
  });
});
