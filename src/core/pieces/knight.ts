import Piece from './piece';
import Chess from './../chess';
import Movement from './../movement';

export default class Knight extends Piece {
  constructor(color: string) {
    // code smell
    super('knight', color);
  }

  protected __getMoveMovements(x: number, y: number, chess: Chess) {
    const movements: Movement[] = [];

    const knightPossibleMovs = [
      { x: x - 1, y: y + 2 },
      { x: x - 2, y: y + 1 },
      { x: x - 2, y: y - 1 },
      { x: x - 1, y: y - 2 },
      { x: x + 1, y: y - 2 },
      { x: x + 2, y: y - 1 },
      { x: x + 2, y: y + 1 },
      { x: x + 1, y: y + 2 },
    ];

    knightPossibleMovs.forEach((possibleMov) =>
      this.__addIfValidMovement(possibleMov.x, possibleMov.y, movements, chess)
    );

    return movements;
  }

  protected __getCaptureMovements(x: number, y: number, chess: Chess) {
    const movements: Movement[] = [];
    const pieceThatCaptures = this;

    const knightPossibleCaptures = [
      { x: x - 1, y: y + 2 },
      { x: x - 2, y: y + 1 },
      { x: x - 2, y: y - 1 },
      { x: x - 1, y: y - 2 },
      { x: x + 1, y: y - 2 },
      { x: x + 2, y: y - 1 },
      { x: x + 2, y: y + 1 },
      { x: x + 1, y: y + 2 },
    ];

    knightPossibleCaptures.forEach((possibleCapture) =>
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
