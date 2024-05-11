import { React, useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Modal from 'react-native-modal';

import AsyncStorage from '@react-native-async-storage/async-storage';
import { updateUser, deleteUser } from '../database/UsersDatabase';

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
    const [isModalVisible, setIsModalVisible] = useState(false);
  
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

  const toggleModal = () => {
    setIsModalVisible(!isModalVisible);
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
        navigation.navigate('LoginPage');
        Alert.alert('Usuário Atualizado com Sucesso!');
      }}
    ]
  );
   };

  const handleDelete = () => {
    if (currentPassword == confirmActualPassword) {
      deleteUser(user.id)
      toggleModal();
      Alert.alert('Usuário excluído com sucesso');
      console.log('Usuário excluído: ', user);
      navigation.navigate('LoginPage');
    } else {
      toggleModal();
      Alert.alert("", "A senha atual está incorreta.");
    }
  };

    return (
      <View style={styles.container}>
        {/* Título */}
        <Text style={styles.title}>Editar Perfil:</Text>
        <TouchableOpacity style={{ position: 'absolute', right: 30, top: 10 }} onPress={toggleModal}>
          <Ionicons name="trash" size={40} color="#000000" />
        </TouchableOpacity>

        {/* Tela de Confirmar Exclusão */} 
        <Modal animationIn={'zoomIn'} animationOut={'zoomOut'} isVisible={isModalVisible} onBackdropPress={toggleModal}>
          <View style={styles.modalContainer}>

            <Text style={styles.modalTitle}>Excluir Usuário</Text>
            <Text style={styles.modalText}>Tem certeza que deseja excluir este usuário permanentemente?</Text>
          
            <Text style={styles.text}>Confirme a Senha Atual</Text>
            <TextInput
              style={styles.textInput}
              value={confirmActualPassword}
              onChangeText={setConfirmActualPassword}
              placeholder="Senha Atual"
              secureTextEntry
            />

            <View style={styles.linha} justifyContent={'space-between'}>
              <TouchableOpacity style={styles.modalButton} onPress={toggleModal} >
                <Text style={styles.modalButtonText}>Não</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.modalButton} onPress={handleDelete} >
                <Text style={styles.modalButtonText}>Excluir</Text>
              </TouchableOpacity>
            </View>

          </View>
        </Modal>

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

      modalContainer: {
        backgroundColor: '#FFFFFF',
        borderRadius: 10,
        paddingHorizontal: 20,
        paddingVertical: 20,
        width: '100%',
        alignSelf: 'center',
      },
      modalTitle: {
        color: '#000000',
        fontSize: 20,
        fontWeight: '500',
      },
      modalText: {
        color: '#6A6A6A',
        fontSize: 18,
      },
      modalInput: {
        color: '#6A6A6A',
        backgroundColor: '#6A6A6A22',
        borderColor: '#000000',
        borderWidth: 1,
        borderRadius: 10,
        fontSize: 18,
        height: 40,
        paddingHorizontal: 10,
        marginVertical: 20,
      },
      modalButton: {
        backgroundColor: '#009F4D',
        borderColor: '#009F4D',
        borderWidth: 4,
        padding: 16,
        borderRadius: 10,
        width: '46%',
        justifyContent: 'center',
        alignItems: 'center',
      },
      modalButtonText: {
        color: '#FFFFFF',
        fontSize: 20,
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