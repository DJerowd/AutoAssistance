import { React, useState } from 'react';
import { View, StyleSheet, TextInput, TouchableOpacity, Text, Alert, Image } from 'react-native';

const LoginPage = ({ navigation }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    navigation.navigate('SelectPage');
  };

  const handleRegister = () => {
    navigation.navigate('RegisterPage');
  };

  return (
    <View style={styles.container}>
      
      <Image
          source={{ uri: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOEAAADhCAMAAAAJbSJIAAAAeFBMVEUAAAD////z8/OHh4f6+voiIiK7u7u+vr7v7+88PDy2trb19fXp6elUVFTf39+cnJyrq6vY2Nh9fX1gYGAXFxelpaVubm7Ly8tnZ2d1dXWxsbGdnZ2WlpaQkJASEhLHx8cwMDAgICBFRUVZWVlQUFAsLCw4ODiCgoIpdevqAAADLUlEQVR4nO3Ya3OiMBSAYY+iUEEFrfe7ttv//w831BtCSA6zbmd35n0+1fRMyAkht1YLAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAD817rdnTLyPOr3+tPFURn+vjDxvXT8pq1+k1c/+1SG60XS0YTtprFcBPuTIv5jH1zjJdkq4tftW/h8oGlPA7Eqw3He3iTshVneiJU3PszDonl4iY+/POGLuFh9qGq4WluTYWqeO+1e/u5EpjHu8E/zQoLp4fJjMc9fjDN+lPfaNXycmK559zdJT5OhSTA7Pv10ptg1b6Rf+H0airQd8RtT3+Hx0+QbaecGDUWGC5H9U8HYPZLMUCsNy5Wk9eED03/l57nfeTOKDNsyLJWYbl7UhndERuWyiaP6pDIiTA1jX6P0/Bma51Vm/KSS9EPs+J/FUuRcLsskalKFmz/DxDIkZyJ1a8bY0mKXzDIkzcB1vfVmvBm+WUdkIJua+L1vpn12tI7IyPXhNuTN0IwiS+m8dq5JFMtlwVnEsjaEL5xrvBmurTN9vzT/PYho9jB3X9YOTJsNBCdvhql14ljVTicN58GNdVJZv3Cq8WY4tT5M+w5nt+1m3ajuSGAp/dF3OG78HRb3M48Ma77OibX6H/0OTyIf1dKg9mvbP73z7nmQM5XUzL2fIrNqaSRTd6sa8K+HkaX73ethdS37Ze2mb8PSljA3aLimOvkzXItUjqXuPU31G1rVb707ls7KXvgZavalQWVW2bj2HKbJ5SF2qBYVW1DuLbOCLH2N0lNkaNb8nrvgWVZZEofWCfNqUj5KVAr+jPJ8WHykGbbOvfUuej4fHofW2eTOnFSywoFw6z1hN9OWzeHtov5kbVIMbnPhMvEkaFI0IcHoWt0uP8G7tzl5xPoaPjPdkbzyANyK7wuWq5+/72mG+nuavnzHr1bhML+88n1Vs1v1879wTxMFN45Dbav1nt67Yl437xedwvtdW5wqrl2m97u27HXrxEX3wTM28gvNXqq/0Jzk8f2ttsGDbV798qCtHgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA/Nt+A2s+HI+FMHFPAAAAAElFTkSuQmCC' }}
          style={styles.image}
      />

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
          <Text style={styles.loginButtonText}>Entrar</Text>
        </TouchableOpacity>

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
    //justifyContent: 'center',
    padding:  40,
  },

  image: {
    height: 240,
    width: 240,
    alignSelf: 'center',
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
