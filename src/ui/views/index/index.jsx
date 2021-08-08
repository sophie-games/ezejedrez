import React from 'react';
import { StyleSheet, View, TouchableOpacity, Text } from 'react-native';
import { useHistory } from 'react-router-dom';
import * as Device from 'expo-device';
import { useSelector, useDispatch } from 'react-redux';
import changeLanguage from '../../../actions/changeLanguage';

import En from '../../../../assets/languages/en.svg';
import Es from '../../../../assets/languages/es.svg';

const languageComps =
  Device.brand !== null
    ? {
        // ----- Device -----
        // SVG can be used as components on devices
        en: <En />,
        es: <Es />,
      }
    : {
        // ----- Web -----
        // SVG cannot be used as components on web
        en: <img src={En} alt="en" />,
        es: <img src={Es} alt="es" />,
      };

export default function IndexView() {
  const history = useHistory();
  const language = useSelector((state) => state.language);
  const dispatch = useDispatch();

  return (
    <View style={styles.container}>
      <View style={styles.mainMenu}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => history.push('/game')}
        >
          <Text style={styles.text}>{language.messages['play']}</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.button}
          onPress={() =>
            dispatch(changeLanguage(language.language === 'en' ? 'es' : 'en'))
          }
        >
          {languageComps[language.language]}
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
