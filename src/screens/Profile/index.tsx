import React, {useContext, useState} from 'react';
import {Alert, Image, Modal, StyleSheet, Text, View} from 'react-native';
import {AppContext} from '../../redux/contexts';

import EditProfileModal from '../../components/molecules/EditProfileModal';

import Icon from 'react-native-vector-icons/Ionicons';
import Ionicon from 'react-native-vector-icons/Ionicons';

const styles = StyleSheet.create({
  avatar: {
    backgroundColor: 'yellow',
    width: 100,
    height: 100,
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  bioLine: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderBottomWidth: 0.9,
    borderBottomColor: 'grey',
    paddingBottom: 6,
    paddingTop: 4,
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
    fontSize: 24,
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

function ProfileScreen() {
  const [user, setUser] = useState('');
  const [userEmail, setUserEmail] = useState('fineboi@work.com');
  const [modalVisible, setModalVisible] = useState(false);

  const {setAuthed} = useContext(AppContext);

  const checkTextInput = () => {
    if (!user.trim()) {
      Alert.alert('Notice', 'We changed nothing, because you typed nothing!');
      return;
    }
  };
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        {user === 'god' ? (
          <Image
            style={styles.avatar}
            source={{uri: 'https://reactnative.dev/img/tiny_logo.png'}}
          />
        ) : (
          <View style={styles.avatar}>
            <Icon name="person-add" size={45} />
          </View>
        )}

        <Text style={styles.emailLabel}>{userEmail}</Text>
      </View>
      <View style={styles.userBio}>
        <View style={styles.bioLine}>
          <Text style={styles.labels}>full name</Text>
          <Ionicon
            name="create"
            size={24}
            onPress={() => setModalVisible(!modalVisible)}
          />
        </View>
        <View style={styles.bioLine}>
          <Text style={styles.labels}>user name</Text>
          <Ionicon
            name="create"
            size={24}
            onPress={() => setModalVisible(!modalVisible)}
          />
        </View>

        <View style={[styles.bioLine, {paddingTop: 36}]}>
          <Text onPress={() => setAuthed(false)} style={styles.labels}>
            log out
          </Text>
          <Ionicon onPress={() => setAuthed(false)} name="log-out" size={24} />
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
            onChangeText={u => setUser(u)}
            onSave={() => {
              checkTextInput();
              console.log('User ', user);
              setModalVisible(!modalVisible);
            }}
          />
        </Modal>
      </View>
    </View>
  );
}

export default ProfileScreen;
