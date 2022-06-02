import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import React, {useEffect, useState} from 'react';
import {Image, StyleSheet, Text, View} from 'react-native';
import {Button, Gap, Header, TextInput} from '../../components';
import {WebView} from 'react-native-webview';
import {IcTopUpProcess} from '../../assets';

const TopUpScreen = ({navigation}) => {
  const [nominal, setNominal] = React.useState('');
  const [midtransUrl, setMidtransUrl] = React.useState(
    'https://linkaja.id/applink/payment?data=00020101021126660014ID.LINKAJA.WWW011893600911000171900202152003070917190020303UME51440014ID.CO.QRIS.WWW0215ID20200298161760303UME5204581253033605802ID5920Kantin%20FIT-Tenant%20026007BANDUNG61054025762070703A016304A562',
  );
  const [orderId, setOrderId] = React.useState('');

  const SubmitTopUp = async () => {
    let id_user = await getIdUser();
    axios
      .post(`https://emoneydti.basicteknologi.co.id/index.php/api/snap/token`, {
        id_user: id_user,
        nominal_topup: nominal,
      })
      .then(function (response) {
        console.log(response.data);
        setMidtransUrl(response.data.data.redirect_url);
        setOrderId(response.data.data.order_id);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const getIdUser = async () => {
    try {
      const value = await AsyncStorage.getItem('token');
      console.log(value);
      return value;
    } catch (e) {
      // error reading value
      console.log(e);
    }
  };

  if (midtransUrl != '') {
    return (
      <WebView
        source={{uri: midtransUrl}}
        onNavigationStateChange={navState => {
          if (navState.url.search('basicteknologi.co.id') > 0) {
            navigation.navigate('TopUpSuccess', {
              orderId: orderId,
            });
          }
        }}
      />
    );
  } else {
    return (
      <View style={{backgroundColor: 'white', flex: 1}}>
        <Header title="Top Up" onPress={() => navigation.goBack()} />
        <Gap height={50} />
        <View style={{paddingHorizontal: 20}}>
          <Image
            source={IcTopUpProcess}
            style={{width: 240, height: 200, alignSelf: 'center'}}
          />
          <TextInput
            placeholder="Nominal Top Up"
            value={nominal}
            onChangeText={nominal => setNominal(nominal)}
          />
          <Gap height={20} />
          <Button
            title="Top Up"
            onPress={() => {
              SubmitTopUp();
            }}
          />
        </View>
      </View>
    );
  }
};
export default TopUpScreen;

const styles = StyleSheet.create({});
