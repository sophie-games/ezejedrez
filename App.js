import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import Board from './src/ui/board.jsx';
import { Dimensions } from 'react-native';

const window = Dimensions.get('window');
const screen = Dimensions.get('screen');

export default function App() {
  const [dimensions, setDimensions] = useState({ window, screen });

  const onChange = ({ window, screen }) => {
    setDimensions({ window, screen });
  };

  useEffect(() => {
    Dimensions.addEventListener('change', onChange);
    return () => {
      Dimensions.removeEventListener('change', onChange);
    };
  }, []);

  const windowWidth = dimensions.window.width;
  const windowHeight = dimensions.window.height;
  const boardSize = windowWidth < windowHeight ? windowWidth : windowHeight;

  return (
    <View style={styles.container}>
      <Board size={boardSize} />

      <StatusBar style='auto' />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
