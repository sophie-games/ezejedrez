import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Dimensions } from 'react-native';
import Board from './src/ui/board.jsx';
import Chess from './src/core/chess';

const window = Dimensions.get('window');
const screen = Dimensions.get('screen');

export default function App() {
  const [dimensions, setDimensions] = useState({ window, screen });
  const [board, setBoard] = useState(null);

  const onChange = ({ window, screen }) => {
    setDimensions({ window, screen });
  };

  useEffect(() => {
    const chess = new Chess();
    const chessBoard = chess.getBoard();

    // chess.addPiece('king', 'white', 4, 3);
    // chessBoard[4][3] = { pieceType: 'king', color: 'white' };

    setBoard(chessBoard);

    Dimensions.addEventListener('change', onChange); // If Dimensions change, we update the dimensions state

    return () => {
      Dimensions.removeEventListener('change', onChange);
    };
  }, []);

  const windowWidth = dimensions.window.width;
  const windowHeight = dimensions.window.height;
  const boardSize = windowWidth < windowHeight ? windowWidth : windowHeight;

  return (
    <View style={styles.container}>
      <Board board={board} size={boardSize} />

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
