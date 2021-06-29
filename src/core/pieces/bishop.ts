import Piece from './piece';
import Chess from './../chess';
import Movement from './../movement';
export default class Bishop extends Piece {
  constructor(color: string) {
    // code smell
    super('bishop', color);
  }

  protected __getMoveMovements(x: number, y: number, chess: Chess) {
    const movements: Movement[] = [];

    // TODO

    return movements;
  }

  protected __getCaptureMovements(x: number, y: number, chess: Chess) {
    const movements: Movement[] = [];

    // TODO

    return movements;
  }
}
