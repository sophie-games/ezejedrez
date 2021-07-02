import Chess from "../chess";
import Queen from "../pieces/queen";
import Doge from "../pieces/doge";

describe("Queen suite", () => {
  test("TODO: Queen should be in its correct place", () => {
    const chess = new Chess();
    const arrayBoard = chess.getBoardAsArray();
    const whiteQueen = chess.getPiece(3, 0);
    const blackQueen = chess.getPiece(3, 7);

    expect(whiteQueen.pieceType).toBe("queen");
    expect(whiteQueen.color).toBe("white");

    expect(blackQueen.pieceType).toBe("queen");
    expect(blackQueen.color).toBe("black");

    expect(
      arrayBoard.filter((piece) => piece && piece.pieceType === "queen").length
    ).toBe(2);
  });

  describe(".getMovements(x,y)", () => {
    test("The queen can be moved any number of unoccupied squares in a straight line vertically, horizontally, or diagonally", () => {
      const chess = new Chess();

      chess.cleanBoard();

      chess.addPiece(new Queen("white"), 4, 3);

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

      expect(movements.length).toBe(27);
    });

    test("The Queen cannot overstep ally pieces", () => {
      const chess = new Chess();

      chess.cleanBoard();

      chess.addPiece(new Queen("white"), 4, 3);

      // Top
      chess.addPiece(new Doge("white"), 4, 7);

      // Bottom
      chess.addPiece(new Doge("white"), 4, 1);

      // Left
      chess.addPiece(new Doge("white"), 1, 3);

      // Right
      chess.addPiece(new Doge("white"), 7, 3);

      // Forward top left
      chess.addPiece(new Doge("white"), 2, 5);

      // Forward top right
      chess.addPiece(new Doge("white"), 6, 5);

      // Backward bottom left
      chess.addPiece(new Doge("white"), 2, 1);

      // Backward bottom right
      chess.addPiece(new Doge("white"), 6, 1);

      const movements = chess.getPieceMovements(4, 3);

      // Top
      expect(movements.find((m) => m.x === 4 && m.y === 4)).not.toBe(undefined);
      expect(movements.find((m) => m.x === 4 && m.y === 5)).not.toBe(undefined);
      expect(movements.find((m) => m.x === 4 && m.y === 6)).not.toBe(undefined);

      // Bottom
      expect(movements.find((m) => m.x === 4 && m.y === 2)).not.toBe(undefined);

      // Left
      expect(movements.find((m) => m.x === 3 && m.y === 3)).not.toBe(undefined);
      expect(movements.find((m) => m.x === 2 && m.y === 3)).not.toBe(undefined);

      // Right
      expect(movements.find((m) => m.x === 5 && m.y === 3)).not.toBe(undefined);
      expect(movements.find((m) => m.x === 6 && m.y === 3)).not.toBe(undefined);

      // Forward top left
      expect(movements.find((m) => m.x === 3 && m.y === 4)).not.toBe(undefined);

      // Forward top right
      expect(movements.find((m) => m.x === 5 && m.y === 4)).not.toBe(undefined);

      // Backward bottom left
      expect(movements.find((m) => m.x === 3 && m.y === 2)).not.toBe(undefined);

      // Backward bottom right
      expect(movements.find((m) => m.x === 5 && m.y === 2)).not.toBe(undefined);

      expect(movements.length).toBe(12);
    });

    test("The Queen cannot overstep enemy pieces, only capture the first ones that cross it in each direction", () => {
      const chess = new Chess();

      chess.cleanBoard();

      chess.addPiece(new Queen("white"), 4, 3);

      // Top
      chess.addPiece(new Doge("black"), 4, 7);
      chess.addPiece(new Doge("black"), 4, 6);

      // Bottom
      chess.addPiece(new Doge("black"), 4, 2);
      chess.addPiece(new Doge("white"), 4, 1);

      // Left
      chess.addPiece(new Doge("white"), 2, 3);
      chess.addPiece(new Doge("black"), 1, 3);

      // Right
      chess.addPiece(new Doge("black"), 6, 3);
      chess.addPiece(new Doge("white"), 7, 3);

      // Forward top left
      chess.addPiece(new Doge("black"), 1, 6);
      chess.addPiece(new Doge("black"), 2, 5);

      // Forward top right
      chess.addPiece(new Doge("black"), 7, 6);
      chess.addPiece(new Doge("black"), 6, 5);

      // Backward bottom left
      chess.addPiece(new Doge("black"), 1, 0);
      chess.addPiece(new Doge("white"), 2, 1);

      // Backward bottom right
      chess.addPiece(new Doge("black"), 7, 0);
      chess.addPiece(new Doge("black"), 6, 1);

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

      expect(movements.length).toBe(14);
    });
  });
});
