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
import Ionicon from 'react-native-vector-icons/Ionicons';

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
  fab: {
    // width: 150,
    height: 50,
    backgroundColor: 'steelblue',
    borderRadius: 12,
    position: 'absolute',
    alignSelf: 'flex-end',
    bottom: 26,
    right: 16,
    elevation: 5,
  },
  fabText: {
    textAlign: 'center',
    textAlignVertical: 'center',
    paddingTop: 8,
    fontSize: 18,
    fontWeight: 'bold',
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
  const [fabWidth, setFabWidth] = React.useState(150);
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

  const flip = () => (fabWidth === 150 ? setFabWidth(70) : setFabWidth(150));

  return (
    <View style={styles.container}>
      {isLoading ? (
        <ActivityIndicator size={'large'} />
      ) : (
        <>
          <FlatList
            data={info}
            renderItem={renderItem}
            keyExtractor={item => item.id}
            onScrollBeginDrag={flip}
          />
          <View style={[styles.fab, {width: fabWidth}]}>
            <Pressable
              style={{flexDirection: 'row', justifyContent: 'space-evenly'}}
              onPress={() => console.log('Fab pressed..')}>
              <Ionicon
                name="pencil-outline"
                size={24}
                style={{paddingTop: 10}}
              />
              {fabWidth === 150 ? (
                <Text style={styles.fabText}>Compose</Text>
              ) : null}
            </Pressable>
          </View>
        </>
      )}
    </View>
  );
};

export default ChatHistory;
