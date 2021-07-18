import Movement from './movement';

export interface Castle {
  positions: Movement[];
  kingStartPosition: Movement;
  kingFinalPosition: Movement;
  rookStartPosition: Movement;
  rookFinalPosition: Movement;
}

export default interface Castling {
  short: Castle;
  long: Castle;
}
