import React from 'react';
import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';

const Link = ({title, size, align, onPress}) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <Text style={styles.text(size, align)}>{title}</Text>
    </TouchableOpacity>
  );
};

export default Link;

const styles = StyleSheet.create({
  text: (size, align) => ({
    fontSize: size,

    fontFamily: 'Nunito-Regular',
    textDecorationLine: 'underline',
    textAlign: align,
  }),
});
