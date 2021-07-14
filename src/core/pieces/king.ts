import Piece from './piece';
import Chess from './../chess';
import Movement from './../movement';
export default class King extends Piece {
  constructor(color: string) {
    // code smell
    super('king', color);
  }

  protected __getMoveMovements(
    x: number,
    y: number,
    chess: Chess,
    board: Piece[][],
  ) {
    const movements: Movement[] = [];
    const player = chess.getPlayer(this.color);

    const kingPossibleMovs = [
      { x: x, y: y + 1 },
      { x: x - 1, y: y + 1 },
      { x: x - 1, y: y },
      { x: x - 1, y: y - 1 },
      { x: x, y: y - 1 },
      { x: x + 1, y: y - 1 },
      { x: x + 1, y: y },
      { x: x + 1, y: y + 1 },
    ];

    kingPossibleMovs.forEach((possibleMov) => {
      const isChecked = chess.isCheckedPosition(
        possibleMov.x,
        possibleMov.y,
        player.enemyColor,
        board,
      );

      if (!isChecked) {
        this.__addIfValidMovement(
          possibleMov.x,
          possibleMov.y,
          movements,
          chess,
          board,
        );
      }
    });

    return movements.filter((possibleMov) => {
      const copy = chess.copyBoard();

      // Simulates the movement of the possibleMov in the copy.
      copy[possibleMov.x][possibleMov.y] = copy[x][y];
      copy[x][y] = null;

      const isChecked = chess.isCheckedPosition(
        possibleMov.x,
        possibleMov.y,
        player.enemyColor,
        copy,
      );

      return !isChecked;
    });
  }

  protected __getCaptureMovements(
    x: number,
    y: number,
    chess: Chess,
    board: Piece[][],
  ) {
    const movements: Movement[] = [];
    const pieceThatCaptures = this;
    const player = chess.getPlayer(this.color);

    const kingPossibleCaptures = [
      { x: x, y: y + 1 },
      { x: x - 1, y: y + 1 },
      { x: x - 1, y: y },
      { x: x - 1, y: y - 1 },
      { x: x, y: y - 1 },
      { x: x + 1, y: y - 1 },
      { x: x + 1, y: y },
      { x: x + 1, y: y + 1 },
    ];

    kingPossibleCaptures.forEach((possibleCapture) => {
      const isChecked = chess.isCheckedPosition(
        possibleCapture.x,
        possibleCapture.y,
        player.enemyColor,
        board,
      );

      if (!isChecked) {
        this.__addIfValidCapture(
          possibleCapture.x,
          possibleCapture.y,
          movements,
          pieceThatCaptures,
          chess,
          board,
        );
      }
    });

    return movements.filter((possibleCapture) => {
      const copy = chess.copyBoard();

      // Simulates the movement of the possibleCapture in the copy.
      copy[possibleCapture.x][possibleCapture.y] = copy[x][y];
      copy[x][y] = null;

      const isChecked = chess.isCheckedPosition(
        possibleCapture.x,
        possibleCapture.y,
        player.enemyColor,
        copy,
      );

      return !isChecked;
    });
  }
}
