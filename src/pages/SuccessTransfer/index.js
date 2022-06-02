import React from 'react';
import {Image, StyleSheet, Text, View} from 'react-native';
import {IcTransferHalaman} from '../../assets';
import {Button, Gap} from '../../components';

const SuccessTransfer = ({route, navigation}) => {
  const dataRespon = route.params;
  console.log('kok kita ', dataRespon);
  return (
    <View style={styles.page}>
      <View style={{alignSelf: 'center'}}>
        <Image source={IcTransferHalaman} style={styles.avatar} />
      </View>
      <View style={styles.container}>
        <Gap height={20} />
        <View style={{alignItems: 'center'}}>
          <Text style={{fontSize: 20}}>Transfer Sukses</Text>
          <Text style={{fontSize: 20}}>Rp {dataRespon.nominal_transfer}</Text>
        </View>
        <Gap height={20} />
        <View
          style={{backgroundColor: '#4982C1', padding: 16, borderRadius: 10}}>
          <Text style={{fontSize: 15, color: 'white'}}>
            Tanggal Transaksi {dataRespon.waktu_transaksi}
          </Text>
          <Text style={{fontSize: 15, color: 'white'}}>
            Receiver : {dataRespon.data.nama_user}
          </Text>
          <Text style={{fontSize: 15, color: 'white'}}>
            nomor penerima : {dataRespon.data.nomor_handphone}
          </Text>
        </View>
        <Gap height={30} />
        <Button title="FInish" onPress={() => navigation.replace('MainTab')} />
      </View>
    </View>
  );
};

export default SuccessTransfer;

const styles = StyleSheet.create({
  page: {
    flex: 1,
    backgroundColor: 'white',
  },
  container: {
    paddingHorizontal: 20,
  },
  avatar: {
    width: 250,
    height: 250,
  },
});
