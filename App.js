import { React, useState } from 'react';
import { View, StyleSheet, TextInput, TouchableOpacity, Text, Alert } from 'react-native';

const App = ({ navigation }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    navigation.navigate('SelectPage');
  };

  const handleRegister = () => {
    navigation.navigate('RegisterPage');
  };

  return (
    <View>
      <View style={styles.topBar}>
      
      </View>
    <View style={styles.container}>
      
      <Text style={styles.image}>
        Logo
      </Text>

      <TextInput
        style={styles.input}
        value={username}
        placeholder="Username"
        onChangeText={setUsername}
        autoCapitalize="none"
      />
      <TextInput
        style={styles.input}
        value={password}
        placeholder="Password"
        secureTextEntry
        onChangeText={setPassword}
      />

      <View style={styles.buttonsContainer}>
        <TouchableOpacity title="Login" style={styles.loginButton} onPress={handleLogin} >
          <Text style={styles.loginButtonText}>Login</Text>
        </TouchableOpacity>

        <TouchableOpacity title="Registrar" style={styles.registrarButton} onPress={handleRegister} >
          <Text style={styles.registrarButtonText}>Register</Text>
        </TouchableOpacity>
      </View>

    </View>
    </View>
  );
};

const styles = StyleSheet.create({
  topBar: {
    height: 40,
    backgroundColor: '#009F4D'
  },

  container: {
    flex:  1,
    backgroundColor: '#F9F9F9',
    //justifyContent: 'center',
    padding:  40,
  },

  image: {
    height: 240,
    width: 240,
    backgroundColor: '#000',
    alignSelf: 'center',

    color: '#fff',
    textAlign: 'center',
    textAlignVertical: 'center',
    fontSize: 40,
  },

  input: {
    height:  40,
    borderColor: '#262626',
    backgroundColor: '#6A6A6A99',
    borderWidth:  1,
    marginTop:  20,
    padding:  10,
  },

  buttonsContainer: {
    alignItems: 'center',
    margin: 20,
  },
  loginButton: {
    height:  50,
    width: 200,
    backgroundColor: '#6A6A6A',
    marginTop:  20,
    borderRadius: 40,
    justifyContent: 'center',
  },
  loginButtonText: {
    color: '#F9F9F9',
    fontSize: 20,
    textAlign: 'center',
    fontWeight: 'bold',
  },
  registrarButton: {
    height:  50,
    width: 140,
    backgroundColor: '#00000000',
    borderColor: '#6A6A6A',
    borderRadius: 40,
    borderWidth:  2,
    marginTop:  20,
    justifyContent: 'center',
  },
  registrarButtonText: {
    color: '#6A6A6A',
    fontSize: 20,
    textAlign: 'center',
    fontWeight: 'bold',
  },
});

export default App;
