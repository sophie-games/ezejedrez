import React from 'react';
import * as Device from 'expo-device';

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

// White
import WBishop from '../../../assets/pieces/w_bishop.svg';
import WKing from '../../../assets/pieces/w_king.svg';
import WKnight from '../../../assets/pieces/w_knight.svg';
import WPawn from '../../../assets/pieces/w_pawn.svg';
import WQueen from '../../../assets/pieces/w_queen.svg';
import WRook from '../../../assets/pieces/w_rook.svg';

const style = { width: '80%', height: '80%' };
const pieceComps =
  Device.brand !== null
    ? {
        // ----- Device -----
        // SVG can be used as components on devices

        b_bishop: <BBishop style={style} />,
        b_king: <BKing style={style} />,
        b_knight: <BKnight style={style} />,
        b_pawn: <BPawn style={style} />,
        b_queen: <BQueen style={style} />,
        b_rook: <BRook style={style} />,

        w_bishop: <WBishop style={style} />,
        w_king: <WKing style={style} />,
        w_knight: <WKnight style={style} />,
        w_pawn: <WPawn style={style} />,
        w_queen: <WQueen style={style} />,
        w_rook: <WRook style={style} />,
      }
    : {
        // ----- Web -----
        // SVG cannot be used as components on web

        b_bishop: <img src={BBishop} style={style} alt="b_bishop" />,
        b_king: <img src={BKing} style={style} alt="b_king" />,
        b_knight: <img src={BKnight} style={style} alt="b_knight" />,
        b_pawn: <img src={BPawn} style={style} alt="b_pawn" />,
        b_queen: <img src={BQueen} style={style} alt="b_queen" />,
        b_rook: <img src={BRook} style={style} alt="b_rook" />,

        w_bishop: <img src={WBishop} style={style} alt="w_bishop" />,
        w_king: <img src={WKing} style={style} alt="w_king" />,
        w_knight: <img src={WKnight} style={style} alt="w_knight" />,
        w_pawn: <img src={WPawn} style={style} alt="w_pawn" />,
        w_queen: <img src={WQueen} style={style} alt="w_queen" />,
        w_rook: <img src={WRook} style={style} alt="w_rook" />,
      };

export default function Piece({ piece }) {
  return pieceComps[piece];
}
