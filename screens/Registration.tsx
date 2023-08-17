import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import {StackNavigationProp} from '@react-navigation/stack';

type StackParams = {
  GetAddress: {
    username: string;
    password: string;
  };
};

type RegProps = {
  navigation: StackNavigationProp<StackParams>;
};

const Registration: React.FC<RegProps> = ({navigation}) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleAddUser = async () => {
    navigation.navigate('GetAddress', {username, password});
  };

  return (
    <View style={styles.container}>
      <View style={styles.topContent}>
        <View style={{alignItems: 'center'}}>
          <Text style={styles.title}>Add User</Text>
          <Text style={styles.subtitle}>
            Fill all required fields to add a new user
          </Text>
        </View>
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Username</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter your username"
            value={username}
            onChangeText={setUsername}
          />
        </View>
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Password</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter your password"
            secureTextEntry
            value={password}
            onChangeText={setPassword}
          />
        </View>
      </View>
      <TouchableOpacity style={styles.button} onPress={handleAddUser}>
        <Text style={styles.buttonText}>Continue</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
    backgroundColor: '#fff',
    padding: 20,
  },
  topContent: {
    justifyContent: 'flex-start',
    paddingTop: 50,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    color: 'black', 
  },
  subtitle: {
    fontSize: 14,
    marginBottom: 20,
    textAlign: 'center',
  },
  inputContainer: {
    width: '100%',
    marginBottom: 15,
    padding: 10,
  },
  label: {
    marginBottom: 5,
    fontSize: 12,
  },
  input: {
    width: '100%',
    height: 40,
    backgroundColor: '#F7F9FB',
    borderRadius: 10,
    padding: 5,
  },
  button: {
    backgroundColor: '#2B64F0',
    width: '80%',
    paddingVertical: 15,
    borderRadius: 30,
    alignItems: 'center',
    alignContent: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default Registration;
