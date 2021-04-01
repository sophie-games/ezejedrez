import React from 'react';
import { View } from 'react-native';

export default function Board({ size = 500 }) {
  return (
    <View style={{ backgroundColor: '#eee', width: size, height: size }} />
  );
}
