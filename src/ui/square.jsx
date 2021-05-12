import React from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import Piece from './piece';

function determineColor(x, y) {
  return (x % 2 == 0 && y % 2 == 1) || (x % 2 == 1 && y % 2 == 0)
    ? 'white'
    : 'black';
}

export default function Square({ x, y, piece, isHighlighted, onPress }) {
  return (
    <TouchableOpacity
      style={styles[determineColor(x, y)]}
      activeOpacity={1}
      onPress={() => {
        onPress;
        console.log(`Has presionado el cuadrado ${x} ${y}`);
      }}>
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
