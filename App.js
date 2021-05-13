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
      highlightedSquares: [],
    };

    this.onDimensionsChange = ({ window, screen }) => {
      this.setState({ dimensions: { window, screen } });
    };
  }

  componentDidMount() {
    const chess = new Chess();
    const chessBoard = chess.getBoard();
    const chessPieceMovements = chess.getPieceMovements(3, 1);

    this.setState({ board: chessBoard });
    this.setState({ highlightedSquares: chessPieceMovements });

    Dimensions.addEventListener('change', this.onDimensionsChange); // If Dimensions change, we update the dimensions state
  }

  componentWillUnmount() {
    Dimensions.removeEventListener('change', this.onDimensionsChange);
  }

  render() {
    const windowWidth = this.state.dimensions.window.width;
    const windowHeight = this.state.dimensions.window.height;
    const boardSize = windowWidth < windowHeight ? windowWidth : windowHeight;
    console.log(this.state.highlightedSquares);
    return (
      <View style={styles.container}>
        <Board
          board={this.state.board}
          size={boardSize}
          highlightedSquares={this.state.highlightedSquares}
          // selectedSquare={this.state.selectedSquare}
          onSquarePress={() => {
            // console.log('on press de app');
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
