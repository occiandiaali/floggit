import {StyleSheet, Text, TextInput, View} from 'react-native';
import React, {useState} from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#f194ff',
    width: 250,
    height: 50,
    borderRadius: 21,
    textAlignVertical: 'center',
    textAlign: 'center',
    fontSize: 24,
  },
  close: {
    alignSelf: 'flex-end',
    right: 24,
    bottom: 38,
  },
  container: {
    margin: 20,
    borderRadius: 20,
    height: 350,
    backgroundColor: 'white',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    alignItems: 'center',
  },
  input: {
    // height: 60,
    width: 300,
    padding: 8,
    marginBottom: 16,
    borderRadius: 21,
    borderColor: 'grey',
    borderWidth: 1,
  },
});

const EditProfileModal = ({onSave, onClose, onChangeText}) => {
  const [isBlank, setIsBlank] = useState(true);
  return (
    <View style={styles.container}>
      <Ionicons onPress={onClose} name="close" size={32} style={styles.close} />
      <TextInput
        //  value={userInput}
        onChange={() => setIsBlank(false)}
        onChangeText={onChangeText}
        placeholder="Enter new value.."
        style={styles.input}
      />
      {/* <Button title="Save" onPress={() => !state} /> */}
      <Text disabled={isBlank} onPress={onSave} style={styles.button}>
        Save
      </Text>
    </View>
  );
};

export default EditProfileModal;
