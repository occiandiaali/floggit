import {
  ActivityIndicator,
  FlatList,
  Image,
  StyleSheet,
  Text,
  ToastAndroid,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';

//import storage from '@react-native-firebase/storage';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    padding: 6,
  },
  item: {
    width: 365, //170,
    height: 240, //170,
    margin: 6,
    borderRadius: 6,
    flexDirection: 'row',
    flexWrap: 'wrap',
    backgroundColor: 'teal',
    // justifyContent: 'center',
    // alignItems: 'center',
  },
  pic: {
    width: 365, //170,
    height: 240, //170,
    borderRadius: 6,
    margin: 6,
  },
  price: {
    position: 'absolute',
    bottom: 30, //10,
    left: 30, //10,
    color: 'white',
  },
  render_item: {
    // flexDirection: 'row',
  },
  title: {
    fontSize: 18,
    position: 'absolute',
    top: 90,
    left: 100,
    color: 'white',
  },
  trash: {
    position: 'absolute',
    right: 10,
    bottom: 10,
  },
});

const UploadScreen = ({navigation}) => {
  const [loading, setLoading] = useState(false);
  const [postHistory, setPostHistory] = useState([]);
  const userid = auth().currentUser?.uid;

  const showToast = (msg: string) => {
    ToastAndroid.showWithGravity(msg, ToastAndroid.LONG, ToastAndroid.BOTTOM);
  };

  useEffect(() => {
    setLoading(true);
    try {
      (async () => {
        const historyData = await firestore()
          .collection('Users')
          .doc(userid)
          .get();
        console.log('History arr: ', historyData.data().history);
        setPostHistory(historyData.data().history);
        setLoading(false);
      })();
    } catch (error) {
      console.log(error);
    }
  }, [userid]);

  const removeHistoryItem = async item => {
    await firestore()
      .collection('Users')
      .doc(userid)
      .update({
        history: firestore.FieldValue.arrayRemove(item),
      })
      .then(() => {
        navigation.goBack();
        showToast('Item removed from your history.');
      })
      .catch(e => console.log(e));
  };

  // return (
  //   <View style={styles.container}>
  //     {postHistory.length !== 0 ? (
  //       postHistory.map((u, i) => (
  //         <View style={styles.item} key={i}>
  //           {loading ? (
  //             <ActivityIndicator size={'large'} style={{alignSelf: 'center'}} />
  //           ) : (
  //             <>
  //               <Image source={{uri: u.image}} style={styles.pic} />
  //               <Text style={styles.title}>{u.title}</Text>
  //               <Text style={styles.price}>{u.price}</Text>
  //               <View style={styles.trash}>
  //                 <Ionicons
  //                   name="trash"
  //                   size={20}
  //                   color="red"
  //                   onPress={() => removeHistoryItem(u)}
  //                 />
  //               </View>
  //             </>
  //           )}
  //         </View>
  //       ))
  //     ) : (
  //       <Text>No History</Text>
  //     )}
  //   </View>
  // );

  const renderItem = ({item}) => (
    <View key={item.id}>
      <Image source={{uri: item.image}} style={styles.pic} />
      <Text style={styles.title}>{item.title}</Text>
      <Text style={styles.price}>{item.price}</Text>
      <View style={styles.trash}>
        <Ionicons
          name="trash"
          size={20}
          color="red"
          style={styles.trash}
          onPress={() => removeHistoryItem(item)}
        />
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      {loading ? (
        <ActivityIndicator size={'large'} style={{alignSelf: 'center'}} />
      ) : (
        <>
          <View style={{margin: 8}}>
            <Text style={{fontSize: 18, color: '#ABAAAA'}}>
              Items ({postHistory.length})
            </Text>
          </View>

          <FlatList
            data={postHistory}
            extraData={postHistory}
            showsVerticalScrollIndicator={false}
            renderItem={renderItem}
            keyExtractor={(item, index) => index.toString()}
          />
        </>
      )}
    </View>
  );
};

export default UploadScreen;
