import { React, useState } from 'react';
import { View, StyleSheet, TextInput, TouchableOpacity, Text, Alert, Image } from 'react-native';

const RegisterPage = ({ navigation }) => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  

  const handleRegister = () => {

// Validação do formato do email
    const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;

// Validação do email e senha
    if (username.length >= 1 && email.match(emailPattern) && email.length >= 10 && password.length >= 6 && isValidPassword(password)) {
      setError('');
      navigation.navigate('LoginPage');
      console.log('Registro Concluido.');
      Alert.alert('Registro Concluído', 'Registrado com sucesso!');
    } else if (email.match(emailPattern) && email.length >= 10 && password.length >= 6 && !isValidPassword(password)) {
      setError('A senha deve conter letras e números.');
    } else if (email.match(emailPattern) && email.length >= 10 && password.length < 6) {
      setError('A senha é muito curta.');
    } else {
      setError('Todos os campos devem ser preenchidos corretamente.');
    }

// Verifica se a senha e a confirmação de senha são iguais
    if (password !== confirmPassword) {
      setError('As senhas não coincidem.');
    }
  };

  // Validação da composição da senha
  const isValidPassword = (password) => {
    const hasLetter = /[a-zA-Z]/.test(password);
    const hasNumber = /\d/.test(password);
    return hasLetter && hasNumber;
  };

return (
  <View style={styles.container}>

    <Image
      source={require('../assets/Logo.png')}
      style={styles.image}
    />
    <Text style={styles.title}>
      Criar conta
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
      value={email}
      placeholder="E-mail"
      keyboardType="email-address"
      onChangeText={setEmail}
      autoCapitalize="none"
    />
    <TextInput
      style={styles.input}
      value={password}
      placeholder="Password"
      secureTextEntry
      onChangeText={setPassword}
    />
    <TextInput
      style={styles.input}
      value={confirmPassword}
      placeholder="Confirm Password"
      secureTextEntry
      onChangeText={setConfirmPassword}
    />
    
    <View style={styles.buttonsContainer}>
    {error ? <Text style={styles.error}>{error}</Text> : null}
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
    // justifyContent: 'center',
    padding:  40,
    paddingTop:  0,
  },

  title: {
    color: '#000000',
    fontSize: 40,
    fontWeight: 'bold',
  },
  image: {
    height: 300,
    width: 300,
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
  registrarButton: {
    height:  50,
    width: 200,
    backgroundColor: '#6A6A6A',
    marginTop:  20,
    borderRadius: 40,
    justifyContent: 'center',
  },
  registrarButtonText: {
    color: '#F9F9F9',
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

export default RegisterPage;