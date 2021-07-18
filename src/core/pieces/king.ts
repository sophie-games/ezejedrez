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
    board: Piece[][]
  ) {
    const movements: Movement[] = [];

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
      this.__addIfValidMovement(
        possibleMov.x,
        possibleMov.y,
        movements,
        chess,
        board
      );
    });

    return movements;
  }

  protected __getCaptureMovements(
    x: number,
    y: number,
    chess: Chess,
    board: Piece[][]
  ) {
    const movements: Movement[] = [];

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
      this.__addIfValidCapture(
        possibleCapture.x,
        possibleCapture.y,
        movements,
        this,
        chess,
        board
      );
    });

    return movements;
  }

  getMovements(
    x: number,
    y: number,
    chess: Chess,
    board?: Piece[][],
    noCalculateIsChecked?: boolean
  ) {
    const movements = super.getMovements(
      x,
      y,
      chess,
      board,
      noCalculateIsChecked
    );

    if (noCalculateIsChecked) {
      return movements;
    }

    const player = chess.getPlayer(this.color);
    for (const [castleType, castle] of Object.entries(player.castling)) {
      if (chess.canCastle(this.color, castle)) {
        movements.push({
          x: castle.kingFinalPosition.x,
          y: castle.kingFinalPosition.y,
          castle: castleType,
        });
      }
    }

    return movements;
  }
}
