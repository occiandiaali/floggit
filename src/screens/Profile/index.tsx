import React, {useContext, useEffect, useState} from 'react';
import {
  Alert,
  Image,
  Modal,
  Pressable,
  StyleSheet,
  Text,
  ToastAndroid,
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
import firestore from '@react-native-firebase/firestore';

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
  const [text, setText] = useState('username');
  const [user, setUser] = useState<string | null | undefined>(text);
  // const [userEmail, setUserEmail] = useState('fineboi@work.com');
  const [userEmail, setUserEmail] = useState<string | null | undefined>('');
  const [modalVisible, setModalVisible] = useState(false);
  const [imagePath, setImagePath] = useState<string | undefined>('');

  const {setAuthed} = useContext(AppContext);
  const showToast = (msg: string) => {
    ToastAndroid.showWithGravity(msg, ToastAndroid.LONG, ToastAndroid.BOTTOM);
  };

  const storeAvatar = async (value: string) => {
    try {
      await AsyncStorage.setItem('@avatar_Key', value);
    } catch (error) {
      console.log('Store avatar====================================');
      console.log(error);
      console.log('====================================');
    }
  };
  const setProfileImg = async (value: string | undefined) => {
    await firestore().collection('Users').doc(auth().currentUser?.uid).update({
      profileImg: value,
    });
    // storeAvatar(value ?? '');
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
        setImagePath(m?.uri);
        setProfileImg(m?.uri);
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
        setImagePath(m?.uri);
        setProfileImg(m?.uri);
        // storeAvatar(m?.uri);
        // console.log(`${m.fileName}`);
        // console.log(`${m.base64}`);
      });
    });
  };

  const createThreeButtonAlert = () =>
    Alert.alert('Image selector', 'How do you wish to proceed?', [
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
  const getAvatar = async () => {
    try {
      const value1 = await AsyncStorage.getItem('@avatar_Key');
      if (value1 !== '' || value1 !== null) {
        setImagePath(value1 ?? '');
      }
      const value2 = await AsyncStorage.getItem('@username_Key');
      if (value2 !== '' || value2 !== null) {
        setUser(value2);
      }
    } catch (error) {
      console.log('Avatar get err====================================');
      console.log(error);
      console.log('====================================');
    }
  };
  // const localStoreUsernameAndAvatar = async (
  //   theUsername: string,
  //   avatar: string,
  // ) => {
  //   try {
  //     await AsyncStorage.removeItem('@username_Key');
  //     await AsyncStorage.removeItem('@avatar_Key');
  //     await AsyncStorage.setItem('@username_Key', theUsername);
  //     await AsyncStorage.setItem('@avatar_Key', avatar);
  //   } catch (error) {
  //     console.log(
  //       'Avatar/username asyncstorage err====================================',
  //     );
  //     console.log(error);
  //     console.log('====================================');
  //   }
  // };
  const getUserDetails = async () => {
    await firestore()
      .collection('Users')
      .get()
      .then(querySnapshot => {
        querySnapshot.forEach(item => {
          setUserEmail(item.data().usermail);
          setUser(item.data().username);
          setImagePath(item.data().profileImg);
          //  localStoreUsernameAndAvatar(user ?? '', imagePath ?? '');
        });
      });
  };

  useEffect(() => {
    try {
      const unsubscribe = navigation.addListener('focus', () => {
        getUserDetails();
      });
      return unsubscribe;
    } catch (error) {
      console.log(error);
    }
    // getAvatar();
  }, [navigation]);

  const updateStoreUsername = value => {
    if (!text.trim()) {
      Alert.alert('Notice', 'We changed nothing, because you typed nothing!');
      return;
    } else {
      // setUser(value);
      // localUpdateUsername(value);
      firestore()
        .collection('Users')
        .doc(auth().currentUser?.uid)
        .update({
          username: value,
        })
        .then(() => {
          navigation.navigate('Home');
          showToast('Username updated!');
        })
        .catch(e => console.log('Username update err: ', e));
      // auth().currentUser?.updateProfile({
      //   displayName: user,
      // });
    }
  };

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
          {!imagePath ? (
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
          <Text style={styles.labels}>history</Text>
          <Ionicon
            name="images"
            size={24}
            onPress={() => navigation.navigate('Uploads')}
          />
        </View>

        <View style={styles.bioLine}>
          <Text style={styles.labels}>chats</Text>
          <Ionicon name="chatbox" size={24} onPress={() => null} />
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
              updateStoreUsername(text);
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
