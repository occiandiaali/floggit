import React from 'react';
import {StyleSheet, Text, View} from 'react-native';

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
});

function HomeScreen() {
  return (
    <View style={styles.wrapper}>
      <Text>HomeScreen</Text>
    </View>
  );
}

export default HomeScreen;
