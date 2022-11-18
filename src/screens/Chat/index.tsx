import {StyleSheet, Text, View} from 'react-native';
import React from 'react';

import CustomInput from '../../components/atoms/customInput';

const styles = StyleSheet.create({
  bodyInfo: {
    textAlign: 'center',
    textAlignVertical: 'center',
    padding: 8,
    color: '#ABAAAA',
  },
  bodyInfoM: {
    textAlign: 'center',
    textAlignVertical: 'center',
    padding: 8,
    fontWeight: '700',
    color: '#000',
  },
  button: {
    backgroundColor: 'green',
    width: 80,
    height: 51,
    // left: 184,
    textAlignVertical: 'center',
    textAlign: 'center',
    color: 'white',
    fontSize: 16,
  },
  componentContainer: {
    flexDirection: 'row',
    marginLeft: 6,
    position: 'absolute',
    bottom: 10,
  },
  container: {
    flex: 1,
    backgroundColor: 'white',
  },

  inputFld: {
    width: '78%',
    height: 51,
    borderWidth: 1,
    borderColor: 'gray',
    paddingLeft: 12,
  },
});

const ChatScreen = () => {
  const [text, setText] = React.useState('');
  const [msg, setMsg] = React.useState('');
  return (
    <View style={styles.container}>
      {msg ? (
        <Text onLongPress={() => setMsg('')} style={styles.bodyInfoM}>
          Message: {msg}
        </Text>
      ) : (
        <Text style={styles.bodyInfo}>
          Negotiate as directly as possible by making a counter-offer. You have
          a 6 message limit.
        </Text>
      )}
      <CustomInput
        fldValue={text}
        containerStyle={styles.componentContainer}
        sendStyle={styles.button}
        inputStyle={styles.inputFld}
        placeholder={'Type message..'}
        onChangeText={str => setText(str)}
        onSend={() => {
          console.log('Submitted..', msg);
          setText('');
          setMsg(text);
        }}
      />
    </View>
  );
};

export default ChatScreen;
