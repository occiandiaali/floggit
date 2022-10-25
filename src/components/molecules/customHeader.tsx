import {StyleSheet, Text, View} from 'react-native';
import React, {useContext} from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {AppContext} from '../../redux/contexts';

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
  const userName = 'fineboi@work.com';
  const {setAuthed} = useContext(AppContext);
  const signOut = () => setAuthed(false);

  return (
    <View style={styles.headerContainer}>
      <Text style={styles.appName}>brtr</Text>
      <View style={styles.endItems}>
        <Text style={styles.userLabel}>{userName}</Text>
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
