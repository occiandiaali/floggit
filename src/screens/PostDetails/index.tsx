import {Image, Pressable, StyleSheet, Text, View} from 'react-native';
import React from 'react';

import Ionicons from 'react-native-vector-icons/Ionicons';

const styles = StyleSheet.create({
  arrow: {
    position: 'absolute',
    right: 20,
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
    backgroundColor: '#ABAAAA',
    opacity: 0.7,
    justifyContent: 'flex-end',
    paddingBottom: 8,
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
    bottom: '15%',
  },
  rowTwo: {
    flexDirection: 'row',
    padding: 6,
    bottom: '10%',
  },
  rowThree: {
    flexDirection: 'row',
  },
});

const PostDetails = ({route, navigation}) => {
  const {itemDesc, itemImg, itemPrice, itemName} = route.params;

  return (
    <View style={styles.container}>
      <Image
        source={{
          //  uri: 'https://images.pexels.com/photos/10450623/pexels-photo-10450623.jpeg',
          uri: itemImg,
        }}
        // style={{width: '100%', height: 350}}
        style={{width: 550, height: '58%', bottom: '13%'}}
      />
      <View style={styles.imageOverlay}>
        <Text style={styles.label}>{itemName}</Text>
        <Ionicons
          onPress={() => navigation.goBack()}
          name="arrow-back"
          size={32}
          style={styles.arrow}
        />
      </View>
      <View style={styles.rowOne}>
        <Image
          source={{
            uri: 'https://images.pexels.com/photos/10450623/pexels-photo-10450623.jpeg',
          }}
          style={{
            width: 30,
            height: 30,
            borderRadius: 15,
            marginRight: 8,
            bottom: 6,
          }}
        />
        <Text style={{marginRight: '10%', fontSize: 16}}>owner@mail.com</Text>
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
        {/* <Text style={{fontSize: 18}}>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Odio
          praesentium nemo repudiandae dolorem voluptatum sed ratione, expedita
          pariatur reprehenderit a. Tenetur quidem sit repellendus reiciendis
          ducimus perferendis dolor accusamus dignissimos.
        </Text> */}
      </View>
      <View style={styles.rowThree}>
        <Pressable onPress={() => null} style={styles.pressable}>
          <Text style={{fontWeight: 'bold', fontSize: 18}}>bid</Text>
        </Pressable>
        <Pressable onPress={() => null} style={styles.pressable}>
          <Text style={{fontWeight: 'bold', fontSize: 18}}>negotiate</Text>
        </Pressable>
      </View>
    </View>
  );
};

export default PostDetails;
