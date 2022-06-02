import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import React, {useEffect, useState} from 'react';
import {Image, StyleSheet, Text, View} from 'react-native';
import {IcTransferHalaman} from '../../assets';
import {Button, Gap, Header, TextInput} from '../../components';

const TransferProcess = ({navigation, route}) => {
  const dataUser = route.params;
  const [nominal, setNominal] = useState('');
  const [idPengirim, setIdPengirim] = useState('');

  console.log('datauser', dataUser);

  console.log('id pengiri', idPengirim);

  const onTransfer = async () => {
    const id_pengirim = await getIdUser();
    console.log('halo', nominal);
    const data = {
      id_pengirim,
      id_penerima: dataUser.id_user,
      nominal_transfer: nominal,
    };
    console.log('dataKirim', data);
    axios
      .post(
        `https://emoneydti.basicteknologi.co.id/index.php/api/transfer/process`,
        data,
      )
      .then(res => {
        console.log('halo ', res);
        navigation.navigate('SuccessTransfer', res.data.data);
      })
      .catch(err => {
        console.log('jaloo', err);
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
  return (
    <View style={styles.page}>
      <Header title="Transfer" onPress={() => navigation.goBack()} />
      <View style={{paddingHorizontal: 20}}>
        <Gap height={39} />
        <View style={{alignSelf: 'center'}}>
          <Image source={IcTransferHalaman} style={styles.avatar} />
        </View>
        <Gap height={39} />

        <TextInput
          value={nominal}
          onChangeText={value => setNominal(value)}
          placeholder="Masukan Nominal"
        />
        <Gap height={39} />
        <View
          style={{backgroundColor: '#4982C1', padding: 20, borderRadius: 10}}>
          <Text style={{fontSize: 17, color: 'white'}}>
            Nama Penerima : {dataUser.nama_user}
          </Text>
          <Text style={{fontSize: 20, color: 'white'}}>
            No. Hp {dataUser.nomor_handphone}
          </Text>
        </View>
        <Gap height={20} />
        <Button title="Transfer" onPress={onTransfer} />
      </View>
    </View>
  );
};

export default TransferProcess;

const styles = StyleSheet.create({
  page: {
    flex: 1,
    backgroundColor: 'white',
  },
  avatar: {
    width: 240,
    height: 172,
  },
});
