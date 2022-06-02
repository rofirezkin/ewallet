import React, {useEffect, useState} from 'react';
import {Image, ScrollView, Text, ToastAndroid, View} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {createMaterialBottomTabNavigator} from '@react-navigation/material-bottom-tabs';
import {
  Button,
  FeatureSection,
  Gap,
  Link,
  ListTransaction,
  TextInput,
} from './components';
import {IcLogoDepan, Logo} from './assets';
import {
  SignUp,
  SplashScreen,
  SignInScreen,
  TopUpScreen,
  TopUpSuccess,
  Transaction,
  QrPay,
  PaymentConfirmation,
  PaymentSuccess,
  Transfer,
  TransferProcess,
  SuccessTransfer,
  SettingTemp,
  HomeScreen,
} from './pages';
import axios from 'axios';
import {FlatList} from 'react-native-gesture-handler';
import {AuthContext} from './pages/Context';

const Tab = createMaterialBottomTabNavigator();
const MainTab = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen
        component={HomeScreen}
        options={{
          tabBarLabel: 'Home',
          tabBarIcon: ({color}) => <Icon name="home" color={color} size={26} />,
        }}
        name="HomeScreen"
      />
      <Tab.Screen
        options={{
          tabBarLabel: 'Transaction',
          tabBarIcon: ({color}) => (
            <Icon name="exchange" color={color} size={26} />
          ),
        }}
        name="Transaction"
        component={Transaction}
      />
      <Tab.Screen
        options={{
          tabBarLabel: 'Settiing',
          tabBarIcon: ({color}) => <Icon name="cog" color={color} size={26} />,
        }}
        name="SettingTemp"
        component={SettingTemp}
      />
    </Tab.Navigator>
  );
};

const Stack = createNativeStackNavigator();

export default function App({navigation}) {
  const [state, dispatch] = React.useReducer(
    (prevState, action) => {
      switch (action.type) {
        case 'RESTORE_TOKEN':
          return {
            ...prevState,
            userToken: action.token,
            isLoading: false,
          };
        case 'SIGN_IN':
          return {
            ...prevState,
            isSignout: false,
            userToken: action.token,
          };
        case 'SIGN_OUT':
          return {
            ...prevState,
            isSignout: true,
            userToken: null,
          };
      }
    },
    {
      isLoading: true,
      isSignout: false,
      userToken: null,
    },
  );

  React.useEffect(() => {
    // Fetch the token from storage then navigate to our appropriate place
    const bootstrapAsync = async () => {
      var userToken;

      try {
        userToken = await AsyncStorage.getItem('token');

        // Restore token stored in `SecureStore` or any other encrypted storage
        // userToken = await SecureStore.getItemAsync('userToken');
      } catch (e) {
        // Restoring token failed
      }

      // After restoring token, we may need to validate it in production apps

      // This will switch to the App screen or Auth screen and this loading
      // screen will be unmounted and thrown away.
      setTimeout(() => {
        dispatch({type: 'RESTORE_TOKEN', token: userToken});
      }, 3000);
    };

    bootstrapAsync();
  }, []);

  const checkAtuh = (email, password) => {
    if (email === 'rofi' && password === '123') {
      return true;
    } else {
      return false;
    }
  };

  const authContext = React.useMemo(
    () => ({
      signIn: async data => {
        // In a production app, we need to send some data (usually username, password) to server and get a token
        // We will also need to handle errors if sign in failed
        // After getting token, we need to persist the token using `SecureStore` or any other encrypted storage
        // In the example, we'll use a dummy token
        // axios
        //   .post(
        //     'https://emoneydti.basicteknologi.co.id/index.php/api/users/login',
        //     {
        //       email: data.email,
        //       password: data.password,
        //     },
        //   )
        //   .then(async res => {
        //     if (res.data.status == 'true') {
        //       try {
        //         const jsonValue = JSON.stringify(res.data.data);
        //         await AsyncStorage.setItem('token', res.data.data.id_user);
        //         await AsyncStorage.setItem('userData', jsonValue);
        //         ToastAndroid.show('Selamat Datang Ress', ToastAndroid.LONG);
        //         dispatch({type: 'SIGN_IN', token: res.data.data.id_user});
        //       } catch (e) {
        //         // saving error
        //         alert('login gagal');
        //       }
        //     } else {
        //       alert('login gagal');
        //     }
        //   })
        //   .catch(err => {
        //     alert('login gagal');
        //   });

        if (checkAtuh(data.email, data.password)) {
          try {
            await AsyncStorage.setItem('token', 'dummy-auth-token');
            dispatch({type: 'SIGN_IN', token: 'dummy-auth-token'});
          } catch (e) {
            // saving error
          }
        } else {
          alert('login gagal');
        }
      },
      signOut: async () => {
        try {
          await AsyncStorage.removeItem('token');
          dispatch({type: 'SIGN_OUT'});
        } catch (e) {
          // remove error
        }
      },
      signUp: async data => {
        // In a production app, we need to send user data to server and get a token
        // We will also need to handle errors if sign up failed
        // After getting token, we need to persist the token using `SecureStore` or any other encrypted storage
        // In the example, we'll use a dummy token

        dispatch({type: 'SIGN_IN', token: 'dummy-auth-token'});
      },
    }),
    [],
  );

  return (
    <AuthContext.Provider value={authContext}>
      <NavigationContainer>
        <Stack.Navigator>
          {state.isLoading ? (
            // We haven't finished checking for the token yet
            <Stack.Screen
              options={{headerShown: false}}
              name="SplashScreen"
              component={SplashScreen}
            />
          ) : state.userToken == null ? (
            // No token found, user isn't signed in
            <Stack.Screen
              name="SignIn"
              component={SignInScreen}
              options={{
                headerShown: false,
                title: 'Sign in',
                // When logging out, a pop animation feels intuitive
                animationTypeForReplace: state.isSignout ? 'pop' : 'push',
              }}
            />
          ) : (
            // User is signed in
            <Stack.Screen
              options={{headerShown: false}}
              name="MainTab"
              component={MainTab}
            />
          )}
          <Stack.Screen
            name="SignUp"
            component={SignUp}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="TopUpScreen"
            component={TopUpScreen}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="TopUpSuccess"
            component={TopUpSuccess}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="QrPay"
            component={QrPay}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="PaymentConfirmation"
            component={PaymentConfirmation}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="PaymentSuccess"
            component={PaymentSuccess}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="SuccessTransfer"
            component={SuccessTransfer}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="Transfer"
            component={Transfer}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="TransferProcess"
            component={TransferProcess}
            options={{headerShown: false}}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </AuthContext.Provider>
  );
}
