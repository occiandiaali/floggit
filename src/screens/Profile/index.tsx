import React, {useContext, useEffect, useState} from 'react';
import {
  Alert,
  Image,
  Modal,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {
  CameraOptions,
  ImageLibraryOptions,
  launchCamera,
  launchImageLibrary,
  MediaType,
} from 'react-native-image-picker';
import {AppContext} from '../../redux/contexts';

import EditProfileModal from '../../components/molecules/EditProfileModal';

import Icon from 'react-native-vector-icons/Ionicons';
import Ionicon from 'react-native-vector-icons/Ionicons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import auth from '@react-native-firebase/auth';

const styles = StyleSheet.create({
  avatar: {
    backgroundColor: 'pink',
    width: 100,
    height: 100,
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  bioLine: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderBottomWidth: 0.5,
    borderBottomColor: 'grey',
    paddingBottom: 8, //6,
    paddingTop: 8, //4,
  },
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  emailLabel: {
    top: 16,
    fontSize: 18,
  },
  header: {
    justifyContent: 'center',
    alignItems: 'center',
    top: '20%',
  },
  labels: {
    fontSize: 21,
  },
  centredView: {
    width: '100%',
    height: 350,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 45,
  },
  userBio: {
    padding: 6,
    top: '30%',
    width: '90%',
    alignSelf: 'center',
  },
});

function ProfileScreen({navigation}) {
  const [text, setText] = useState('');
  const [user, setUser] = useState('');
  // const [userEmail, setUserEmail] = useState('fineboi@work.com');
  const [userEmail, setUserEmail] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const [imagePath, setImagePath] = useState('');

  const {setAuthed} = useContext(AppContext);

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

  const getData = async () => {
    try {
      const value = await AsyncStorage.getItem('@email_Key');
      if (value !== null) {
        setUser(value);
      }
    } catch (error) {
      console.log('Header====================================');
      console.log(error);
      console.log('====================================');
    }
  };

  const checkTextInput = value => {
    if (!text.trim()) {
      Alert.alert('Notice', 'We changed nothing, because you typed nothing!');
      return;
    } else {
      setUser(value);
      auth().currentUser?.updateProfile({
        displayName: user,
      });
    }
  };

  // useEffect(() => {
  //   getData();
  // }, []);
  useEffect(() => {
    // getData();
    const subscriber = auth().onAuthStateChanged(user => {
      console.log('User ', JSON.stringify(user?.displayName));
      setUserEmail(user?.email);
      setUser(user?.displayName);
    });
    return subscriber;
  }, []);

  const logOut = () => {
    setAuthed(false);
    auth().signOut();
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        {/* {!user ? (
          <Image
            style={styles.avatar}
            source={{uri: 'https://reactnative.dev/img/tiny_logo.png'}}
          />
        ) : (
          <View style={styles.avatar}>
            <Icon name="person-add" size={45} />
          </View>
        )} */}
        <View style={styles.avatar}>
          {imagePath === '' ? (
            <Icon
              name="person-add"
              size={45}
              onPress={() => createThreeButtonAlert()}
            />
          ) : (
            <Pressable onPress={() => createThreeButtonAlert()}>
              <Image
                source={{uri: imagePath}}
                style={{width: 100, height: 100, borderRadius: 50}}
              />
            </Pressable>
          )}
        </View>

        <Text style={styles.emailLabel}>{userEmail}</Text>
        {/* <Text style={styles.emailLabel}>{user}</Text> */}
      </View>
      <View style={styles.userBio}>
        <View style={styles.bioLine}>
          <Text style={styles.labels}>{user}</Text>
          <Ionicon
            name="create"
            size={24}
            onPress={() => setModalVisible(!modalVisible)}
          />
        </View>
        {/* <View style={styles.bioLine}>
          <Text style={styles.labels}>{user}</Text>
          <Ionicon
            name="create"
            size={24}
            onPress={() => setModalVisible(!modalVisible)}
          />
        </View> */}
        <View style={styles.bioLine}>
          <Text style={styles.labels}>my uploads</Text>
          <Ionicon
            name="images"
            size={24}
            onPress={() => navigation.navigate('Uploads')}
          />
        </View>

        <View style={[styles.bioLine, {paddingTop: 36}]}>
          <Text onPress={logOut} style={styles.labels}>
            log out
          </Text>
          <Ionicon onPress={logOut} name="log-out" size={24} />
        </View>
      </View>
      <View style={styles.centredView}>
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => setModalVisible(!modalVisible)}>
          <EditProfileModal
            onClose={() => setModalVisible(!modalVisible)}
            onChangeText={u => setText(u)}
            onSave={() => {
              checkTextInput(text);
              console.log('Text ', text);
              setModalVisible(!modalVisible);
            }}
          />
        </Modal>
      </View>
    </View>
  );
}

export default ProfileScreen;
