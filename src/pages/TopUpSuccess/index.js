import * as React from 'react';
import {Text, View, TextInput, Image} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import {WebView} from 'react-native-webview';
import {IcTopUpProcess} from '../../assets';
import {Button, Gap} from '../../components';

const TopUpSuccessScreen = ({route, navigation}) => {
  const {orderId} = route.params;
  const [nominalTopUp, setNominalTopUp] = React.useState('');
  const [transactionTime, setTransactionTime] = React.useState('');
  const [bank, setBank] = React.useState('');
  const [vaNumber, setVaNumber] = React.useState('');
  const [transactionStatus, setTransactionStatus] = React.useState('');

  React.useEffect(() => {
    axios
      .get(
        `https://emoneydti.basicteknologi.co.id/index.php/api/snap/transactionstatus?order_id=${orderId}`,
      )
      .then(res => {
        console.log(res.data);
        setNominalTopUp(res.data.data.nominal_topup);
        setTransactionTime(res.data.data.transaction_time);
        setBank(res.data.data.bank);
        setVaNumber(res.data.data.va_number);
        setTransactionStatus(res.data.data.transaction_status);
      })
      .catch(err => {
        console.log(err);
      });
  }, []);

  return (
    <View style={{flex: 1, backgroundColor: 'white'}}>
      <View style={{padding: 20}}>
        <Image
          source={IcTopUpProcess}
          style={{width: 200, height: 200, alignSelf: 'center'}}
        />
        <Gap height={30} />
        <Text style={{fontSize: 20, textAlign: 'center'}}>Top Up Complete</Text>
        <Text style={{fontSize: 20, textAlign: 'center'}}>
          Rp. {nominalTopUp}
        </Text>
        <Gap height={20} />
        <View
          style={{backgroundColor: '#4982C1', padding: 20, borderRadius: 13}}>
          <Text style={{color: 'white'}}>
            Tanggal Transaksi : {transactionTime}
          </Text>
          <Text style={{color: 'white'}}> Tujuan Pengiriman {bank}</Text>
          <Text style={{color: 'white'}}>VA Number : {vaNumber}</Text>
          <Text style={{color: 'white'}}>
            Transaction Status : {transactionStatus}
          </Text>
        </View>
        <Gap height={20} />
        <Button
          title="Finish"
          onPress={() => {
            navigation.navigate('MainTab');
          }}
        />
      </View>
    </View>
  );
};

export default TopUpSuccessScreen;
