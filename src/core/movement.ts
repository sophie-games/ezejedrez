import Castling from './castling';

export default interface Movement {
  x: number;
  y: number;
  castle?: boolean;
  passing?: boolean;
}
