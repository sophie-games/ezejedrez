import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View, Dimensions, Text } from 'react-native';
import Board from '../../components/board';
import Chess from '../../../core/chess';
import { useHistory } from 'react-router';
import { useSelector } from 'react-redux';
import { useRef, useState, useEffect } from 'react';

export default function GameView() {
  const [dimensions, setDimensions] = useState({
    window: Dimensions.get('window'),
    screen: Dimensions.get('screen'),
  });
  const [board, setBoard] = useState(null);
  const [selectedPiece, setSelectedPiece] = useState(null);
  const [highlightedSquares, setHighlightedSquares] = useState([]);

  const language = useSelector((state) => state.language);

  const onFinish = (result) => {
    history.push({
      pathname: '/game-result',
      state: { result },
    });
  };

  const onDimensionsChange = ({ window, screen }) => {
    setDimensions({ window, screen });
  };

  const __chessRef = useRef(new Chess(onFinish));
  const __chess = __chessRef.current;

  const history = useHistory();

  useEffect(() => {
    setBoard(__chess.getBoard());

    // If Dimensions change, we update the dimensions state
    Dimensions.addEventListener('change', onDimensionsChange);

    return () => {
      Dimensions.removeEventListener('change', onDimensionsChange);
    };
  }, []);

  const windowWidth = dimensions.window.width;
  const windowHeight = dimensions.window.height;
  const boardSize =
    windowWidth < windowHeight - topBarHeight
      ? windowWidth
      : windowHeight - topBarHeight;

  const onSquarePress = (x, y) => {
    // If there is a selected piece and it can move to that position, the piece will be moved to there
    if (
      selectedPiece &&
      selectedPiece.color === __chess.whoPlays &&
      highlightedSquares.find((sqr) => sqr.x === x && sqr.y === y)
    ) {
      __chess.move(selectedPiece.x, selectedPiece.y, x, y);

      setSelectedPiece(null);
      setHighlightedSquares([]);

      // Select a piece if none is selected
    } else if (
      __chess.hasPiece(x, y) &&
      __chess.getPiece(x, y).color === __chess.currentPlayer.color
    ) {
      setSelectedPiece({ x, y, color: __chess.getPiece(x, y).color });
      setHighlightedSquares(__chess.getPieceMovements(x, y));
    }
    console.log(`(${x}, ${y}) pressed`);
  };

  return (
    <View style={styles.container}>
      <View style={styles.topBar}>
        <Text style={styles.text}>
          {language.messages[`${__chess.whoPlays}Plays`]}
        </Text>
      </View>

      <Board
        board={board}
        size={boardSize}
        highlightedSquares={highlightedSquares}
        onSquarePress={onSquarePress}
      />
      <StatusBar style="auto" />
    </View>
  );
}

const topBarHeight = 40;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    alignItems: 'center',
    justifyContent: 'center',
  },

  topBar: {
    height: topBarHeight,
    alignSelf: 'stretch', // Width 100%
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#222',
  },

  text: {
    color: '#fff',
  },
});
