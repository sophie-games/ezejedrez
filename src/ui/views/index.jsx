import React from 'react';
import {
  StyleSheet,
  View,
  TouchableOpacity,
  Text,
  Dimensions,
} from 'react-native';
import { useHistory } from 'react-router-dom';
import en from './../languages/en.json';

export default function IndexView() {
  const history = useHistory();

  return (
    <View style={styles.container}>
      <View style={styles.mainMenu}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => history.push('/game')}
        >
          <Text style={styles.text}>{en['play']}</Text>
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
    alignSelf: 'stretch', // Width 100%
    flex: 1, // Height 100%
    backgroundColor: '#D8AF86',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },

  button: {
    width: 200,
    height: 75,
    backgroundColor: '#8E5431',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },

  text: {
    fontWeight: 'bold',
    fontSize: 20,
  },
});
