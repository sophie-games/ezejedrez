import React from "react";
import { StyleSheet, TouchableOpacity } from "react-native";

export default function Square({ x, y }) {
  // TODO: Detectar automáticamente qué color debería ser a partir de las coordenadas x e y
  const color = "white";

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
    width: 100,
    height: 100,
    backgroundColor: "#D8AF86",
  },

  black: {
    width: 100,
    height: 100,
    backgroundColor: "#8E5431",
  },
});
