import { React, useState } from 'react';
import { View, StyleSheet, TextInput, TouchableOpacity, Text, Alert, Image } from 'react-native';

const LoginPage = ({ navigation }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

{/* Realizar Login */}
  const handleLogin = () => {
    console.log('Item Selecionado:', 'SelectPage');
    navigation.navigate('SelectPage');
  };

{/* Registrar-se */}
  const handleRegister = () => {
    console.log('Item Selecionado:', 'RegisterPage');
    navigation.navigate('RegisterPage');
  };

  return (
    <View style={styles.container}>

{/* Logo */}
      <Image
          source={require('../assets/Logo.png')}
          style={styles.image}
      />

{/* Nome de Usuário */}
      <TextInput
        style={styles.input}
        value={username}
        placeholder="Username"
        onChangeText={setUsername}
        autoCapitalize="none"
      />

{/* Senha */}
      <TextInput
        style={styles.input}
        value={password}
        placeholder="Password"
        secureTextEntry
        onChangeText={setPassword}
      />

{/* Botão de Realizar Login */}
      <View style={styles.buttonsContainer}>
        <TouchableOpacity title="Login" style={styles.loginButton} onPress={handleLogin} >
          <Text style={styles.loginButtonText}>Entrar</Text>
        </TouchableOpacity>

{/* Botão de Criar uma Nova Conta */}
        <TouchableOpacity title="Registrar" style={styles.registrarButton} onPress={handleRegister} >
          <Text style={styles.registrarButtonText}>Criar conta</Text>
        </TouchableOpacity>
      </View>

    </View>
  );
};


const styles = StyleSheet.create({
  container: {
    flex:  1,
    backgroundColor: '#F9F9F9',
    padding:  40,
    paddingTop:  0,
  },

  image: {
    height: 300,
    width: 300,
    alignSelf: 'center',
    marginBottom:  40,
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

export default LoginPage;
