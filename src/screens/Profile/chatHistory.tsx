import {
  ActivityIndicator,
  FlatList,
  Image,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React from 'react';

import {useGetAllProductsQuery, useGetProductQuery} from '../../redux/apiSlice';

const styles = StyleSheet.create({
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  container: {
    flex: 1,
    paddingTop: 22,
    paddingLeft: 12,
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
  const [info, setInfo] = React.useState([]);
  const {
    data: allProductsData,
    error,
    isError,
    isLoading,
    refetch,
  } = useGetAllProductsQuery();
  // const {data: singleProductData} = useGetProductQuery('iphone');
  React.useEffect(() => {
    if (allProductsData) {
      console.log('Products query: ', allProductsData);
      refetch();
      setInfo(allProductsData.products);
    }
  }, [allProductsData, refetch]);
  // const renderItem = ({item}) => <Item img={item.img} hint={item.hint} />;
  const renderItem = ({item}) => (
    <Item img={item.thumbnail} hint={item.title} />
  );
  return (
    <View style={styles.container}>
      {isLoading ? (
        <ActivityIndicator size={'large'} />
      ) : (
        <FlatList
          data={info}
          renderItem={renderItem}
          keyExtractor={item => item.id}
        />
      )}
    </View>
  );
};

export default ChatHistory;
