import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {IcBack} from '../../assets';

const Header = ({onPress, title}) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={onPress}>
        <IcBack />
      </TouchableOpacity>
      <Text style={styles.text}>{title}</Text>
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#005690',
    flexDirection: 'row',
    paddingHorizontal: 19,
    paddingVertical: 20,
  },
  text: {
    color: 'white',
    fontSize: 18,
    marginLeft: 14,
  },
});
