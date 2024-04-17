import { React, useState } from 'react';
import { View, StyleSheet, TextInput, TouchableOpacity, Text, Alert } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import IconI from 'react-native-vector-icons/Ionicons';

const RegisterPage = ({ navigation }) => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [passwordShown, setPasswordShown] = useState(false);
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isChecked, setIsChecked] = useState(false);
  const [error, setError] = useState('');
  const [errors, setErrors] = useState({
    username: '',
    email: '',
    phoneNumber: '',
    password: '',
    confirmPassword: '',
   });

  const formatPhoneNumber = (phoneNumberString) => {
    const cleaned = ('' + phoneNumberString).replace(/\D/g, '');
    const match = cleaned.match(/^(\d{2})(\d{5})(\d{4})$/);
    if (match) {
       return match[1] + ' ' + match[2] + '-' + match[3];
    }
    return null;
   };

  const handleRegister = () => {
{/* Formato do email e telefone */}
    const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    let newErrors = {
      username: '',
      email: '',
      phoneNumber: '',
      password: '',
      confirmPassword: '',
   };

{/* Conclusão Com Sucesso do Registro */}
    if (username.length >= 6 && email.match(emailPattern) && email.length >= 10 && formatPhoneNumber(phoneNumber) && password.length >= 8 && isValidPassword(password) && password == confirmPassword) {
      setError('');
      // navigation.navigate('LoginPage');
      console.log('Registro Concluido.');
      Alert.alert('Registro Concluído', 'Registrado com sucesso!');

{/* Validação do nome de usuário */}
    } else if (username.length > 0 && username.length < 6) {
      newErrors.username = 'O nome de usuário é muito curto.';
      setError('');

{/* Validação do e-mail */}
    } else if (email.length > 0 && !email.match(emailPattern)) {
      newErrors.email = 'O e-mail inserido é inválido.';
      setError('');
    } else if (email.length > 0 && email.length < 10) {
      newErrors.email = 'O e-mail inserido é muito curto.';
      setError('');

{/* Validação do número de telefone */}
    } else if (!formatPhoneNumber(phoneNumber)) {
      newErrors.phoneNumber = 'O número de telefone é inválido.';
      setError('');

{/* Validação da senha */}
    } else if (password.length > 0 && !isValidPassword(password)) {
      newErrors.password = 'A senha deve conter letras e números.';
      setError('');
    } else if (password.length > 0 && password.length < 8) {
      newErrors.password = 'A senha é muito curta.';
      setError('');
    } else if (password.length > 0 && password !== confirmPassword) {
      newErrors.confirmPassword = 'A senha e a confirmação da senha não coincidem.';
      setError('');

{/* Se alguma informação foi inserida, mas de forma incorreta */}
    } if (username.length <= 0 || email.length <= 0 || phoneNumber.length <= 0 || password.length <= 0) {
      setError('Todos os campos devem ser preenchidos corretamente.');
    }

    setErrors(newErrors);
  };

{/* Validação da composição da senha */}
  const isValidPassword = (password) => {
    const hasLetter = /[a-zA-Z]/.test(password);
    const hasNumber = /\d/.test(password);
    return hasLetter && hasNumber;
  };

return (
  <LinearGradient style={styles.container} colors={['#F9F9F9', '#6A6A6A55']}>

{/* Titulo */}
    <Text style={styles.title}>Criar conta:</Text>

{/* Nome de Usuário */}
    <Text style={styles.text}>Nome de usuário</Text>
    <TextInput
      style={styles.input}
      value={username}
      placeholder="Nome de Usuário"
      onChangeText={setUsername}
      autoCapitalize="none"
    />
    {errors.username ? <Text style={styles.error}>{errors.username}</Text> : null}

{/* E-mail */}
    <Text style={styles.text}>E-mail</Text>
    <TextInput
      style={styles.input}
      value={email}
      placeholder="E-mail"
      keyboardType="email-address"
      onChangeText={setEmail}
      autoCapitalize="none"
    />
    {errors.email ? <Text style={styles.error}>{errors.email}</Text> : null}

{/* Número de Telefone */}
    <Text style={styles.text}>Número de telefone</Text>
    <View style={styles.linha}>
    <Text style={styles.input} width={'16%'}>+55</Text>
    <TextInput
      style={styles.input}
      width={'84%'}
      value={formatPhoneNumber(phoneNumber)}
      keyboardType='numeric'
      placeholder="Número de Telefone"
      maxLength={13}
      onChangeText={(text) => setPhoneNumber(text)}
    />
    </View>
    {errors.phoneNumber ? <Text style={styles.error}>{errors.phoneNumber}</Text> : null}

{/* Senha */}
    <Text style={styles.text}>Senha</Text>
    <View style={styles.input}>
      <TextInput
          value={password}
          placeholder="Senha"
          secureTextEntry={!passwordShown}
          onChangeText={setPassword}
      />
      <TouchableOpacity style={{position: 'absolute', right: 10, top: 4}} onPress={() => setPasswordShown(!passwordShown)}>
          <IconI name={passwordShown ? "eye" : "eye-off"} size={30} color="#6A6A6A"/>
      </TouchableOpacity>
    </View>
    {errors.password ? <Text style={styles.error}>{errors.password}</Text> : null}

{/* Confirmação da Senha */}
    <Text style={styles.text}>Confirmar senha</Text>
    <TextInput
      style={styles.input}
      value={confirmPassword}
      placeholder="Confirmar Senha"
      secureTextEntry
      onChangeText={setConfirmPassword}
    />
    {errors.confirmPassword ? <Text style={styles.error}>{errors.confirmPassword}</Text> : null}
    
{/* Botão de Criar Conta */}
    <View style={styles.buttonsContainer}>
    {error ? <Text style={styles.error}>{error}</Text> : null}
      <TouchableOpacity title="Registrar" style={styles.registrarButton} onPress={handleRegister} >
            <Text style={styles.registrarButtonText}>Criar conta</Text>
      </TouchableOpacity>
    </View>

  </LinearGradient>
  );
};


const styles = StyleSheet.create({
  container: {
    flex:  1,
    backgroundColor: '#F9F9F9',
    padding:  40,
    paddingTop:  0,
  },

  linha: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  title: {
    color: '#000000',
    marginTop:  20,
    fontSize: 32,
    fontWeight: 'bold',
  },

  text: {
    color: '#000000',
    marginTop:  10,
    fontSize: 18,
  },

  input: {
    width: '100%',
    height:  40,
    borderColor: '#262626',
    backgroundColor: '#6A6A6A99',
    borderWidth:  1,
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