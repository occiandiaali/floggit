import {
  Alert,
  Image,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import React, {useContext, useState} from 'react';
import {AppContext} from '../../redux/contexts';

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
  illustration: {
    width: 250,
    height: 250,
    bottom: 36,
  },
  inputFld: {
    width: '80%',
    height: 50,
    padding: 8,
    bottom: 6,
    marginBottom: 8,
    textAlign: 'center',
    borderWidth: 0.8,
    borderColor: 'grey',
    borderRadius: 25,
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
  const [pass, setPass] = useState('');
  const isDisabled = loginDisabled || text.length < 1;
  const {setAuthed} = useContext(AppContext);

  const signIn = () => {
    if (text.length > 5) {
      setAuthed(true);
    } else {
      Alert.alert('Warning', 'Input should be more than 5 xters');
    }
  };
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
        autoCapitalize="none"
        keyboardType="email-address"
        style={styles.inputFld}
      />
      <TextInput
        onChange={() => {
          setLoginDisabled(false);
        }}
        onChangeText={newPass => setPass(newPass)}
        placeholder="password"
        keyboardType="visible-password"
        style={styles.inputFld}
      />
      <Text disabled={isDisabled} onPress={signIn} style={styles.loginTxt}>
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
