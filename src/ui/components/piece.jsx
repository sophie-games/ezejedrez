import React from 'react';

/* -------------------------------------------------------
 Pieces source
------------------------------------------------------- */

// Black
import b_bishop from '../../../assets/pieces/b_bishop.svg';
import b_king from '../../../assets/pieces/b_king.svg';
import b_knight from '../../../assets/pieces/b_knight.svg';
import b_pawn from '../../../assets/pieces/b_pawn.svg';
import b_queen from '../../../assets/pieces/b_queen.svg';
import b_rook from '../../../assets/pieces/b_rook.svg';

//Dummy piece
import b_doge from '../../../assets/pieces/nn_doge.png';
import w_doge from '../../../assets/pieces/nn_doge.png';

// White
import w_bishop from '../../../assets/pieces/w_bishop.svg';
import w_king from '../../../assets/pieces/w_king.svg';
import w_knight from '../../../assets/pieces/w_knight.svg';
import w_pawn from '../../../assets/pieces/w_pawn.svg';
import w_queen from '../../../assets/pieces/w_queen.svg';
import w_rook from '../../../assets/pieces/w_rook.svg';

const piecesSrc = {
  b_bishop,
  b_king,
  b_knight,
  b_pawn,
  b_queen,
  b_rook,

  w_doge,
  b_doge,

  w_bishop,
  w_king,
  w_knight,
  w_pawn,
  w_queen,
  w_rook,
};

const style = { height: '75%' };

export default function Piece({ piece }) {
  return <img style={style} src={piecesSrc[piece]} alt="Piece" />;
}
