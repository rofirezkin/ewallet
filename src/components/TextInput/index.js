import React from 'react';
import {StyleSheet, Text, View, TextInput as TextInputRN} from 'react-native';

const TextInput = ({label, longInput, placeholder, ...restProps}) => {
  if (longInput) {
    return (
      <View>
        <Text style={styles.text}>{label}</Text>
        <TextInputRN
          placeholder={placeholder}
          style={styles.textArea}
          {...restProps}
        />
      </View>
    );
  }
  return (
    <View>
      <Text style={styles.text}>{label}</Text>
      <TextInputRN
        style={styles.input}
        placeholder={placeholder}
        {...restProps}
      />
    </View>
  );
};

export default TextInput;

const styles = StyleSheet.create({
  input: {borderRadius: 8, backgroundColor: '#F9EFEF', padding: 10},
  text: {
    fontSize: 16,
    fontFamily: 'Poppins-Regular',
    color: '#020202',
  },
  textArea: {
    borderRadius: 8,
    height: 100,
    padding: 10,
    backgroundColor: '#F9EFEF',
    justifyContent: 'flex-start',
    textAlignVertical: 'top',
  },
});
