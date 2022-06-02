import React, {useEffect, useState} from 'react';
import {ScrollView, Text, View, FlatList, SafeAreaView} from 'react-native';

import AsyncStorage from '@react-native-async-storage/async-storage';

import {
  FeatureSection,
  Gap,
  ListTransaction,
  TextInput,
} from '../../components';

import axios from 'axios';

function HomeScreen({navigation}) {
  const [balance, setBalance] = useState('');
  const [transaction, setTransaction] = useState('');
  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      getDashboard();
    });
    return unsubscribe;
  }, [navigation]);

  const getDashboard = async () => {
    let id_user = await getIdUser();

    axios
      .get(
        `https://emoneydti.basicteknologi.co.id/index.php/api/dashboard?id_user=${id_user}`,
      )
      .then(res => {
        setTransaction(res.data.data.transaksi);
        setBalance(res.data.data.saldo);
      })
      .catch(err => {});
  };

  const getIdUser = async () => {
    try {
      const value = await AsyncStorage.getItem('token');
      return value;
    } catch (e) {}
  };

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: '#F0F0F0'}}>
      <View style={{backgroundColor: 'white', paddingHorizontal: 20}}>
        <Text style={{fontSize: 20, textAlign: 'center'}}>
          API : GET Dashboard
        </Text>
        <Gap height={30} />
        <View style={{paddingVertical: 20}}>
          <Text>Your Balance :</Text>
          <Text style={{fontSize: 30}}>{`Rp.${balance}`}</Text>
        </View>
      </View>
      <View style={{paddingHorizontal: 20}}>
        <Gap height={20} />
        <FeatureSection />
        <Gap height={20} />
        <View>
          <Text style={{fontSize: 15}}>Latest Transaction</Text>

          <FlatList
            data={transaction}
            renderItem={({item}) => {
              return (
                <View>
                  <ListTransaction
                    jenis={item.jenis_transaksi}
                    nominal={item.nominal_transaksi}
                    date={item.waktu_transaksi}
                  />
                </View>
              );
            }}
          />
          <Gap height={40} />
        </View>
      </View>
    </SafeAreaView>
  );
}
export default HomeScreen;
