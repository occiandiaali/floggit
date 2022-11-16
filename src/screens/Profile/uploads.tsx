import {
  ActivityIndicator,
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
  price: {
    position: 'absolute',
    bottom: 10,
    left: 10,
    color: 'white',
  },
  title: {
    position: 'absolute',
    top: 10,
    left: 10,
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

  return (
    <View style={styles.container}>
      {postHistory.length !== 0 ? (
        postHistory.map((u, i) => (
          <View style={styles.item} key={i}>
            {loading ? (
              <ActivityIndicator size={'large'} style={{alignSelf: 'center'}} />
            ) : (
              <>
                <Image source={{uri: u.image}} style={styles.pic} />
                <Text style={styles.title}>{u.title}</Text>
                <Text style={styles.price}>{u.price}</Text>
                <View style={styles.trash}>
                  <Ionicons
                    name="trash"
                    size={20}
                    color="red"
                    onPress={() => removeHistoryItem(u)}
                  />
                </View>
              </>
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
