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

  // test('King cannot capture a pawn defended by an other enemy pawn', () => {
  //   const chess = new Chess();

  //   chess.cleanBoard();

  //   chess.addPiece(new King('white'), 4, 3);
  //   chess.addPiece(new Pawn('black'), 4, 4);

  //   // Defender
  //   chess.addPiece(new Pawn('black'), 3, 5);

  //   const movements = chess.getPieceMovements(4, 3);

  //   expect(movements.find((m) => m.x === 4 && m.y === 4)).toBe(undefined);
  // });

  // test('King cannot be moved beside of the enemy king', () => {
  //   const chess = new Chess();

  //   chess.cleanBoard();

  //   chess.addPiece(new King('white'), 4, 4);
  //   chess.addPiece(new King('black'), 4, 6);

  //   const movements = chess.getPieceMovements(4, 4);

  //   expect(movements.find((m) => m.x === 4 && m.y === 5)).toBe(undefined);
  // });

  // test('King cannot capture a pawn defended by the enemy king', () => {
  //   const chess = new Chess();

  //   chess.cleanBoard();

  //   chess.addPiece(new King('white'), 4, 4);
  //   chess.addPiece(new Pawn('black'), 4, 5);
  //   chess.addPiece(new King('black'), 4, 6);

  //   const movements = chess.getPieceMovements(4, 4);

  //   expect(movements.find((m) => m.x === 4 && m.y === 5)).toBe(undefined);
  // });

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
});
