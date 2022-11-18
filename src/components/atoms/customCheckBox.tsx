import {Pressable, StyleSheet, Text, View} from 'react-native';
import React from 'react';

import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const styles = StyleSheet.create({
  container: {
    justifyContent: 'flex-start',
    alignItems: 'center',
    flexDirection: 'row',
    width: 60,
    marginTop: 5,
    marginHorizontal: 5,
  },
  title: {
    fontSize: 16,
    color: '#000',
    marginLeft: 5,
    fontWeight: '600',
  },
});

const CheckBox = ({isChecked, onPress, title}) => {
  const iconName = isChecked ? 'checkbox-marked' : 'checkbox-blank-outline';
  // const iconName = !isChecked ? 'checkbox-blank-outline' : 'checkbox-marked';
  return (
    <View style={styles.container}>
      <Pressable onPress={onPress}>
        <MaterialCommunityIcons name={iconName} size={24} color="#000" />
      </Pressable>
      <Text style={styles.title}>{title}</Text>
    </View>
  );
};

export default CheckBox;
