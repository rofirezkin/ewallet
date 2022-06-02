import {useNavigation} from '@react-navigation/core';
import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {IcQRPay, IcTopUp, IcTransfer} from '../../assets';

const FeatureSection = () => {
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => navigation.navigate('TopUpScreen')}>
        <View style={styles.box}>
          <IcQRPay />
        </View>
        <Text style={styles.text}>Top Up</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate('QrPay')}>
        <View style={styles.box}>
          <IcTopUp />
        </View>
        <Text style={styles.text}>QR Pay</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate('Transfer')}>
        <View style={styles.box}>
          <IcTransfer />
        </View>
        <Text style={styles.text}>Transfer</Text>
      </TouchableOpacity>
    </View>
  );
};

export default FeatureSection;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#4982C1',
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 20,
    borderRadius: 10,
  },
  box: {
    backgroundColor: 'white',
    borderRadius: 12,
    width: 55,
    height: 55,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    marginTop: 8,
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 15,
    color: 'white',
  },
});
