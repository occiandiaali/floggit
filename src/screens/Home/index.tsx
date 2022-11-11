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

const styles = StyleSheet.create({
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
  pic: {
    margin: 8,
    width: 320,
    height: 200,
  },
  promotedWrapper: {},
  levels: {
    paddingBottom: 8,
  },
  level1Label: {
    fontSize: 21,
    fontWeight: 'bold',
    paddingLeft: 12,
  },
  level2Label: {
    fontSize: 21,
    fontWeight: 'bold',
    paddingLeft: 12,
  },
  level3Label: {
    fontSize: 21,
    fontWeight: 'bold',
    paddingLeft: 12,
  },
  levelsWrapper: {
    padding: 6,
  },
  trash: {
    position: 'absolute',
    // top: 10,
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
  },
  {
    id: 2,
    label: 'TWO',
  },
  {
    id: 3,
    label: 'THREE',
  },
  {
    id: 4,
    label: 'FOUR',
  },
  {
    id: 5,
    label: 'FIVE',
  },
  {
    id: 6,
    label: 'SIX',
  },
];

function HomeScreen({navigation}) {
  //  const [samples, setSamples] = useState<string[]>([]);
  //  const [samples2, setSamples2] = useState<string[]>([]);
  const [electronics, setElectronics] = useState<string[]>([]);
  const [fashion, setFashion] = useState<string[]>([]);
  const [household, setHousehold] = useState<string[]>([]);

  const [loading, setLoading] = useState(false);
  // const [loading2, setLoading2] = useState(false);

  const setElectronicsState = async () => {
    setLoading(true);
    const imageRefs = await storage().ref('photos/electronics').listAll();
    const urls = await Promise.all(
      imageRefs.items.map(ref => ref.getDownloadURL()),
    );
    setElectronics(urls);
    setLoading(false);
  };

  const setHouseholdState = async () => {
    setLoading(true);
    const imageRefs = await storage().ref('photos/household').listAll();
    const urls = await Promise.all(
      imageRefs.items.map(ref => ref.getDownloadURL()),
    );
    setHousehold(urls);
    setLoading(false);
  };

  const setFashionState = async () => {
    setLoading(true);
    const imageRefs = await storage().ref('photos/fashion').listAll();
    const urls = await Promise.all(
      imageRefs.items.map(ref => ref.getDownloadURL()),
    );
    setFashion(urls);
    setLoading(false);
  };

  // const getSamples = async () => {
  //   setLoading(true);
  //   const imageRefs = await storage().ref('images').listAll();
  //   // const imageRefs = await storage().ref('images').list({maxResults: 3});
  //   const urls = await Promise.all(
  //     imageRefs.items.map(ref => ref.getDownloadURL()),
  //   );
  //   // console.log('urls refs ', urls);
  //   setSamples(urls);
  //   setLoading(false);
  // };

  // const getLevelTwos = async () => {
  //   setLoading2(true);
  //   const levelTwos = await storage().ref('images/leveltwos').list();
  //   const urls = await Promise.all(
  //     levelTwos.items.map(ref => ref.getDownloadURL()),
  //   );
  //   console.log('level twos refs ', urls);
  //   setSamples2(urls);
  //   setLoading2(false);
  // };

  // useEffect(() => {
  //   try {
  //     // getSamples();
  //     // getLevelTwos();
  //     setElectronicsState();
  //     setHouseholdState();
  //     setFashionState();
  //   } catch (error) {
  //     console.log(error);
  //   }
  // }, []);
  useEffect(() => {
    try {
      const unsubscribe = navigation.addListener('focus', () => {
        setElectronicsState();
        setHouseholdState();
        setFashionState();
      });
      return unsubscribe;
    } catch (error) {
      console.log(error);
    }
  }, [navigation]);

  return (
    <View style={styles.wrapper}>
      <CustomHeaderComponent />
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
                backgroundColor: 'teal',
              }}>
              <Text>{el.label}</Text>
            </View>
          ))}
        </ScrollView>
      </View>
      <ScrollView
        style={styles.levelsWrapper}
        showsVerticalScrollIndicator={false}>
        <View style={styles.levels}>
          <Text style={styles.level1Label}>Electronics</Text>
          <ScrollView showsHorizontalScrollIndicator={false} horizontal={true}>
            {/* {promos.map(el => (
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
                  // backgroundColor: 'teal',
                }}>
                <Text>{el.label}</Text>
              </View>
            ))} */}
            {electronics.length !== 0
              ? electronics.map((u, i) => (
                  <Pressable
                    style={styles.item}
                    key={i}
                    onPress={() => console.log('Pressed ', u)}>
                    {/* <View style={styles.item} key={i}> */}
                    {loading ? (
                      <ActivityIndicator
                        size={'large'}
                        style={{alignSelf: 'center'}}
                      />
                    ) : (
                      <>
                        <Image source={{uri: u}} style={styles.pic} />
                        <View style={styles.trash}>
                          <Ionicons
                            name="trash"
                            size={30}
                            color="red"
                            onPress={() => null}
                          />
                        </View>
                      </>
                    )}
                    {/* </View> */}
                  </Pressable>
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
                      // backgroundColor: 'teal',
                    }}>
                    <Text>{el.label}</Text>
                  </View>
                ))}
          </ScrollView>
        </View>
        {/* <View style={styles.levels}>
          <Text style={styles.level2Label}>Level Two</Text>
          <ScrollView showsHorizontalScrollIndicator={false} horizontal={true}>
            {promos.map(el => (
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
        </View> */}
        <View style={styles.levels}>
          <Text style={styles.level1Label}>Household</Text>
          <ScrollView showsHorizontalScrollIndicator={false} horizontal={true}>
            {household.length !== 0
              ? household.map((u, i) => (
                  <View style={styles.item} key={i}>
                    {loading ? (
                      <ActivityIndicator
                        size={'large'}
                        style={{alignSelf: 'center'}}
                      />
                    ) : (
                      <Image source={{uri: u}} style={styles.pic} />
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
                      // backgroundColor: 'teal',
                    }}>
                    <Text>{el.label}</Text>
                  </View>
                ))}
          </ScrollView>
        </View>
        {/* <View style={styles.levels}>
          <Text style={styles.level3Label}>Fashion</Text>
          <ScrollView showsHorizontalScrollIndicator={false} horizontal={true}>
            {promos.map(el => (
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
        </View> */}
        <View style={styles.levels}>
          <Text style={styles.level1Label}>Fashion</Text>
          <ScrollView showsHorizontalScrollIndicator={false} horizontal={true}>
            {fashion.length !== 0
              ? fashion.map((u, i) => (
                  <View style={styles.item} key={i}>
                    {loading ? (
                      <ActivityIndicator
                        size={'large'}
                        style={{alignSelf: 'center'}}
                      />
                    ) : (
                      <Image source={{uri: u}} style={styles.pic} />
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
                      // backgroundColor: 'teal',
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
