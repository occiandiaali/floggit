import React, {useState} from 'react';
import {
  Alert,
  Button,
  Image,
  KeyboardAvoidingView,
  PermissionsAndroid,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  ToastAndroid,
  View,
} from 'react-native';
import {useIsFocused} from '@react-navigation/native';
//import {v4 as uuidv4} from 'uuid';
//import firebase from '@react-native-firebase/app';
import storage from '@react-native-firebase/storage';
import {
  CameraOptions,
  ImageLibraryOptions,
  launchCamera,
  launchImageLibrary,
  MediaType,
} from 'react-native-image-picker';
import Ionicons from 'react-native-vector-icons/Ionicons';
import CustomDropDown from '../../components/molecules/customDropDown';

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
  const [uploading, setUploading] = useState(false);
  const [transferred, setTransferred] = useState(0);

  const showToast = (msg: string) => {
    ToastAndroid.showWithGravity(msg, ToastAndroid.LONG, ToastAndroid.BOTTOM);
  };

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
  };

  const chooseFile = (type: MediaType) => {
    let options = {
      mediaType: type,
      maxWidth: 300,
      maxHeight: 550,
      quality: 1,
    } as ImageLibraryOptions;
    launchImageLibrary(options, response => {
      if (response.didCancel) {
        Alert.alert('User cancelled image selector!');
        return;
      } else if (response.errorCode === 'camera_unavailable') {
        Alert.alert('Camera not available..');
        return;
      } else if (response.errorCode === 'permission') {
        Alert.alert('Permission not given');
        return;
      } else if (response.errorCode === 'others') {
        Alert.alert(response.errorMessage);
        return;
      }
      response.assets?.map(m => {
        console.log(`${m.uri}`);
        setImagePath(m.uri);
        // console.log(`${m.fileName}`);
        // console.log(`${m.base64}`);
      });
    });
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
        onPress: () => chooseFile('photo'),
      },
    ]);

  const isFocused = useIsFocused();
  isFocused && imagePath === '' ? createThreeButtonAlert() : null;

  const uploadPost = async () => {
    const filename = imagePath.substring(imagePath.lastIndexOf('-') + 1);
    const uploadUri =
      Platform.OS === 'ios' ? imagePath.replace('file://', '') : imagePath;
    //const id = uuidv4();

    setUploading(true);
    setTransferred(0);

    const task = storage().ref(`images/${filename}`).putFile(uploadUri);

    task.on('state_changed', snapshot => {
      setTransferred(
        Math.round((snapshot.bytesTransferred * 100) / snapshot.totalBytes),
      );
    });

    try {
      await task;
    } catch (error) {
      console.log('Task err====================================');
      console.log(error);
      console.log('====================================');
    }
    setUploading(false);
    Platform.OS === 'android'
      ? showToast('Image has been uploaded!')
      : Alert.alert('Success!', 'Image has been uploaded!');
    // Alert.alert('Success!', 'Image has been uploaded!');
    setImagePath('');
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'android' ? 'height' : 'padding'}
      style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {imagePath !== '' ? (
          <View style={{padding: 8}}>
            <Image
              source={{uri: imagePath}}
              style={{width: '100%', height: 350}}
            />
            <CustomDropDown label="Select category" />
            <TextInput
              placeholder="Item title"
              textAlignVertical={Platform.OS === 'android' ? 'top' : 'auto'}
              style={{
                borderWidth: 1,
                lineHeight: 8,
                borderColor: 'grey',
                marginTop: 12,
                paddingLeft: 12,
              }}
            />
            <TextInput
              placeholder="Asking price"
              textAlignVertical={Platform.OS === 'android' ? 'top' : 'auto'}
              keyboardType="number-pad"
              style={{
                borderWidth: 1,
                lineHeight: 8,
                borderColor: 'grey',
                marginTop: 12,
                paddingLeft: 12,
              }}
            />
            <TextInput
              multiline={true}
              numberOfLines={3}
              textAlignVertical={Platform.OS === 'android' ? 'top' : 'auto'}
              placeholder="Describe the item.."
              style={{
                borderWidth: 1,
                borderColor: 'grey',
                marginTop: 8,
                paddingLeft: 12,
              }}
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
              {uploading ? (
                <View style={styles.progress}>
                  <Text style={{fontSize: 25, fontWeight: 'bold'}}>
                    {transferred}%
                  </Text>
                </View>
              ) : (
                <Button onPress={uploadPost} title="publish" />
              )}
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
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

export default PostingScreen;
