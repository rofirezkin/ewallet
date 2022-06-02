import axios from 'axios';
import React, {useState} from 'react';
import {Image, StyleSheet, Text, View} from 'react-native';
import {IcTransferHalaman} from '../../assets';
import {Button, Gap, Header, TextInput} from '../../components';

const Transfer = ({navigation}) => {
  const [number, setNumber] = useState('082240206862');
  const [dataUser, setDataUser] = useState();
  

  const onCheck = () => {
    console.log('halo', number);
    if (number !== '') {
      axios
        .get(
          `https://emoneydti.basicteknologi.co.id/index.php/api/transfer/checknumber?nomor_handphone=${number}`,
        )
        .then(res => {
          console.log('halo ', res.data.data[0]);
          setDataUser(res.data.data[0]);
          navigation.navigate('TransferProcess', res.data.data[0]);
        })
        .catch(err => {
          console.log('jaloo', err);
        });
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
        <Text>Halo transfer</Text>
        <TextInput
          value={number}
          onChangeText={value => setNumber(value)}
          placeholder="Receiver Phone Number"
        />
        <Gap height={39} />

        <Button title="Check Number" onPress={onCheck} />
      </View>
    </View>
  );
};

export default Transfer;

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
