import React, {useEffect, useState} from 'react';
import {Image, ScrollView, Text, ToastAndroid, View} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {AuthContext} from '../Context';
import {Button, Gap} from '../../components';

function SettingTemp({navigation}) {
  const {signOut} = React.useContext(AuthContext);
  const [nama, setNama] = useState();
  const [noHandphone, setNoHanphone] = useState();

  const getUserData = async () => {
    try {
      const value = await AsyncStorage.getItem('userData');
      return value != null ? JSON.parse(value) : null;
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', async () => {
      let userData = await getUserData();
      setNama(userData.nama_user);
      setNoHanphone(userData.nomor_handphone);
    });
    return unsubscribe;
  });

  return (
    <View style={{flex: 1}}>
      <View style={{alignSelf: 'center'}}>
        <Gap height={40} />
        <View
          style={{
            width: 100,
            height: 100,
            backgroundColor: 'white',
            borderRadius: 100 / 2,
          }}></View>
        <Text style={{textAlign: 'center', fontSize: 20}}>{nama}</Text>
        <Text style={{textAlign: 'center', fontSize: 20}}>{noHandphone}</Text>
      </View>
      <View style={{paddingHorizontal: 20}}>
        <Gap height={30} />
        <Button title="Change Profile" />
        <Gap height={17} />
        <Button title="Sign Password" />
        <Gap height={17} />
        <Button title="Sign out" onPress={signOut} />
      </View>
    </View>
  );
}

export default SettingTemp;
