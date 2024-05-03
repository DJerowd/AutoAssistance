import { React, useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, Alert } from 'react-native';

import AsyncStorage from '@react-native-async-storage/async-storage';
import { updateUser } from '../database/UsersDatabase';

const EditProfilePage = ({ navigation }) => {
    const [user, setUser] = useState('');
    const [username, setUsername] = useState(user.username);
    const [email, setEmail] = useState(user.email);
    const [phoneNumber, setPhoneNumber] = useState(user.phoneNumber);
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [currentPassword, setCurrentPassword] = useState(user.password);
    const [confirmActualPassword, setConfirmActualPassword] = useState('');
    const [error, setError] = useState('');
  
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

   
   {/* Carregar as Informações do Usuário Ativo Após Carregar o ID de Usuário */}
   useEffect(() => {
    if (user && user.id) {
      setUsername(user.username);
      setEmail(user.email)
      setPhoneNumber(user.phoneNumber)
      setPassword(user.password)
      setConfirmPassword(user.password)
      setCurrentPassword(user.password)
    }
  }, [user]);

  const formatPhoneNumber = (phoneNumberString) => {
    const cleaned = ('' + phoneNumberString).replace(/\D/g, '');
    const match = cleaned.match(/^(\d{2})(\d{5})(\d{4})$/);
    if (match) {
      return match[1] + ' ' + match[2] + '-' + match[3];
    }
    return null;
  };


  {/* Salvar */}
  const handleUpdateProfile = () => {

    const updatedUser = {
      ...user,
      username,
      email,
      phoneNumber,
      password,
    };
  
  {/* Alerta ao Tentar Salvar sem Preencher os Campos Necessários */}
      if (!username || !email || !password || currentPassword!== confirmActualPassword || password!== confirmPassword) {
        Alert.alert(
          'Campos não preenchidos',
          'Por favor, preencha todos os campos obrigatórios.',
          [
            {
              text: 'OK',
              onPress: () => console.log('OK Pressed'),
              style: 'cancel',
            },
          ],
          { cancelable: false }
        );

        if (!username || !email) {
          setError('Os campos de Nome e email não podem estar vazios.');

        } else if (currentPassword!== confirmActualPassword) {
          setError('A senha atual está incorreta.');

        } else if (password!== confirmPassword) {
          setError('A nova senha não coincide com a confirmação.');

        } else {
          setError('Todos os campos devem ser preenchidos corretamente.');
        }
        
        return;
      }
      setError('');
      
      {/* Salvar atualizações do Usuário */}
      Alert.alert(
    "Confirmar Atualização",
    "Você tem certeza de que deseja salvar as alterações?",
    [
      { text: "Cancelar", onPress: () => console.log("Cancel Pressed"), style: "cancel" },
      { text: "Confirmar", onPress: () => {
        updateUser(updatedUser)
        console.log('Usuário atualizado:', updatedUser);
        navigation.navigate('StartPage');
        Alert.alert('Usuário Atualizado com Sucesso!');
      }}
    ]
  );
   };


    return (
      <View style={styles.container}>
        {/* Título */}
        <Text style={styles.title}>Editar Perfil:</Text>

        <View style={styles.input}>
          <Text style={styles.text}>Nome de Usuário</Text>
          <TextInput
            style={styles.textInput}
            value={username}
            onChangeText={setUsername}
            placeholder="Nome de Usuário"
          />
        </View>

        <View style={styles.input}>
          <Text style={styles.text}>E-mail</Text>
          <TextInput
            style={styles.textInput}
            value={email}
            onChangeText={setEmail}
            placeholder="E-mail"
            keyboardType="email-address"
          />
        </View>

        <View style={styles.input}>
          <Text style={styles.text}>Número de Telefone</Text>
          <TextInput
            style={styles.textInput}
            value={phoneNumber}
            onChangeText={setPhoneNumber}
            placeholder="Número de Telefone"
            keyboardType="phone-pad"
          />
        </View>

        <View style={styles.input}>
          <Text style={styles.text}>Confirme a Senha Atual</Text>
          <TextInput
            style={styles.textInput}
            value={confirmActualPassword}
            onChangeText={setConfirmActualPassword}
            placeholder="Senha Atual"
            secureTextEntry
          />
        </View>

        <View style={styles.input}>
          <Text style={styles.text}>Senha</Text>
          <TextInput
            style={styles.textInput}
            onChangeText={setPassword}
            placeholder="Senha"
            secureTextEntry
          />
        </View>

        <View style={styles.input}>
          <Text style={styles.text}>Confirmação de Senha</Text>
          <TextInput
            style={styles.textInput}
            onChangeText={setConfirmPassword}
            placeholder="Confirmação de Senha"
            secureTextEntry
          />
        </View>

        {/* Exibição de erro */}
        {error ? <Text style={styles.error}>{error}</Text> : null}

        {/* Botão para Atualizar Perfil */}
        <TouchableOpacity title="Atualizar Perfil" style={styles.updateButton} onPress={handleUpdateProfile}>
        <Text style={styles.updateButtonText}>Atualizar Perfil</Text>
        </TouchableOpacity>
      </View>
    );
  };
  
  
  const styles = StyleSheet.create({
      container: {
        flex:  1,
        backgroundColor: '#F9F9F9',
      },

      linha: {
        justifyContent: 'center',
        flexDirection: 'row',
      },

      title: {
        color: '#000000',
        marginTop: 10,
        marginBottom: 10,
        paddingHorizontal: 30,
        fontSize: 24,
        fontWeight: 'bold',
      },
      
      text: {
        color: '#000000',
        fontSize: 20,
        fontWeight: '500',
      },
      textInput: {
        color: '#000000',
        backgroundColor: '#6A6A6A22',
        height: 48,
        fontSize: 18,
        textAlignVertical: 'center',
        borderWidth: 1,
        borderColor: '#000000',
        borderRadius: 8,
        padding: 10,
        marginBottom: 10,
      },
      input: {
        width: '100%',
        paddingHorizontal: 30,
      },

      error: {
        color: '#ff0000',
        fontSize: 14,
        fontWeight: 'bold',
        textAlign: 'center',
      },

      updateButton: {
        backgroundColor: '#009F4D',
        borderColor: '#009F4D',
        borderWidth: 4,
        padding: 20,
        borderRadius: 12,
        alignItems: 'center',
        marginVertical: 20,
        marginHorizontal: 30,
      },
      updateButtonText: {
        color: '#FFFFFF',
        fontSize: 20,
        fontWeight: 'bold',
      },
  });
  
  export default EditProfilePage;