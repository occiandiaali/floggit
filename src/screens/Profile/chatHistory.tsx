import {FlatList, Image, Pressable, StyleSheet, Text, View} from 'react-native';
import React from 'react';

const styles = StyleSheet.create({
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  container: {
    flex: 1,
    paddingTop: 22,
    backgroundColor: '#FFF',
  },
  hintText: {
    fontSize: 16,
    left: 13,
    top: 13,
  },
  row: {
    flexDirection: 'row',
    padding: 8,
  },
});

const DATA = [
  {
    id: 1,
    img: 'https://images.pexels.com/photos/3763188/pexels-photo-3763188.jpeg',
    hint: 'How much for the item without packaging?',
  },
  {
    id: 2,
    img: 'https://images.pexels.com/photos/3763188/pexels-photo-3763188.jpeg',
    hint: 'How much for the item without packaging?',
  },
  {
    id: 3,
    img: 'https://images.pexels.com/photos/3763188/pexels-photo-3763188.jpeg',
    hint: 'How much for the item without packaging?',
  },
  {
    id: 4,
    img: 'https://images.pexels.com/photos/3763188/pexels-photo-3763188.jpeg',
    hint: 'How much for the item without packaging?',
  },
  {
    id: 5,
    img: 'https://images.pexels.com/photos/3763188/pexels-photo-3763188.jpeg',
    hint: 'How much for the item without packaging?',
  },
];

const Item = ({img, hint}) => (
  <Pressable style={styles.row}>
    <Image source={{uri: img}} style={styles.avatar} />
    <Text style={styles.hintText}>{hint}</Text>
  </Pressable>
);

const ChatHistory = () => {
  const renderItem = ({item}) => <Item img={item.img} hint={item.hint} />;
  return (
    <View style={styles.container}>
      <FlatList data={DATA} renderItem={renderItem} />
    </View>
  );
};

export default ChatHistory;
