import {
  Image,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import React, {useState} from 'react';

const styles = StyleSheet.create({
  appName: {
    fontSize: 48,
    fontWeight: 'bold',
    bottom: 24,
  },
  container: {
    flex: 1,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
  },
  emailFld: {
    width: '80%',
    height: 50,
    padding: 8,
    bottom: 6,
    textAlign: 'center',
    borderWidth: 0.8,
    borderColor: 'grey',
    borderRadius: 25,
  },
  illustration: {
    width: 250,
    height: 250,
    bottom: 36,
  },
  loginTxt: {
    backgroundColor: 'pink',
    width: '60%',
    height: 50,
    top: 8,
    borderRadius: 25,
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    textAlignVertical: 'center',
  },
  newuser: {
    paddingRight: 8,
  },
  register: {
    flexDirection: 'row',
    top: 24,
  },
  registerTxt: {
    fontWeight: 'bold',
  },
  txt: {
    fontSize: 21,
    bottom: 24,
  },
});

const LoginScreen = () => {
  const [loginDisabled, setLoginDisabled] = useState(true);
  const [text, setText] = useState('');
  const isDisabled = loginDisabled || text.length < 1;
  return (
    <View style={styles.container}>
      <Text style={styles.txt}>Welcome to</Text>
      <Text style={styles.appName}>brtr</Text>
      <Image
        source={require('./../../assets/images/mobile_login.png')}
        accessibilityLabel="illustration of a person standing beside a mobile phone"
        style={styles.illustration}
      />
      <TextInput
        onChange={() => {
          setLoginDisabled(false);
        }}
        onChangeText={newText => setText(newText)}
        placeholder="you@email.address"
        style={styles.emailFld}
      />
      <Text disabled={isDisabled} style={styles.loginTxt}>
        Sign In
      </Text>
      <View style={styles.register}>
        <Text style={styles.newuser}>New user?</Text>
        <Pressable>
          <Text style={styles.registerTxt}>Register</Text>
        </Pressable>
      </View>
    </View>
  );
};

export default LoginScreen;
