import { React, useCallback, useEffect, useState } from 'react';
import { View, StyleSheet, TextInput, TouchableOpacity, Text, Alert, Image } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { useFonts } from 'expo-font';

import AsyncStorage from '@react-native-async-storage/async-storage';
import { fetchUsers } from '../database/UsersDatabase';

const LoginPage = ({ navigation }) => {
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [users, setUsers] = useState([]);
  const [user, setUser] = useState('');
  const [loading, setLoading] = useState(true);
  const [fontsLoaded] = useFonts({
    'HardRace': require('../assets/fonts/HardRace.otf'),
  });
  
  {/* Verificar se as Fontes Foram Carregadas */}
  useEffect(() => {
    if (fontsLoaded) {
      setLoading(false);
    }
  }, [fontsLoaded]);

  {/* Carregar o Usuário Ativo */}
  useEffect(() => {
      const fetchUser = async () => {
        try {
          const userData = await AsyncStorage.getItem('@user');
          if (userData !== '') {
            setUser(JSON.parse(userData));
          }
        } catch (error) {
          console.error('Erro ao recuperar os dados do usuário:', error);
        }
      };
      fetchUser();
   }, []);

  {/* Carregar Banco de Dados */}
  useFocusEffect(
    useCallback(() => {
      fetchUsers().then(setUsers).catch(console.error);
    }, [])
  );

  {/* Realizar Login */}
  const handleLogin = async () => {
    const userFound = users.find(users => users.email === login && users.password === password)
    if (userFound) {
      setError('');
      console.log('Login:', {userFound});

      try {
        await AsyncStorage.setItem('@user', JSON.stringify(userFound));
        navigation.navigate('SelectNavigator');
      } catch (error) {
        console.error('Erro ao armazenar os dados do usuário:', error);
      }

    } else {
      Alert.alert('Erro', 'Usuário não encontrado.');
      setError('Usuário não encontrado.');
    }
  };

  {/* Registrar-se */}
  const handleRegister = () => {
    navigation.navigate('RegisterPage');
  };

  return (
    <View style={styles.container}>

      {/* Logo */}
      <View style={{ top: 20 }}>
        <Image
            source={require('../assets/Logo.png')}
            style={styles.image}
        />
        <Text style={{ fontFamily: 'HardRace', fontSize: 57, alignSelf: 'center', bottom: 30}}>Auto</Text>
        <Text style={{ fontFamily: 'HardRace', fontSize: 24, alignSelf: 'center', bottom: 54}}>Assistance</Text>
      </View>

{/* Nome de Usuário */}
      <View style={styles.input}>
        <TextInput
          style={styles.textInput}
          value={login}
          placeholder="E-mail"
          onChangeText={setLogin}
          autoCapitalize="none"
        />
      </View>

{/* Senha */}
      <View style={styles.input}>
        <TextInput
          style={styles.textInput}
          value={password}
          placeholder="Senha"
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

    </View>
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
    height: 160,
    width: 200,
    alignSelf: 'center',
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
