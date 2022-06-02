import React, {useEffect, useState} from 'react';
import {Image, Text, ToastAndroid, View} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import axios from 'axios';
import {FlatList} from 'react-native-gesture-handler';
import {ListTransaction} from '../../components';

function Transaction({navigation}) {
  const [transaction, setTransaction] = useState('');
  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      getTransactions();
    });
    return unsubscribe;
  }, [navigation]);

  const getTransactions = async () => {
    let id_user = await getIdUser();
    console.log('iddd', id_user);
    axios
      .get(
        `https://emoneydti.basicteknologi.co.id/index.php/api/transaction?id_user=${id_user}`,
      )
      .then(res => {
        setTransaction(res.data.data);
      })
      .catch(err => {});
  };

  const getIdUser = async () => {
    try {
      const value = await AsyncStorage.getItem('token');
      return value;
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <View style={{flex: 1, paddingHorizontal: 20}}>
      <Text style={{fontSize: 20, textAlign: 'center'}}>
        API : GET Transaction List
      </Text>
      <FlatList
        data={transaction}
        renderItem={({item}) => {
          return (
            <ListTransaction
              jenis={item.jenis_transaksi}
              nominal={item.nominal_transaksi}
              date={item.waktu_transaksi}
            />
          );
        }}
      />
    </View>
  );
}

export default Transaction;
