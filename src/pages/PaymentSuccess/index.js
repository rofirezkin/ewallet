import React from 'react';
import {Image, StyleSheet, Text, View} from 'react-native';
import {IcQrPayment} from '../../assets';
import {Button, Gap} from '../../components';

const PaymentSuccess = ({route, navigation}) => {
  const {data} = route.params;
  console.log('ress data', data);
  return (
    <View style={{flex: 1, backgroundColor: 'white'}}>
      <View style={{paddingHorizontal: 20}}>
        <View style={styles.icon}>
          <Image source={IcQrPayment} style={styles.avatar} />
        </View>
        <Text style={{textAlign: 'center', fontSize: 25}}>
          Payment Complete
        </Text>
        <Text style={{fontSize: 20, textAlign: 'center'}}>
          Rp.
          {data.nominal_bayar}
        </Text>
        <Gap height={30} />
        <View
          style={{backgroundColor: '#4982C1', padding: 15, borderRadius: 10}}>
          <Text style={{fontSize: 14, color: 'white'}}>
            Nama Merchant : {data.merchant.nama_merchant}
          </Text>
          <Text style={{fontSize: 14, color: 'white'}}>
            Alamat : {data.merchant.alamat_merchant}
          </Text>
          <Text style={{fontSize: 14, color: 'white'}}>
            Waktu Transaksi : {data.waktu_transaksi}
          </Text>
        </View>
        <Gap height={20} />
        <Button title="Finish" onPress={() => navigation.replace('MainTab')} />
      </View>
    </View>
  );
};

export default PaymentSuccess;

const styles = StyleSheet.create({
  avatar: {width: 200, height: 200},
  icon: {alignSelf: 'center'},
});
//firebase dengan midtrans ?
