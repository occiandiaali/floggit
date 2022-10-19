import React, {useState} from 'react';
import {
  Alert,
  Button,
  Image,
  PermissionsAndroid,
  Platform,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
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

type ImagePickerResponse = {
  uri?: string;
  fileName?: string;
};

function PostingScreen() {
  // const [filePath, setFilePath] = useState({});
  const [imagePath, setImagePath] = useState('');

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
      response.assets?.map(m => {
        console.log(`${m.uri}`);
        setImagePath(m.uri);
        // console.log(`${m.fileName}`);
        // console.log(`${m.base64}`);
      });
      // setFilePath(response);
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
  isFocused && imagePath === '' ? createThreeButtonAlert() : null;

  return (
    <View style={styles.container}>
      {/* <Ionicons
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
      </Pressable> */}
      {imagePath !== '' ? (
        <View style={{padding: 8}}>
          <Image
            source={{uri: imagePath}}
            style={{width: '100%', height: 400}}
          />
          <TextInput
            placeholder="Enter title.."
            style={{
              borderWidth: 1,
              lineHeight: 8,
              borderColor: 'grey',
              marginTop: 12,
            }}
          />
          <TextInput
            numberOfLines={6}
            placeholder="Description.."
            style={{borderWidth: 1, borderColor: 'grey', marginTop: 8}}
          />
          <View
            style={{
              paddingTop: 16,
              flexDirection: 'row',
              justifyContent: 'space-around',
            }}>
            <Ionicons
              name="trash"
              size={30}
              color="red"
              onPress={() => setImagePath('')}
            />
            <Button title="publish" />
          </View>
        </View>
      ) : (
        <>
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
        </>
      )}
    </View>
  );
}

export default PostingScreen;
