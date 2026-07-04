import React, { useState } from 'react';
import {
  View,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  TextInputProps,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

interface AppInputProps extends TextInputProps {
  leftIcon: string;
  secure?: boolean;
}

const AppInput: React.FC<AppInputProps> = ({
  leftIcon,
  secure = false,
  ...props
}) => {
  const [hidePassword, setHidePassword] = useState(secure);

  return (
    <View style={styles.container}>
      <Ionicons
        name={leftIcon}
        size={20}
        color="#8D95A5"
        style={styles.leftIcon}
      />

      <TextInput
        {...props}
        style={styles.input}
        placeholderTextColor="#A0A7B5"
        secureTextEntry={hidePassword}
      />

      {secure && (
        <TouchableOpacity
          onPress={() => setHidePassword(!hidePassword)}
          activeOpacity={0.7}>
          <Ionicons
            name={hidePassword ? 'eye-off-outline' : 'eye-outline'}
            size={22}
            color="#8D95A5"
          />
        </TouchableOpacity>
      )}
    </View>
  );
};

export default AppInput;

const styles = StyleSheet.create({
  container: {
    height: 54,
    borderWidth: 1,
    borderColor: '#E4E8F0',
    borderRadius: 14,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    backgroundColor: '#FFFFFF',
  },

  leftIcon: {
    marginRight: 10,
  },

  input: {
    flex: 1,
    fontSize: 15,
    color: '#1E293B',
    paddingVertical: 0,
  },
});