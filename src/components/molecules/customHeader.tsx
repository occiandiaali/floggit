import {StyleSheet, Text, View} from 'react-native';
import React, {useContext, useEffect, useState} from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {AppContext} from '../../redux/contexts';
import AsyncStorage from '@react-native-async-storage/async-storage';
import auth from '@react-native-firebase/auth';

const styles = StyleSheet.create({
  appName: {
    fontSize: 32,
    color: 'teal',
    fontWeight: 'bold',
  },
  endItems: {
    flex: 3,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
    bottom: 6,
  },
  headerContainer: {
    width: '100%',
    height: 60,
    backgroundColor: 'white',
    flexDirection: 'row',
    // justifyContent: 'space-evenly',
    paddingTop: 8,
    paddingLeft: 12,
    paddingRight: 8,
  },
  logoutIcon: {
    bottom: 4,
    right: 4,
  },
  userLabel: {
    paddingVertical: 8,
    right: 12,
    fontSize: 15,
    fontWeight: 'bold',
  },
});

const CustomHeaderComponent = () => {
  // const userName = 'fineboi@work.com';
  const {setAuthed} = useContext(AppContext);

  const signOut = () => {
    setAuthed(false);
    auth().signOut();
  };
  const [email, setEmail] = useState('');
  const [user, setUser] = useState('');
  // const getData = async () => {
  //   try {
  //     const value = await AsyncStorage.getItem('@email_Key');
  //     if (value !== null) {
  //       setEmail(value);
  //     }
  //   } catch (error) {
  //     console.log('Header====================================');
  //     console.log(error);
  //     console.log('====================================');
  //   }
  // };

  useEffect(() => {
    // getData();
    const subscriber = auth().onAuthStateChanged(user => {
      console.log('User ', JSON.stringify(user?.displayName));
      setEmail(user?.email);
      setUser(user?.displayName);
    });
    return subscriber;
  }, []);

  return (
    <View style={styles.headerContainer}>
      <Text style={styles.appName}>qrnr</Text>
      <View style={styles.endItems}>
        <Text style={styles.userLabel}>Hi, {user ? user : email}</Text>
        <Ionicons
          name="log-out"
          size={24}
          onPress={signOut}
          style={styles.logoutIcon}
        />
      </View>
    </View>
  );
};

export default CustomHeaderComponent;
