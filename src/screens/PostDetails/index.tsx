import {Image, Pressable, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import firestore from '@react-native-firebase/firestore';

import Ionicons from 'react-native-vector-icons/Ionicons';

const styles = StyleSheet.create({
  arrow: {
    position: 'absolute',
    top: 6,
    alignSelf: 'center',
    color: 'white',
    paddingBottom: 12,
    zIndex: 7,
  },
  container: {
    flex: 1,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
  },
  imageOverlay: {
    position: 'absolute',
    height: 110,
    width: '100%',
    top: 0,
    backgroundColor: '#000',
    opacity: 0.5,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'flex-end',
  },
  label: {
    fontSize: 21,
    position: 'absolute',
    left: 20,
    color: 'white',
    paddingBottom: 12,
    zIndex: 7,
  },
  pressable: {
    width: 100,
    height: 40,
    borderRadius: 8,
    backgroundColor: 'pink',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 24,
  },
  rowOne: {
    padding: 6,
    flexDirection: 'row',
    bottom: '25%',
  },
  rowTwo: {
    flexDirection: 'row',
    padding: 6,
    bottom: '10%',
  },
  rowThree: {
    flexDirection: 'row',
  },
  timestamp: {
    fontSize: 16,
    color: '#FFF',
    bottom: 13,
    left: 100,
  },
});

const PostDetails = ({route, navigation}) => {
  const {itemCreation, itemDesc, itemImg, itemPrice, itemName, userid} =
    route.params;
  const [owner, setOwner] = React.useState('');
  const [ownerImg, setOwnerImg] = React.useState(null);

  const res = itemCreation.toDate().toISOString();
  const ans = res.slice(0, res.indexOf('T'));

  React.useEffect(() => {
    firestore()
      .collection('Users')
      .doc(userid)
      .get()
      .then(d => {
        console.log('User details username ', d.data().username);
        setOwnerImg(d.data().profileImg);
        setOwner(d.data().username);
      })
      .catch(e => console.log(e));
  }, [ans, userid]);

  return (
    <View style={styles.container}>
      <View
        style={{
          backgroundColor: '#000',
          opacity: 0.4,
          width: 45,
          height: 45,
          borderRadius: 23,
          position: 'absolute',
          right: 24,
          zIndex: 7,
        }}>
        <Ionicons
          onPress={() => navigation.goBack()}
          name="arrow-back"
          size={32}
          style={styles.arrow}
        />
      </View>
      <Image
        source={{
          uri: itemImg,
        }}
        style={{width: 550, height: '62%', bottom: '16%'}}
      />
      <View style={styles.imageOverlay}>
        <Text style={styles.label}>{itemName}</Text>
        <Text style={styles.timestamp}>Posted on {ans}</Text>
      </View>
      <View style={styles.rowOne}>
        <Image
          source={{
            // uri: 'https://images.pexels.com/photos/10450623/pexels-photo-10450623.jpeg',
            uri: ownerImg,
          }}
          style={{
            width: 30,
            height: 30,
            borderRadius: 15,
            marginRight: 8,
            bottom: 6,
          }}
        />
        <Text style={{marginRight: '10%', fontSize: 16}}>{owner}</Text>
        <Text
          style={{
            marginLeft: '6%',
            fontSize: 16,
            fontWeight: 'bold',
            color: 'black',
          }}>
          {new Intl.NumberFormat('ng-NG', {
            style: 'currency',
            currency: 'NGN',
          }).format(itemPrice)}
        </Text>
      </View>
      <View style={styles.rowTwo}>
        <Text style={{fontSize: 18}}>{itemDesc}</Text>
      </View>
      <View style={styles.rowThree}>
        <Pressable onPress={() => null} style={styles.pressable}>
          <Text style={{fontWeight: 'bold', fontSize: 18}}>bid</Text>
        </Pressable>
        <Pressable
          onPress={() => navigation.navigate('Chat')}
          style={styles.pressable}>
          <Text style={{fontWeight: 'bold', fontSize: 18}}>negotiate</Text>
        </Pressable>
      </View>
    </View>
  );
};

export default PostDetails;
