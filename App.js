import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View, Dimensions } from 'react-native';
import Board from './src/ui/board.jsx';
import Chess from './src/core/chess';
export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      dimensions: {
        window: Dimensions.get('window'),
        screen: Dimensions.get('screen'),
      },
      board: null,
      selectedSquare: null,
      highlightedSquare: [],
    };

    this.onDimensionsChange = ({ window, screen }) => {
      this.setState({ dimensions: { window, screen } });
    };
  }

  componentDidMount() {
    const chess = new Chess();
    const chessBoard = chess.getBoard();

    this.setState({ board: chessBoard });

    Dimensions.addEventListener('change', this.onDimensionsChange); // If Dimensions change, we update the dimensions state
  }

  componentWillUnmount() {
    Dimensions.removeEventListener('change', this.onDimensionsChange);
  }

  render() {
    const windowWidth = this.state.dimensions.window.width;
    const windowHeight = this.state.dimensions.window.height;
    const boardSize = windowWidth < windowHeight ? windowWidth : windowHeight;

    return (
      <View style={styles.container}>
        <Board
          board={this.state.board}
          size={boardSize}
          selectedSquare={this.state.selectedSquare}
          highlightedSquares={this.state.highlightedSquares}
          onSquarePress={() => {
            console.log('on press de app');
          }}
        />

        <StatusBar style='auto' />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
