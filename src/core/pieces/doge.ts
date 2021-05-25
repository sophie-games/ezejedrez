import Piece from './piece';
import Chess from './../chess';
import Movement from './../movement';

export default class Doge extends Piece {
  constructor(color: string) {
    // code smell
    super('doge', color);
  }

  protected __getMoveMovements(x: number, y: number, chess: Chess) {
    const movements: Movement[] = [];

    return movements;
  }
}
