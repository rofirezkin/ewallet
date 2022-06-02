import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {IcTransaction} from '../../assets';

const ListTransaction = ({nominal, jenis, date}) => {
  return (
    <View style={styles.container}>
      <View style={styles.icon}>
        <IcTransaction />
      </View>
      <View style={styles.desc}>
        <Text>{`Rp. ${nominal}`}</Text>
        <Text>{jenis}</Text>
      </View>
      <Text style={styles.date}>{date}</Text>
    </View>
  );
};

export default ListTransaction;

const styles = StyleSheet.create({
  container: {
    marginTop: 13,
    backgroundColor: 'white',
    flexDirection: 'row',
    paddingHorizontal: 18,
    paddingVertical: 13,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.5,

    elevation: 2,
    marginHorizontal: 5,
    marginVertical: 5,
  },
  icon: {
    justifyContent: 'center',
  },
  date: {
    textAlign: 'right',
    flex: 1,
  },
  desc: {
    paddingLeft: 12,
  },
});
