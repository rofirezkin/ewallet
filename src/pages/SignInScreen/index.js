import React, {useEffect, useState} from 'react';
import {Image, View} from 'react-native';

import {Button, Gap, Link, TextInput} from './../../components';
import {IcLogoDepan, Logo} from './../../assets';

import axios from 'axios';

import {AuthContext} from './../Context';

function SignInScreen({navigation}) {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');

  const {signIn} = React.useContext(AuthContext);

  const onSubmit = () => {
    const data = {email, password};
    axios.post(
      'https://emoneydti.basicteknologi.co.id/index.php/api/users/login',
      data,
    );
  };

  return (
    <View style={{flex: 1, backgroundColor: 'white'}}>
      <View style={{paddingHorizontal: 25, flex: 1, justifyContent: 'center'}}>
        <View
          style={{
            backgroundColor: '#005690',
            alignSelf: 'center',
            padding: 15,
            borderRadius: 93 / 2,
          }}>
          <Image
            source={Logo}
            style={{
              width: 93,
              height: 80,
            }}
          />
        </View>
        <Gap height={30} />
        <TextInput
          placeholder="Username"
          value={email}
          onChangeText={value => setEmail(value)}
        />
        <TextInput
          placeholder="Password"
          value={password}
          onChangeText={value => setPassword(value)}
          secureTextEntry
        />
        <Gap height={30} />
        <Button title="Sign in" onPress={() => signIn({email, password})} />
        <Gap height={30} />
        <View style={{alignSelf: 'center'}}>
          <Link
            size={20}
            title="Register"
            onPress={() => navigation.navigate('SignUp')}
          />
        </View>
      </View>
    </View>
  );
}

export default SignInScreen;
