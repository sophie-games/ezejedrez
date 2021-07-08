import Piece from './piece';
import Chess from './../chess';
import Movement from './../movement';
export default class King extends Piece {
  constructor(color: string) {
    // code smell
    super('king', color);
  }

  protected __getMoveMovements(x: number, y: number, chess: Chess) {
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
        player.enemyColor
      );

      if (!isChecked) {
        this.__addIfValidMovement(
          possibleMov.x,
          possibleMov.y,
          movements,
          chess
        );
      }
    });

    return movements;
  }

  protected __getCaptureMovements(x: number, y: number, chess: Chess) {
    const movements: Movement[] = [];
    const pieceThatCaptures = this;

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

    kingPossibleCaptures.forEach((possibleCapture) =>
      this.__addIfValidCapture(
        possibleCapture.x,
        possibleCapture.y,
        movements,
        pieceThatCaptures,
        chess
      )
    );

    return movements;
  }
}
