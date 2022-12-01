import React, {useEffect, useState} from 'react';
import {
  ActivityIndicator,
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';

import Ionicons from 'react-native-vector-icons/Ionicons';

import CustomHeaderComponent from '../../components/molecules/customHeader';

import storage from '@react-native-firebase/storage';
import firestore from '@react-native-firebase/firestore';

const styles = StyleSheet.create({
  carouselBoxLabel: {
    width: 100,
    height: 30,
    borderRadius: 6,
    backgroundColor: '#000', //'#ABAAAA',
    opacity: 0.5,
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
    textAlignVertical: 'center',
    position: 'absolute',
    // bottom: 18,
  },
  headingRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  item: {
    margin: 8,
    width: 320,
    height: 200,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 12,
    borderColor: 'pink',
    borderWidth: 1.5,
  },
  levelLabel: {
    fontSize: 21,
    fontWeight: 'bold',
    paddingLeft: 12,
    paddingBottom: 8,
    color: '#000',
  },
  levelsWrapper: {
    padding: 6,
  },
  pic: {
    margin: 8,
    width: 320,
    height: 200,
    borderRadius: 10,
  },
  picPrice: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'blue',
  },
  picPriceV: {
    position: 'absolute',
    bottom: 20,
    left: 20,
  },
  picTxt: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'blue',
  },
  picTxtV: {
    position: 'absolute',
    top: 20,
    left: 20,
  },
  timeV: {
    position: 'absolute',
    top: 20,
    right: 10,
  },
  time: {
    fontSize: 14,
    color: 'blue',
  },
  promotedWrapper: {},
  levels: {
    paddingBottom: 8,
  },
  seeAllLabel: {
    fontSize: 16,
    right: 16,
    top: 6,
  },
  sliderPic: {
    margin: 8,
    width: 350,
    height: 250,
    borderRadius: 12,
  },
  trash: {
    position: 'absolute',

    right: 10,
    bottom: 10,
  },
  wrapper: {
    flex: 1,
    paddingTop: 16,
    backgroundColor: '#ffffff',
  },
});

const promos = [
  {
    id: 1,
    label: 'ONE',
    img: 'https://images.pexels.com/photos/120049/pexels-photo-120049.jpeg',
  },
  {
    id: 2,
    label: 'TWO',
    img: 'https://images.pexels.com/photos/120049/pexels-photo-120049.jpeg',
  },
  {
    id: 3,
    label: 'THREE',
    img: 'https://images.pexels.com/photos/120049/pexels-photo-120049.jpeg',
  },
  {
    id: 4,
    label: 'FOUR',
    img: 'https://images.pexels.com/photos/120049/pexels-photo-120049.jpeg',
  },
  {
    id: 5,
    label: 'FIVE',
    img: 'https://images.pexels.com/photos/120049/pexels-photo-120049.jpeg',
  },
];

interface CategoryProps {
  userid: string;
  img: string;
  titular: string;
  price: number;
  cando: boolean;
  desc: string;
  createdat: Date;
}

function HomeScreen({navigation}) {
  const [electronics, setElectronics] = useState<CategoryProps[]>([
    {
      userid: '',
      img: 'https://images.pexels.com/photos/4386158/pexels-photo-4386158.jpeg',
      titular: '',
      price: 0,
      cando: false,
      desc: '',
      createdat: new Date(),
    },
  ]);
  const [household, setHousehold] = useState<CategoryProps[]>([
    {
      userid: '',
      img: 'https://images.pexels.com/photos/4386158/pexels-photo-4386158.jpeg',
      titular: '',
      price: 0,
      cando: false,
      desc: '',
      createdat: new Date(),
    },
  ]);
  const [automobiles, setAutomobiles] = useState<CategoryProps[]>([
    {
      userid: '',
      img: 'https://images.pexels.com/photos/4386158/pexels-photo-4386158.jpeg',
      titular: '',
      price: 0,
      cando: false,
      desc: '',
      createdat: new Date(),
    },
  ]);

  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState('');
  const [img, setImg] = useState(null);

  const getElectronics = async () => {
    setLoading(true);
    return await firestore()
      .collection('Posts')
      .where('category', '==', 'Electronics')
      .get()
      .then(querySnapshot => {
        const newData = querySnapshot.docs.map(doc => ({
          userid: doc.data().userid,
          img: doc.data().imageurl,
          titular: doc.data().title,
          price: doc.data().price,
          cando: doc.data().negotiable,
          desc: doc.data().description,
          createdat: doc.data().created,
          ...doc.data(),
        }));
        setElectronics(newData);
        setLoading(false);
      })
      .catch(e => console.log(e));
  };
  const getHousehold = async () => {
    setLoading(true);
    return await firestore()
      .collection('Posts')
      .where('category', '==', 'Household')
      .get()
      .then(querySnapshot => {
        const newData = querySnapshot.docs.map(doc => ({
          ...doc.data(),
          userid: doc.data().userid,
          img: doc.data().imageurl,
          titular: doc.data().title,
          price: doc.data().price,
          cando: doc.data().negotiable,
          desc: doc.data().description,
          createdat: doc.data().created,
        }));
        setHousehold(newData);
        setLoading(false);
      })
      .catch(e => console.log(e));
  };
  const getAutomobiles = async () => {
    setLoading(true);
    return await firestore()
      .collection('Posts')
      .where('category', '==', 'Automobiles')
      .get()
      .then(querySnapshot => {
        const newData = querySnapshot.docs.map(doc => ({
          ...doc.data(),
          userid: doc.data().userid,
          img: doc.data().imageurl,
          titular: doc.data().title,
          price: doc.data().price,
          cando: doc.data().negotiable,
          desc: doc.data().description,
          createdat: doc.data().created,
        }));
        setAutomobiles(newData);
        setLoading(false);
      })
      .catch(e => console.log(e));
  };

  const getUsernameAndAvatar = async () => {
    await firestore()
      .collection('Users')
      .get()
      .then(querySnapshot => {
        querySnapshot.forEach(item => {
          setUser(item.data().username);
          setImg(item.data().profileImg);
        });
      });
  };

  useEffect(() => {
    try {
      const unsubscribe = navigation.addListener('focus', () => {
        getUsernameAndAvatar();
        getElectronics();
        getHousehold();
        getAutomobiles();
      });
      return unsubscribe;
    } catch (error) {
      console.log(error);
    }
  }, [navigation]);

  return (
    <View style={styles.wrapper}>
      <CustomHeaderComponent cUser={user} cAvatar={img} />
      <View style={styles.promotedWrapper}>
        <ScrollView showsHorizontalScrollIndicator={false} horizontal={true}>
          {promos.map(el => (
            <View
              key={el.id}
              style={{
                margin: 8,
                width: 350,
                height: 250,
                justifyContent: 'center',
                alignItems: 'center',
                borderRadius: 12,
              }}>
              <Image source={{uri: el.img}} style={styles.sliderPic} />
              <Text style={styles.carouselBoxLabel}>{el.label}</Text>
            </View>
          ))}
        </ScrollView>
      </View>
      <ScrollView
        style={styles.levelsWrapper}
        showsVerticalScrollIndicator={false}>
        <View style={styles.levels}>
          <View style={styles.headingRow}>
            <Text style={styles.levelLabel}>Electronics</Text>
            <Text style={styles.seeAllLabel}>See all</Text>
          </View>
          <ScrollView showsHorizontalScrollIndicator={false} horizontal={true}>
            {electronics.length !== 0
              ? electronics?.map((el, i) => (
                  <View style={styles.item} key={i}>
                    {loading ? (
                      <ActivityIndicator
                        size={'large'}
                        style={{alignSelf: 'center'}}
                      />
                    ) : (
                      <Pressable
                        onPress={() =>
                          navigation.navigate('PostDetails', {
                            userid: el.userid,
                            itemImg: el.img,
                            itemName: el.titular,
                            itemPrice: el.price,
                            itemNegotiable: el.cando,
                            itemDesc: el.desc,
                            itemCreation: el.createdat,
                          })
                        }>
                        <Image source={{uri: el.img}} style={styles.pic} />
                        <View style={styles.picPriceV}>
                          <Text style={styles.picPrice}>
                            {new Intl.NumberFormat('ng-NG', {
                              style: 'currency',
                              currency: 'NGN',
                            }).format(el.price)}
                          </Text>
                        </View>
                        <View style={styles.picTxtV}>
                          <Text style={styles.picTxt}>{el.titular}</Text>
                        </View>
                      </Pressable>
                    )}
                  </View>
                ))
              : promos.map(el => (
                  <View
                    key={el.id}
                    style={{
                      margin: 8,
                      width: 320,
                      height: 200,
                      justifyContent: 'center',
                      alignItems: 'center',
                      borderRadius: 12,
                      borderColor: 'pink',
                      borderWidth: 1.5,
                    }}>
                    <Text>{el.label}</Text>
                  </View>
                ))}
          </ScrollView>
        </View>

        <View style={styles.levels}>
          <View style={styles.headingRow}>
            <Text style={styles.levelLabel}>Household</Text>
            <Text style={styles.seeAllLabel}>See all</Text>
          </View>
          <ScrollView showsHorizontalScrollIndicator={false} horizontal={true}>
            {household.length !== 0
              ? household?.map((el, i) => (
                  <View style={styles.item} key={i}>
                    {loading ? (
                      <ActivityIndicator
                        size={'large'}
                        style={{alignSelf: 'center'}}
                      />
                    ) : (
                      <Pressable
                        onPress={() =>
                          navigation.navigate('PostDetails', {
                            userid: el.userid,
                            itemImg: el.img,
                            itemName: el.titular,
                            itemPrice: el.price,
                            itemNegotiable: el.cando,
                            itemDesc: el.desc,
                            itemCreation: el.createdat,
                          })
                        }>
                        <Image source={{uri: el.img}} style={styles.pic} />
                        <View style={styles.picPriceV}>
                          <Text style={styles.picPrice}>
                            {new Intl.NumberFormat('ng-NG', {
                              style: 'currency',
                              currency: 'NGN',
                            }).format(el.price)}
                          </Text>
                        </View>
                        <View style={styles.picTxtV}>
                          <Text style={styles.picTxt}>{el.titular}</Text>
                        </View>
                      </Pressable>
                    )}
                  </View>
                ))
              : promos.map(el => (
                  <View
                    key={el.id}
                    style={{
                      margin: 8,
                      width: 320,
                      height: 200,
                      justifyContent: 'center',
                      alignItems: 'center',
                      borderRadius: 12,
                      borderColor: 'pink',
                      borderWidth: 1.5,
                    }}>
                    <Text>{el.label}</Text>
                  </View>
                ))}
          </ScrollView>
        </View>

        <View style={styles.levels}>
          <View style={styles.headingRow}>
            <Text style={styles.levelLabel}>Automobiles</Text>
            <Text style={styles.seeAllLabel}>See all</Text>
          </View>
          <ScrollView showsHorizontalScrollIndicator={false} horizontal={true}>
            {automobiles.length !== 0
              ? automobiles?.map((el, i) => (
                  <View style={styles.item} key={i}>
                    {loading ? (
                      <ActivityIndicator
                        size={'large'}
                        style={{alignSelf: 'center'}}
                      />
                    ) : (
                      <Pressable
                        onPress={() =>
                          navigation.navigate('PostDetails', {
                            userid: el.userid,
                            itemImg: el.img,
                            itemName: el.titular,
                            itemPrice: el.price,
                            itemNegotiable: el.cando,
                            itemDesc: el.desc,
                            itemCreation: el.createdat,
                          })
                        }>
                        <Image source={{uri: el.img}} style={styles.pic} />
                        <View style={styles.picPriceV}>
                          <Text style={styles.picPrice}>
                            {new Intl.NumberFormat('ng-NG', {
                              style: 'currency',
                              currency: 'NGN',
                            }).format(el.price)}
                          </Text>
                        </View>
                        <View style={styles.picTxtV}>
                          <Text style={styles.picTxt}>{el.titular}</Text>
                        </View>
                      </Pressable>
                    )}
                  </View>
                ))
              : promos.map(el => (
                  <View
                    key={el.id}
                    style={{
                      margin: 8,
                      width: 320,
                      height: 200,
                      justifyContent: 'center',
                      alignItems: 'center',
                      borderRadius: 12,
                      borderColor: 'pink',
                      borderWidth: 1.5,
                    }}>
                    <Text>{el.label}</Text>
                  </View>
                ))}
          </ScrollView>
        </View>
      </ScrollView>
    </View>
  );
}

export default HomeScreen;
