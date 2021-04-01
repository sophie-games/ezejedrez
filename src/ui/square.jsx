import React from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';

export default function Square({ x, y }) {
  // TODO: Detectar automáticamente qué color debería ser a partir de las coordenadas x e y
  const color = Math.random() < 0.5 ? 'white' : 'black';

  return (
    <TouchableOpacity
      style={styles[color]}
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
