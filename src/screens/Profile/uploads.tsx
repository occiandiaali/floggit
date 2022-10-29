import {StyleSheet, Text, View} from 'react-native';
import React from 'react';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 6,
  },
  item: {
    width: 170,
    height: 170,
    margin: 6,
    backgroundColor: 'teal',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

const info = [
  {
    id: 0,
    label: 'One',
  },
  {
    id: 1,
    label: 'Two',
  },
  {
    id: 2,
    label: 'Three',
  },
  {
    id: 3,
    label: 'Four',
  },
  {
    id: 4,
    label: 'Five',
  },
  {
    id: 5,
    label: 'Six',
  },
];

const UploadScreen = () => {
  return (
    <View style={styles.container}>
      {info.map(item => {
        return (
          <View key={item.id} style={styles.item}>
            <Text>{item.label}</Text>
          </View>
        );
      })}
    </View>
  );
};

export default UploadScreen;
