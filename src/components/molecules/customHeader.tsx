import {StyleSheet, Text, View} from 'react-native';
import React from 'react';

const styles = StyleSheet.create({
  appName: {
    fontSize: 32,
    color: 'teal',
    fontWeight: 'bold',
  },
  headerContainer: {
    width: '100%',
    height: 60,
    backgroundColor: 'white',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingTop: 8,
    paddingLeft: 12,
    paddingRight: 8,
  },
  userLabel: {
    paddingVertical: 16,
    fontSize: 15,
  },
});

const CustomHeaderComponent = () => {
  const userName = 'fineboi@work.com';
  return (
    <View style={styles.headerContainer}>
      <Text style={styles.appName}>brtr</Text>
      <Text style={styles.userLabel}>{userName}</Text>
    </View>
  );
};

export default CustomHeaderComponent;
