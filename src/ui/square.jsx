import React from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import Piece from './piece';

function determineColor(x, y) {
  return (x % 2 == 0 && y % 2 == 1) || (x % 2 == 1 && y % 2 == 0)
    ? 'white'
    : 'black';
}

export default function Square({ x, y, piece, isHighlighted, onPress }) {
  // console.log(('isHighlighted', isHighlighted));

  return (
    <TouchableOpacity
      style={styles[determineColor(x, y)]}
      activeOpacity={1}
      onPress={() => {
        onPress();
        console.log(`Has presionado el cuadrado ${x} ${y}`);
      }}>
      <View style={isHighlighted ? styles.highlightedView : styles.view}>
        {piece ? <Piece piece={piece} /> : null}
      </View>
    </TouchableOpacity>
  );
}

const BaseStyle = {
  flex: 1,
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
};

const styles = StyleSheet.create({
  white: {
    flex: 1,
    backgroundColor: '#D8AF86',
  },

  black: {
    flex: 1,
    backgroundColor: '#8E5431',
  },

  view: {
    ...BaseStyle,
    width: '100%',
    height: '100%',
  },

  highlightedView: {
    width: '100%',
    height: '100%',
    backgroundColor: '#00ff00',
    opacity: 0.4,
  },
});
