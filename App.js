import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View, Dimensions } from 'react-native';
import Board from './src/ui/board.jsx';
import Chess from './src/core/chess';
export default class App extends React.Component {
  constructor(props) {
    super(props);

    this.__chess = new Chess();

    this.state = {
      dimensions: {
        window: Dimensions.get('window'),
        screen: Dimensions.get('screen'),
      },
      board: null,
      selectedPiece: null,
      selectedSquare: null,
      highlightedSquares: [],
      whoPlays: '',
      movePiece: [],
    };

    this.onDimensionsChange = ({ window, screen }) => {
      this.setState({ dimensions: { window, screen } });
    };
  }

  componentDidMount() {
    this.__chess.move(0, 1, 0, 3);
    this.setState({ board: this.__chess.getBoard() });

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
          highlightedSquares={this.state.highlightedSquares}
          onSquarePress={(x, y) => {
            if (this.__chess.hasPiece(x, y)) {
              this.setState({
                highlightedSquares: this.__chess.getPieceMovements(x, y),
              });
            }
            console.log(`Has presionado el cuadrado ${x} ${y}`);
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
