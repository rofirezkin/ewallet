import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import React, {useEffect, useState} from 'react';
import {StyleSheet, Text, View, PermissionsAndroid, Image} from 'react-native';
import {Button, Gap, TextInput} from '../../components';
import Geolocation from 'react-native-geolocation-service';
import {IcQrPayment} from '../../assets';

const PaymentConfirmation = ({route, navigation}) => {
  const {data} = route.params;
  const [nominal, setNominal] = useState();
  const [position, setPosition] = useState();

  useEffect(() => {
    getLocation();
  }, []);

  const onSubmit = async () => {
    let id_user = await getIdUser();
    axios
      .post(
        `https://emoneydti.basicteknologi.co.id/index.php/api/merchant/pay`,
        {
          id_user: id_user,
          nominal_bayar: nominal,
          id_merchant: data.id_merchant,
          latitude_transaksi: position.coords.latitude,
          longitude: position.coords.longitude,
        },
      )
      .then(function (response) {
        if (response.data.status == 'true') {
          navigation.navigate('PaymentSuccess', {
            data: response.data.data,
          });
        }
      })
      .catch(function (error) {});
  };

  const getLocation = () => {
    if (requestLocationPermission()) {
      Geolocation.getCurrentPosition(
        position => {
          setPosition(position);
        },
        error => {
          // See error code charts below.
        },
        {enableHighAccuracy: true, timeout: 15000, maximumAge: 10000},
      );
    }
  };

  const requestLocationPermission = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        {
          title: 'Aplikasi ini meminta lokasi anda',
          message: 'Berikan izin pada aplikasi utnuk mendapatkan lokasi anda',
          buttonNeutral: 'Ask Me Later',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        },
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        console.log('You can use the location');
        return true;
      } else {
        console.log('location permission denied');
        return false;
      }
    } catch (err) {
      console.warn(err);
    }
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
  return (
    <View style={{flex: 1, backgroundColor: 'white'}}>
      <View style={{paddingHorizontal: 20}}>
        <View style={styles.icon}>
          <Image source={IcQrPayment} style={styles.avatar} />
        </View>
        <Gap height={20} />
        <View style={styles.desc}>
          <Text style={styles.title}>Nama Merchant : {data.nama_merchant}</Text>
          <Gap height={10} />
          <Text style={styles.title}>
            Alamat Merchant : {data.alamat_merchant}
          </Text>
        </View>
        <TextInput
          value={nominal}
          placeholder="Nominal bayar"
          onChangeText={value => setNominal(value)}
        />
        <Gap height={20} />
        <Button title="Bayar" onPress={onSubmit} />
      </View>
    </View>
  );
};

export default PaymentConfirmation;

const styles = StyleSheet.create({
  avatar: {width: 200, height: 200},
  icon: {alignSelf: 'center'},
  desc: {
    borderRadius: 10,
    backgroundColor: '#4982C1',
    padding: 20,
  },
  title: {
    color: 'white',
    fontSize: 15,
  },
});
