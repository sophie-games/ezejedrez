import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View, Dimensions, Text } from 'react-native';
import Board from '../components/board';
import Chess from '../../core/chess';

export default class GameView extends React.Component {
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
      highlightedSquares: [],
    };

    this.onDimensionsChange = ({ window, screen }) => {
      this.setState({ dimensions: { window, screen } });
    };
  }

  componentDidMount() {
    this.setState({ board: this.__chess.getBoard() });

    Dimensions.addEventListener('change', this.onDimensionsChange); // If Dimensions change, we update the dimensions state
  }

  componentWillUnmount() {
    Dimensions.removeEventListener('change', this.onDimensionsChange);
  }

  render() {
    const windowWidth = this.state.dimensions.window.width;
    const windowHeight = this.state.dimensions.window.height;
    const boardSize =
      windowWidth < windowHeight - topBarHeight
        ? windowWidth
        : windowHeight - topBarHeight;

    const onSquarePress = (x, y) => {
      if (
        this.state.selectedPiece &&
        this.state.selectedPiece.color === this.__chess.whoPlays &&
        this.state.highlightedSquares.find((sqr) => sqr.x === x && sqr.y === y)
      ) {
        this.__chess.move(
          this.state.selectedPiece.x,
          this.state.selectedPiece.y,
          x,
          y,
        );

        this.setState({
          selectedPiece: null,
          highlightedSquares: [],
        });
      } else if (this.__chess.hasPiece(x, y)) {
        this.setState({
          highlightedSquares: this.__chess.getPieceMovements(x, y),
          selectedPiece: { x, y, color: this.__chess.getPiece(x, y).color },
        });
      }
      console.log(`Has presionado el cuadrado ${x} ${y}`);
    };

    return (
      <View style={styles.container}>
        <View style={styles.topBar}>
          <Text style={styles.text}>
            {playersDict[this.__chess.whoPlays]} plays!
          </Text>
        </View>

        <Board
          board={this.state.board}
          size={boardSize}
          highlightedSquares={this.state.highlightedSquares}
          onSquarePress={onSquarePress}
        />
        <StatusBar style='auto' />
      </View>
    );
  }
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
    height: `${topBarHeight}px`,
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#222',
  },

  text: {
    color: '#fff',
  },
});

const playersDict = {
  white: 'White',
  black: 'Black',
};
