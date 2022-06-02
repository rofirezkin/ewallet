import axios from 'axios';
import React, {useState} from 'react';
import {StyleSheet, Text, View, ToastAndroid} from 'react-native';
import {Button, Gap, Header, TextInput} from '../../components';

const SignUp = ({navigation}) => {
  const [email, setEmail] = useState('Rofi@gmail.com');
  const [password, setPassword] = useState('admin123');
  const [nama, setNama] = useState('rofi');
  const [nomor_handphone, setNomor_Handphone] = useState('0857711111');
  const onRegist = () => {
    const data = {
      email,
      password,
      nama,
      nomor_handphone,
    };

    axios
      .post(
        `https://emoneydti.basicteknologi.co.id/index.php/api/users/registrasi`,
        data,
      )
      .then(res => {
        console.log(res.data);
        if (res.data.status == 'true') {
          ToastAndroid.show(
            'Registrasi Berhasil silahkan login',
            ToastAndroid.LONG,
          );
          navigation.navigate('SignIn');
        } else {
          alert(res.data.msg);
        }
      });
  };

  return (
    <View style={styles.page}>
      <Header title="Registrasi" onPress={() => navigation.goBack()} />
      <View style={styles.container}>
        <Gap height={30} />
        <TextInput
          value={email}
          onChangeText={value => setEmail(value)}
          placeholder="Email"
        />
        <Gap height={15} />
        <TextInput
          value={password}
          onChangeText={value => setPassword(value)}
          placeholder="Password"
          secureTextEntry={true}
        />
        <Gap height={15} />
        <TextInput
          value={nama}
          onChangeText={value => setNama(value)}
          placeholder="Name"
        />
        <Gap height={15} />
        <TextInput
          value={nomor_handphone}
          onChangeText={value => setNomor_Handphone(value)}
          placeholder="No. Handphone"
        />
        <Gap height={30} />
        <Button title="SUBMIT" onPress={onRegist} />
      </View>
    </View>
  );
};

export default SignUp;

const styles = StyleSheet.create({
  page: {
    flex: 1,
    backgroundColor: 'white',
  },
  container: {
    paddingHorizontal: 20,
  },
});
