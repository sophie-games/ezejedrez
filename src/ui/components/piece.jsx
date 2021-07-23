import React from 'react';

/* -------------------------------------------------------
 Pieces source
------------------------------------------------------- */

// Black
import BBishop from '../../../assets/pieces/b_bishop.svg';
import BKing from '../../../assets/pieces/b_king.svg';
import BKnight from '../../../assets/pieces/b_knight.svg';
import BPawn from '../../../assets/pieces/b_pawn.svg';
import BQueen from '../../../assets/pieces/b_queen.svg';
import BRook from '../../../assets/pieces/b_rook.svg';

// Dummy piece
// import b_doge from '../../../assets/pieces/nn_doge.png';
// import w_doge from '../../../assets/pieces/nn_doge.png';

// White
import WBishop from '../../../assets/pieces/w_bishop.svg';
import WKing from '../../../assets/pieces/w_king.svg';
import WKnight from '../../../assets/pieces/w_knight.svg';
import WPawn from '../../../assets/pieces/w_pawn.svg';
import WQueen from '../../../assets/pieces/w_queen.svg';
import WRook from '../../../assets/pieces/w_rook.svg';

const style = { width: '80%', height: '80%' };

const piecesSrc = {
  b_bishop: <BBishop style={style} />,
  b_king: <BKing style={style} />,
  b_knight: <BKnight style={style} />,
  b_pawn: <BPawn style={style} />,
  b_queen: <BQueen style={style} />,
  b_rook: <BRook style={style} />,

  // w_doge,
  // b_doge,

  w_bishop: <WBishop style={style} />,
  w_king: <WKing style={style} />,
  w_knight: <WKnight style={style} />,
  w_pawn: <WPawn style={style} />,
  w_queen: <WQueen style={style} />,
  w_rook: <WRook style={style} />,
};

export default function Piece({ piece }) {
  return piecesSrc[piece];
}
