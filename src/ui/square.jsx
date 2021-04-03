import React from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';

function determineColor(x, y) {
  if ((x % 2 == 0 && y % 2 == 1) || (x % 2 == 1 && y % 2 == 0)) {
    return 'white';
  } else {
    return 'black';
  }
}

export default function Square({ x, y }) {
  return (
    <TouchableOpacity
      style={styles[determineColor(x, y)]}
      activeOpacity={1}
      onPress={() => {
        console.log(`Has presionado el cuadrado ${x} ${y}`);
      }}
    />
  );
}

const styles = StyleSheet.create({
  white: {
    flex: 1,
    backgroundColor: '#D8AF86',
  },

  black: {
    flex: 1,
    backgroundColor: '#8E5431',
  },
});
