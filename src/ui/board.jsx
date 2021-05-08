import React from 'react';
import { StyleSheet, View } from 'react-native';
import Square from './square';

// Columns and Rows of the board.
const COLUMNS = 8;
const ROWS = 8;

// We create an array of numbers to make .map() in the render.
const rowArray = Array.from(Array(ROWS).keys());
const columnArray = Array.from(Array(COLUMNS).keys());

export default function Board({ size = 500, board }) {
  if (!board) {
    // We need the board
    return null;
  }

  return (
    <View
      style={{
        width: size,
        height: size,
        display: 'flex',
        flexDirection: 'column-reverse', // "column-reverse" because the (0,0) square is the one at the bottom left.
      }}>
      {rowArray.map((r) => (
        <View key={r} style={styles.row}>
          {columnArray.map((c) => {
            const boardPiece = board[c][r];

            let piece = null;
            if (boardPiece) {
              const pieceColorCode = boardPiece.color === 'white' ? 'w' : 'b';
              piece = `${pieceColorCode}_${boardPiece.pieceType}`;
            }

            return <Square board={board} piece={piece} key={c} x={c} y={r} />;
          })}
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flex: 1,
    display: 'flex',
    flexDirection: 'row',
  },
});
