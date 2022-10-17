import React, {useState} from 'react';
import {
  Alert,
  PermissionsAndroid,
  Platform,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {useIsFocused} from '@react-navigation/native';

import {
  CameraOptions,
  launchCamera,
  launchImageLibrary,
  MediaType,
} from 'react-native-image-picker';
import Ionicons from 'react-native-vector-icons/Ionicons';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
});

function PostingScreen() {
  const [filePath, setFilePath] = useState({});

  const reqCameraPermission = async () => {
    if (Platform.OS === 'android') {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.Camera,
          {
            title: 'Camera Permission',
            message: 'App needs camera permission',
            buttonPositive: 'Positive',
          },
        );
        return granted === PermissionsAndroid.RESULTS.granted;
      } catch (error) {
        console.log('Android permission err ', error);
        return false;
      }
    } else {
      return true;
    }
  };

  const reqExtWritePermission = async () => {
    if (Platform.OS === 'android') {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
          {
            title: 'Storage Permission',
            message: 'App needs write permission',
            buttonPositive: 'Positive',
          },
        );
        return granted === PermissionsAndroid.RESULTS.granted;
      } catch (error) {
        console.log('Android permission err ', error);
        return false;
      }
    } else {
      return true;
    }
  };

  const captureImage = async (type: MediaType) => {
    let options = {
      mediaType: type,
      maxWidth: 300,
      maxHeight: 550,
      quality: 1,
      videoQuality: 'low',
      durationLimit: 30, //Video max duration in seconds
      saveToPhotos: true,
    } as CameraOptions;
    //  let isCameraPermitted = await reqCameraPermission();
    //  let isStoragePermitted = await reqExtWritePermission();

    launchCamera(options, response => {
      console.log('Response ', response);
      if (response.didCancel) {
        Alert.alert('Notice', 'User cancelled camera');
        return;
      } else if (response.errorCode === 'camera_unavailable') {
        Alert.alert('Warning', 'Camera not available');
        return;
      } else if (response.errorCode === 'permission') {
        Alert.alert('Warning', 'Permission not satisfied');
        return;
      } else if (response.errorCode === 'others') {
        console.error('err', response.errorMessage);
        return;
      }
      setFilePath(response);
    });

    // if (isCameraPermitted && isStoragePermitted) {
    //   launchCamera(options, response => {
    //     console.log('Response ', response);
    //     if (response.didCancel) {
    //       Alert.alert('Notice', 'User cancelled camera');
    //       return;
    //     } else if (response.errorCode === 'camera_unavailable') {
    //       Alert.alert('Warning', 'Camera not available');
    //       return;
    //     } else if (response.errorCode === 'permission') {
    //       Alert.alert('Warning', 'Permission not satisfied');
    //       return;
    //     } else if (response.errorCode === 'others') {
    //       console.error('err', response.errorMessage);
    //       return;
    //     }
    //     setFilePath(response);
    //   });
    // }
  };

  const createThreeButtonAlert = () =>
    Alert.alert('Alert Title', 'My Alert Msg', [
      {
        text: 'Cancel',
        onPress: () => console.log('Cancel Pressed'),
        style: 'cancel',
      },
      {
        text: 'Take a photo',
        onPress: () => captureImage('photo'),
      },
      {
        text: 'Choose from gallery',
        onPress: () => console.log('Gallery pressed'),
      },
    ]);

  const isFocused = useIsFocused();
  isFocused ? createThreeButtonAlert() : null;

  return (
    <View style={styles.container}>
      <Ionicons
        name="camera"
        size={180}
        color="grey"
        style={{
          marginTop: 34,
          alignSelf: 'center',
        }}
      />
      <Pressable
        onPress={createThreeButtonAlert}
        style={{
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <Text>Add Image</Text>
      </Pressable>
    </View>
  );
}

export default PostingScreen;
