import Chess from '../chess';

describe('Chess', () => {
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
      arrayBoard.filter((piece) => piece.pieceType === 'pawn').length,
    ).toBe(16);
  });

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
      arrayBoard.filter((piece) => piece.pieceType === 'king').length,
    ).toBe(2);
  });

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

      chess.addPiece('king', 'white', 4, 3);

      expect(chess.hasPiece(4, 3)).toBe(true);

      const piece = chess.getPiece(4, 3);

      expect(piece.pieceType).toBe('king');
      expect(piece.color).toBe('white');
      expect(chess.getPieces().length).toBe(piecesLength + 1);
    });

    test(`It shouldn't be possible to add a piece in a invalid position`, () => {
      const chess = new Chess();

      const t = () => {
        chess.addPiece('king', 'white', 3, 1);
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
        board[4][4] = {
          pieceType: 'pawn',
          color: 'white',
        };
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

    test('A piece cannot move to a position that has a piece with the same color', () => {
      const chess = new Chess();

      chess.cleanBoard();

      chess.addPiece('king', 'white', 4, 3);

      chess.addPiece('doge', 'white', 3, 3);

      const movements = chess.getPieceMovements(4, 3);

      expect(movements.find((m) => m.x === 3 && m.y === 3)).toBe(undefined);
    });

    test('getPieceMovements() allows you to move only into a piece valid position', () => {
      const chess = new Chess();

      chess.cleanBoard();

      chess.addPiece('king', 'white', 4, 3);

      chess.addPiece('doge', 'black', 4, 4);
      chess.addPiece('doge', 'black', 3, 4);
      chess.addPiece('doge', 'black', 3, 3);
      chess.addPiece('doge', 'black', 3, 2);
      chess.addPiece('doge', 'black', 4, 2);
      chess.addPiece('doge', 'black', 5, 2);
      chess.addPiece('doge', 'black', 5, 3);
      chess.addPiece('doge', 'black', 5, 4);

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

  describe('.move(fromX, fromY, toX, toY)', () => {
    // Pawns moves
    test('White pawn cannot move to an invalid position', () => {
      const chess = new Chess();

      const t = () => {
        chess.move(0, 1, 1, 2);
      };

      expect(t).toThrow('Invalid movement');
    });

    test('White pawn can move to a valid position', () => {
      const chess = new Chess();

      chess.move(0, 1, 0, 2);

      expect(chess.hasPiece(0, 2)).toBe(true);
      expect(chess.hasPiece(0, 1)).toBe(false);
    });

    test('White pawn can move to a valid position 2', () => {
      const chess = new Chess();

      chess.move(1, 1, 1, 2);

      expect(chess.hasPiece(1, 2)).toBe(true);
      expect(chess.hasPiece(1, 1)).toBe(false);
    });

    test('White pawn can move 2 squares at the begining', () => {
      const chess = new Chess();

      chess.move(0, 1, 0, 3);

      expect(chess.hasPiece(0, 3)).toBe(true);
      expect(chess.hasPiece(0, 1)).toBe(false);
    });

    test('White pawn can move 2 squares at the begining 2', () => {
      const chess = new Chess();

      chess.move(5, 1, 5, 3);

      expect(chess.hasPiece(5, 3)).toBe(true);
      expect(chess.hasPiece(5, 1)).toBe(false);
    });

    test('White pawn cannot move 2 squares if Y != 1', () => {
      const chess = new Chess();

      chess.addPiece('pawn', 'white', 4, 2);

      const t = () => {
        chess.move(4, 2, 4, 4);
      };

      expect(t).toThrow('Invalid movement');
    });

    test('Black pawn cannot move 2 squares if Y != 6', () => {
      const chess = new Chess();

      chess.move(7, 1, 7, 2);
      chess.addPiece('pawn', 'black', 4, 5);

      const t = () => {
        chess.move(4, 5, 4, 3);
      };

      expect(t).toThrow('Invalid movement');
    });

    test('White pawn can only capture diagonally forward one square to the left or right', () => {
      const chess = new Chess();

      chess.addPiece('pawn', 'white', 3, 3);
      chess.addPiece('pawn', 'black', 4, 4);

      chess.move(3, 3, 4, 4);

      const arrayBoard = chess.getBoardAsArray();

      expect(chess.hasPiece(4, 4)).toBe(true);
      expect(chess.getPiece(4, 4).color).toBe('white');

      expect(
        arrayBoard.filter(
          (piece) => piece.pieceType === 'pawn' && piece.color === 'black',
        ).length,
      ).toBe(8);

      expect(
        arrayBoard.filter(
          (piece) => piece.pieceType === 'pawn' && piece.color === 'white',
        ).length,
      ).toBe(9);
    });

    test('Black pawn can only capture diagonally forward one square to the left or right', () => {
      const chess = new Chess();

      chess.addPiece('pawn', 'black', 4, 4);
      chess.addPiece('pawn', 'white', 3, 3);

      chess.move(4, 4, 3, 3);

      const arrayBoard = chess.getBoardAsArray();

      expect(chess.hasPiece(3, 3)).toBe(true);
      expect(chess.getPiece(3, 3).color).toBe('black');

      expect(
        arrayBoard.filter(
          (piece) => piece.pieceType === 'pawn' && piece.color === 'black',
        ).length,
      ).toBe(9);

      expect(
        arrayBoard.filter(
          (piece) => piece.pieceType === 'pawn' && piece.color === 'white',
        ).length,
      ).toBe(8);
    });

    test('White pawn cannot move if it has a piece in front of it', () => {
      const chess = new Chess();

      chess.addPiece('pawn', 'white', 3, 3);
      expect(chess.hasPiece(3, 3)).toBe(true);

      chess.addPiece('pawn', 'black', 3, 4);
      expect(chess.hasPiece(3, 4)).toBe(true);

      const t = () => {
        chess.move(3, 3, 3, 4);
      };

      expect(t).toThrow('Invalid movement');
    });

    test('Black pawn cannot move if it has a piece in front of it', () => {
      const chess = new Chess();

      chess.addPiece('pawn', 'white', 3, 3);
      expect(chess.hasPiece(3, 3)).toBe(true);

      chess.addPiece('pawn', 'black', 3, 4);
      expect(chess.hasPiece(3, 4)).toBe(true);

      chess.move(7, 1, 7, 2);

      const t = () => {
        chess.move(3, 4, 3, 3);
      };

      expect(t).toThrow('Invalid movement');
    });

    test('A white pawn cannot overstep a piece', () => {
      const chess = new Chess();

      chess.addPiece('pawn', 'white', 3, 2);

      const t = () => {
        chess.move(3, 1, 3, 3);
      };

      expect(t).toThrow('Invalid movement');
    });

    test('A black pawn cannot overstep a piece', () => {
      const chess = new Chess();

      chess.move(7, 1, 7, 2);

      chess.addPiece('pawn', 'black', 3, 5);

      const t = () => {
        chess.move(3, 6, 3, 4);
      };

      expect(t).toThrow('Invalid movement');
    });

    // Kings moves
    test('The king can only move to a valid position', () => {
      const chess = new Chess();

      chess.cleanBoard();

      chess.addPiece('king', 'white', 4, 3);

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

      chess.cleanBoard();

      chess.addPiece('king', 'white', 4, 0);

      const t = () => {
        chess.move(4, 0, 4, -1);
      };

      expect(t).toThrow('Invalid movement');
    });

    test('A piece cannot capture another piece that has the same color', () => {
      const chess = new Chess();

      chess.cleanBoard();

      chess.addPiece('pawn', 'white', 4, 3);
      chess.addPiece('pawn', 'white', 5, 4);

      const t = () => {
        chess.move(4, 3, 5, 4);
      };

      expect(t).toThrow('Invalid movement');
    });
  });
});
