import React from 'react';
import { StyleSheet, View } from 'react-native';
import Square from './square';

// Rows and Columns of the board
const ROWS = 8;
const COLUMNS = 8;

// We create an array of numbers to make .map in the render
const rowArray = Array.from(Array(ROWS).keys());
const columnArray = Array.from(Array(COLUMNS).keys());

export default function Board({ size = 500 }) {
  return (
    <View
      style={{
        width: size,
        height: size,
        display: 'flex',
        flexDirection: 'column-reverse', // "column-reverse" because the (0,0) square is the one at the bottom left
      }}>
      {columnArray.map((c) => (
        <View key={c} style={styles.row}>
          {rowArray.map((r) => (
            <Square key={r} x={r} y={c} />
          ))}
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
