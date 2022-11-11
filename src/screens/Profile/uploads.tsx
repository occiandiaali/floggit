import {ActivityIndicator, Image, StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';

import storage from '@react-native-firebase/storage';

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
  pic: {
    width: 170,
    height: 170,
    margin: 6,
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
  const [samples, setSamples] = useState<string[]>([]);
  const [url, setUrl] = useState('');
  const [loading, setLoading] = useState(false);

  const picGrab = async () => {
    await storage()
      .ref()
      .child('Images')
      .list()
      .then(result => {
        const imageUrls: string[] = [];
        result.items.forEach(pics => {
          storage()
            .ref()
            .child(pics.fullPath)
            .getDownloadURL()
            .then(u => {
              imageUrls.push(u);
            });
        });
        setSamples(imageUrls);
      });
  };

  const fromStorage = React.useCallback(async pageToken => {
    // await storage()
    //   .ref()
    //   .child('Images')
    //   .list()
    //   .then(result => {
    //     const imageUrls: string[] = [];
    //     result.items.forEach(pics => {
    //       storage()
    //         .ref()
    //         .child(pics.fullPath)
    //         .getDownloadURL()
    //         .then(u => {
    //           imageUrls.push(u);
    //         });
    //     });
    //     setSamples(imageUrls);
    //   });
    const picData: string[] = [];
    const reference = storage().ref('photos');
    await reference.list({pageToken}).then(result => {
      result.items.forEach(ref => {
        // const r = JSON.stringify(ref);
        // const fP = JSON.stringify(ref.fullPath);
        // const dUrl = JSON.stringify(ref.getDownloadURL());
        // console.log('ref ->> ', JSON.stringify(ref));
        // console.log('Ref >> ', r);
        // console.log('Path >> ', fP);
        // console.log('Url >> ', dUrl);
        picData.push(ref.fullPath);
      });
      if (result.nextPageToken) {
        return fromStorage(result.nextPageToken);
      }
      console.log('pics arr ', picData);
      setSamples(picData);
      //  setSamples(result.items);
    });
  }, []);

  // useEffect(() => {
  //   try {
  //     fromStorage('');
  //   } catch (error) {
  //     console.log('From storage ', error);
  //   }
  // }, [fromStorage]);

  // useEffect(() => {
  //   try {
  //     picGrab();
  //   } catch (error) {
  //     console.log('Pic grab err ', error);
  //   }
  // }, []);

  const getSamples = async () => {
    setLoading(true);
    const imageRefs = await storage().ref('photos').listAll();
    const urls = await Promise.all(
      imageRefs.items.map(ref => ref.getDownloadURL()),
    );
    console.log('urls refs ', urls);
    setSamples(urls);
    setLoading(false);
  };

  useEffect(() => {
    try {
      getSamples();
    } catch (error) {
      console.log(error);
    }
  }, []);

  // useEffect(() => {
  //   const func = async () => {
  //     const imageRefs = await storage().ref(
  //       ' file:///data/user/0/com.brtr/cache/*.jpg',
  //     );
  //     const imagesUploaded = await imageRefs.getDownloadURL();
  //     console.log('Imgs ', imagesUploaded);
  //   };
  //   try {
  //     func();
  //   } catch (error) {
  //     console.log('Catch ', error);
  //   }
  // }, []);

  return (
    // <View style={styles.container}>
    //   {info.map(item => {
    //     return (
    //       <View key={item.id} style={styles.item}>
    //         <Text>{item.label}</Text>
    //       </View>
    //     );
    //   })}
    // </View>
    // <View style={styles.container}>
    //   {samples.length !== 0 ? (
    //     samples.map((url, i) => (
    //       <View style={styles.item}>
    //         <Image source={{uri: url}} key={i} style={styles.pic} />
    //       </View>
    //     ))
    //   ) : (
    //     <Text>No History</Text>
    //   )}
    // </View>
    // <View style={styles.container}>
    //   {samples.length !== 0 ? (
    //     samples.map((u, i) => (
    //       <View style={styles.item} key={i}>
    //         <Image source={{uri: u}} style={styles.pic} />
    //       </View>
    //     ))
    //   ) : (
    //     <Text>No History</Text>
    //   )}
    // </View>
    <View style={styles.container}>
      {samples.length !== 0 ? (
        samples.map((u, i) => (
          <View style={styles.item} key={i}>
            {loading ? (
              <ActivityIndicator size={'large'} style={{alignSelf: 'center'}} />
            ) : (
              <Image source={{uri: u}} style={styles.pic} />
            )}
          </View>
        ))
      ) : (
        <Text>No History</Text>
      )}
    </View>
  );
};

export default UploadScreen;
