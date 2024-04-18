import { React, useState } from 'react';
import { View, StyleSheet, TextInput, TouchableOpacity, Text, Alert, Image } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { UsersDB } from '../components/UsersDB';

const LoginPage = ({ navigation }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { user } = UsersDB();

{/* Realizar Login */}
  const handleLogin = () => {
    const userFound = user.find(user => user.username === username && user.password === password)
    if (userFound) {
      setError('');
      console.log('Login bem sucedido:', 'SelectPage');
      navigation.navigate('SelectPage');
    } else {
      Alert.alert('Erro', 'Usuário não encontrado.');
      setError('Usuário não encontrado.');
    }
  };

{/* Registrar-se */}
  const handleRegister = () => {
    console.log('Item Selecionado:', 'RegisterPage');
    navigation.navigate('RegisterPage');
  };

  return (
    <LinearGradient style={styles.container} colors={['#F9F9F9', '#6A6A6A22']}>

{/* Logo */}
      <Image
          source={require('../assets/Logo.png')}
          style={styles.image}
      />

{/* Nome de Usuário */}
      <View style={styles.input}>
        <TextInput
          style={styles.textInput}
          value={username}
          placeholder="Username"
          onChangeText={setUsername}
          autoCapitalize="none"
        />
      </View>

{/* Senha */}
      <View style={styles.input}>
        <TextInput
          style={styles.textInput}
          value={password}
          placeholder="Password"
          secureTextEntry
          onChangeText={setPassword}
        />
      </View>

{/* Botão de Realizar Login */}
      {error ? <Text style={styles.error}>{error}</Text> : null}
      <View style={styles.buttonsContainer}>
        <TouchableOpacity title="Login" style={styles.loginButton} onPress={handleLogin} >
          <Text style={styles.loginButtonText}>Entrar</Text>
        </TouchableOpacity>

{/* Botão de Criar uma Nova Conta */}
        <View style={styles.linha}>
          <Text style={styles.text}>Não tenho uma conta ainda: </Text>
          <TouchableOpacity title="Registrar" style={styles.registrarButton} onPress={handleRegister} >
            <Text style={styles.registrarButtonText}>Criar conta</Text>
          </TouchableOpacity>
        </View>
      </View>

    </LinearGradient>
  );
};


const styles = StyleSheet.create({
  container: {
    flex:  1,
    backgroundColor: '#F9F9F9',
    padding:  40,
    paddingTop:  10,
  },

  linha: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  image: {
    height: 300,
    width: 300,
    alignSelf: 'center',
    marginBottom:  20,
  },

  text: {
    color: '#000000',
    fontSize: 18,
  },

  textInput:{
    color: '#000000',
    fontSize: 16,
    textAlignVertical: 'center'
  },
  input: {
    width: '100%',
    height:  48,
    borderColor: '#000000',
    backgroundColor: '#6A6A6A22',
    borderWidth:  1,
    borderRadius: 8,
    paddingLeft:  10,
    marginBottom:  20,
    justifyContent: 'center',
  },

  buttonsContainer: {
    alignItems: 'center',
    margin: 20,
  },
  loginButton: {
    height:  60,
    backgroundColor: '#6A6A6A',
    marginTop:  10,
    marginBottom: 20,
    paddingHorizontal: 60,
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
  },
  registrarButtonText: {
    color: '#009F4D',
    fontSize: 20,
    textAlign: 'center',
    fontWeight: 'bold',
  },

  error: {
    color: '#ff0000',
    fontSize: 14,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default LoginPage;
