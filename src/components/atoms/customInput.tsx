import {Text, TextInput, View} from 'react-native';
import React from 'react';

const CustomInput = ({
  containerStyle,
  placeholder,
  onChangeText,
  inputStyle,
  sendStyle,
  onSend,
  fldValue,
}) => {
  return (
    <View style={containerStyle}>
      <TextInput
        value={fldValue}
        style={inputStyle}
        placeholder={placeholder}
        onChangeText={onChangeText}
      />
      <Text style={sendStyle} onPress={onSend}>
        Send
      </Text>
    </View>
  );
};

export default CustomInput;
