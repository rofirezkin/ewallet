('use strict');
import axios from 'axios';
import React, {PureComponent} from 'react';
import {
  StyleSheet,
  Text,
  ToastAndroid,
  TouchableOpacity,
  View,
} from 'react-native';
import {RNCamera} from 'react-native-camera';
import {Header} from '../../components';

class QrPay extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: false,
    };
  }

  cekKodeMerchant = kodeMerchat => {
    this.setState({isLoading: true});
    console.log('erropr kode merchat', kodeMerchat);
    // const data = {
    //   kode_merchant: kodeMerchat,
    // };
    // axios
    //   .get(
    //     `https://emoneydti.basicteknologi.co.id/index.php/api/merchant/?kode_merchant=${kodeMerchat}`,
    //     data,
    //   )
    //   .then(response => {
    //     // handle success

    //     if (response.data.status == 'true') {
    //       this.props.navigation.navigate('PaymentConfirmation', {
    //         data: response.data.data,
    //       });
    //     } else {
    //       ToastAndroid.show('Mercanb gafda', ToastAndroid.SHORT);
    //     }
    //     console.log('sice', response.data);
    //   })
    //   .catch(function (error) {
    //     // handle error
    //     console.log(error);
    //   })
    //   .then(function () {
    //     this.setState({isLoading: false});
    //   });
  };

  render() {
    return (
      <View style={styles.container}>
        <Header
          title="QR Code"
          onPress={() => this.props.navigation.goBack()}
        />
        <RNCamera
          ref={ref => {
            this.camera = ref;
          }}
          style={styles.preview}
          type={RNCamera.Constants.Type.back}
          flashMode={RNCamera.Constants.FlashMode.on}
          androidCameraPermissionOptions={{
            title: 'Permission to use camera',
            message: 'We need your permission to use your camera',
            buttonPositive: 'Ok',
            buttonNegative: 'Cancel',
          }}
          androidRecordAudioPermissionOptions={{
            title: 'Permission to use audio recording',
            message: 'We need your permission to use your audio',
            buttonPositive: 'Ok',
            buttonNegative: 'Cancel',
          }}
          onBarCodeRead={barcode => {
            if (this.state.isLoading == false) {
              if (barcode.type == 'QR_CODE') {
                console.log('data tenant ', barcode);
                this.cekKodeMerchant(barcode.data);
              }
            }
          }}
        />
        <View
          style={{
            flex: 0,
            flexDirection: 'row',
            justifyContent: 'center',
          }}></View>
      </View>
    );
  }

  takePicture = async () => {
    if (this.camera) {
      const options = {quality: 0.5, base64: true};
      const data = await this.camera.takePictureAsync(options);
      console.log(data.uri);
    }
  };
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: 'black',
  },
  preview: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  capture: {
    flex: 0,
    backgroundColor: '#fff',
    borderRadius: 5,
    padding: 15,
    paddingHorizontal: 20,
    alignSelf: 'center',
    margin: 20,
  },
});

export default QrPay;
