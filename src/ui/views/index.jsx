import React from 'react';
import { StyleSheet, View, TouchableOpacity, Text } from 'react-native';
import { useHistory } from 'react-router-dom';

export default function IndexView() {
  const history = useHistory();

  return (
    <View style={styles.container}>
      <View style={styles.mainMenu}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => history.push('/game')}
        >
          <Text>Play</Text>
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
});
