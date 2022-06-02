import React, {useEffect, useState} from 'react';
import {Image, Text, ToastAndroid, View} from 'react-native';
import {IcLogoDepan} from '../../assets';
import {Gap} from '../../components';

function SplashScreen() {
  return (
    <View
      style={{
        backgroundColor: '#005690',
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      <Image source={IcLogoDepan} style={{width: 175, height: 150}} />
      <Gap height={20} />
      <Text style={{color: 'white', fontSize: 23}}>E-Wallet Apps</Text>
      <Gap height={20} />
      <Text style={{color: 'white', fontSize: 14}}>
        Final Project React Native
      </Text>
    </View>
  );
}
export default SplashScreen;
