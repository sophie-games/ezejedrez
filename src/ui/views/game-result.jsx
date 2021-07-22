import React from 'react';
import { StyleSheet, View, TouchableOpacity, Text } from 'react-native';
import { useHistory, useLocation } from 'react-router-dom';
import en from './../languages/en.json';

export default function GameResultView() {
  const history = useHistory();
  const location = useLocation();

  const result = location.state.result;

  return (
    <View style={styles.container}>
      <View style={styles.mainMenu}>
        <View style={styles.titleContainer}>
          <Text style={styles.text}>
            {result.draw ? en['draw'] : en[`${result.winner}Wins`]}
          </Text>
        </View>

        <TouchableOpacity
          style={styles.button}
          onPress={() => history.push('/')}
        >
          <Text style={styles.text}>{en['back']}</Text>
        </TouchableOpacity>
      </View>
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

  mainMenu: {
    width: '100%',
    height: '100%',
    backgroundColor: '#D8AF86',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },

  button: {
    width: '80%',
    height: '75px',
    backgroundColor: '#8E5431',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },

  titleContainer: {
    marginBottom: 20,
  },

  text: {
    fontWeight: 'bold',
    fontSize: 20,
  },
});
