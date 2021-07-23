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

const piecesSrc = {
  b_bishop: <BBishop />,
  b_king: <BKing />,
  b_knight: <BKnight />,
  b_pawn: <BPawn />,
  b_queen: <BQueen />,
  b_rook: <BRook />,

  // w_doge,
  // b_doge,

  w_bishop: <WBishop />,
  w_king: <WKing />,
  w_knight: <WKnight />,
  w_pawn: <WPawn />,
  w_queen: <WQueen />,
  w_rook: <WRook />,
};

const style = { width: 50, height: 50 };

export default function Piece({ piece }) {
  return piecesSrc[piece];
}
