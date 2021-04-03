import React from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import Piece from './piece';

export default function Square({ x, y }) {
  function determineColor(x, y) {
    if ((x % 2 == 0 && y % 2 == 1) || (x % 2 == 1 && y % 2 == 0)) {
      return 'white';
    } else {
      return 'black';
    }
  }

  const rand = Math.random();
  // Despues este "piece" se lo vamos a pasar como parámetro a Square desde Board
  const piece =
    rand < 0.15
      ? 'w_pawn'
      : rand < 0.3
      ? 'b_bishop'
      : rand < 0.45
      ? 'w_knight'
      : null;

  return (
    <TouchableOpacity
      style={styles[determineColor(x, y)]}
      activeOpacity={1}
      onPress={() => {
        console.log(`Has presionado el cuadrado ${x} ${y}`);
      }}
    >
      {piece ? <Piece piece={piece} /> : null}
    </TouchableOpacity>
  );
}

const baseStyle = {
  flex: 1,
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
};

const styles = StyleSheet.create({
  white: {
    ...baseStyle,
    backgroundColor: '#D8AF86',
  },

  black: {
    ...baseStyle,
    backgroundColor: '#8E5431',
  },
});
