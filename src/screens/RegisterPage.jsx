import { React, useState } from 'react';
import { View, StyleSheet, TextInput, TouchableOpacity, Text, Alert } from 'react-native';
import CheckBox from 'expo-checkbox';
import IconI from 'react-native-vector-icons/Ionicons';
import { LinearGradient } from 'expo-linear-gradient';

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

   {/* Registrar-se */}
  const handleLogin = () => {
    console.log('Item Selecionado:', 'LoginPage');
    navigation.navigate('LoginPage');
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
    if (username.length >= 6 && email.match(emailPattern) && email.length >= 10 && formatPhoneNumber(phoneNumber) && password.length >= 8 && isValidPassword(password) && password == confirmPassword && isChecked == true) {
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
    } else if (phoneNumber.length > 0 && !formatPhoneNumber(phoneNumber)) {
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

{/* Verificar se alguma informação não foi inserida*/}
    } else if (username.length <= 0 || email.length <= 0 || phoneNumber.length <= 0 || password.length <= 0) {
      setError('Todos os campos devem ser preenchidos corretamente.');

{/* Verificar se foram confirmados os termos e condições */}
    } else if (isChecked == false){
      setError('Aceite os termos e condições.');
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
  <LinearGradient style={styles.container} colors={['#F9F9F9', '#6A6A6A22']}>

{/* Titulo */}
    <Text style={styles.title}>Criar conta:</Text>

{/* Nome de Usuário */}
    <Text style={styles.text}>Nome de usuário:</Text>
    <View style={styles.input}>
    <TextInput
      style={styles.textInput}
      value={username}
      placeholder="Nome de Usuário"
      onChangeText={setUsername}
      autoCapitalize="none"
    />
    </View>
    {errors.username ? <Text style={styles.error}>{errors.username}</Text> : null}

{/* E-mail */}
    <Text style={styles.text}>E-mail:</Text>
    <View style={styles.input}>
    <TextInput
      style={styles.textInput}
      value={email}
      placeholder="E-mail"
      keyboardType="email-address"
      onChangeText={setEmail}
      autoCapitalize="none"
    />
    </View>
    {errors.email ? <Text style={styles.error}>{errors.email}</Text> : null}

{/* Número de Telefone */}
    <Text style={styles.text}>Número de telefone:</Text>
    <View style={styles.input} flexDirection={'row'} alignItems={'center'}>
    <Text style={styles.textInput} width={'14%'} height={'100%'} borderRightWidth={1}>+55</Text>
    <TextInput
      style={styles.textInput}
      paddingLeft={10}
      width={'86%'}
      value={formatPhoneNumber(phoneNumber)}
      keyboardType='numeric'
      placeholder="Número de Telefone"
      maxLength={13}
      onChangeText={(text) => setPhoneNumber(text)}
    />
    </View>
    {errors.phoneNumber ? <Text style={styles.error}>{errors.phoneNumber}</Text> : null}

{/* Senha */}
    <Text style={styles.text}>Senha:</Text>
    <View style={styles.input} flexDirection={'row'} alignItems={'center'} justifyContent={'space-between'}>
      <TextInput
          style={styles.textInput}
          width={'86%'}
          value={password}
          placeholder="Senha"
          secureTextEntry={!passwordShown}
          onChangeText={setPassword}
      />
      <TouchableOpacity width={'14%'} onPress={() => setPasswordShown(!passwordShown)}>
          <IconI name={passwordShown ? "eye" : "eye-off"} size={30} marginRight={10} color="#6A6A6A"/>
      </TouchableOpacity>
    </View>
    {errors.password ? <Text style={styles.error}>{errors.password}</Text> : null}

{/* Confirmação da Senha */}
    <Text style={styles.text}>Confirmar senha:</Text>
    <View style={styles.input}>
    <TextInput
      style={styles.textInput}
      value={confirmPassword}
      placeholder="Confirmar Senha"
      secureTextEntry
      onChangeText={setConfirmPassword}
    />
    </View>
    {errors.confirmPassword ? <Text style={styles.error}>{errors.confirmPassword}</Text> : null}
    
{/* Confirmar termos e condições */}
    <View style={styles.linha}>
      <CheckBox
        disabled={false}
        value={isChecked}
        onValueChange={() => setIsChecked(!isChecked)}
        color={isChecked ? '#009F4D' : undefined}
      />
      <Text style={styles.text}>  Aceito os Termos e Condições.</Text>
    </View>

{/* Botão de Criar Conta */}
    <View style={styles.buttonsContainer}>
      {error ? <Text style={styles.error}>{error}</Text> : null}
      <TouchableOpacity title="Registrar" style={styles.registrarButton} onPress={handleRegister} >
            <Text style={styles.registrarButtonText}>Criar conta</Text>
      </TouchableOpacity>

{/* Botão de Realizar Login */}
      <View style={styles.linha}>
        <Text style={styles.text}>Já tenho uma conta: </Text>
        <TouchableOpacity title="Registrar" style={styles.loginButton} onPress={handleLogin} >
              <Text style={styles.loginButtonText}>Fazer login</Text>
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
    padding:  30,
    paddingTop:  0,
  },

  linha: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  title: {
    color: '#000000',
    marginTop:  20,
    marginBottom:  10,
    fontSize: 32,
    fontWeight: 'bold',
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
    marginBottom:  10,
    justifyContent: 'center',
  },

  buttonsContainer: {
    alignItems: 'center',
    margin: 20,
  },
  registrarButton: {
    height:  60,
    backgroundColor: '#6A6A6A',
    marginTop:  20,
    marginBottom: 20,
    paddingHorizontal: 40,
    borderRadius: 40,
    justifyContent: 'center',
  },
  registrarButtonText: {
    color: '#F9F9F9',
    fontSize: 20,
    textAlign: 'center',
    fontWeight: 'bold',
  },
  loginButton: {
  },
  loginButtonText: {
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

export default RegisterPage;