import { React, useEffect, useState } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, ActivityIndicator } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

import AsyncStorage from '@react-native-async-storage/async-storage';
import { fetchUserVehicles } from '../database/VehiclesDatabase';

const ProfilePage = ({ navigation }) => {
    const [vehicles, setVehicles] = useState([]); 
    const [user, setUser] = useState('');
    const [loading, setLoading] = useState(true);

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

   {/* Carregar os Veículos do Usuário Ativo Após Carregar o ID de Usuário */}
   useEffect(() => {
    if (user && user.id) {
      fetchUserVehicles(user.id).then(setVehicles).catch(console.error);
      setLoading(false);
    }
  }, [user]);

  
  const handleEdit = () => {
    navigation.navigate('EditProfilePage');
  };

  {/* Tela de carregamento */}
  if (loading) {
    return (
      <View style={styles.container}>
        <View style={{height: '100%', alignItems: 'center', justifyContent: 'center'}}>
        <Text style={{color: '#6A6A6A', fontWeight: '500', fontSize: 32, margin: 10}}>Carregando...</Text>
        <ActivityIndicator size="100" color="#6A6A6A" style={{margin: 10}} />
        </View>
      </View>
    );
  }

    return (
      <View style={styles.container}>
        <TouchableOpacity style={{ position: 'absolute', right: 20, top: 20 }} onPress={handleEdit}>
          <MaterialCommunityIcons name="pencil" size={40} color="#000000" />
        </TouchableOpacity>

        {/* Imagem de Perfil */}
        <View style={styles.perfil}>
          <Image
          source={require('../assets/Profile.png')}
          style={styles.image}
          />
        </View>
  
        {/* Nome de Usuários */}
        <Text style={styles.textTitle}>Nome: </Text>
        <Text style={styles.textInput}>{user.username}</Text>
  
        {/* E-mail */}
        <Text style={styles.textTitle}>E-mail: </Text>
        <Text style={styles.textInput}>{user.email}</Text>
  
        {/* Telefone de Contato */}
        <Text style={styles.textTitle}>Telefone: </Text>
        <Text style={styles.textInput}>{user.phoneNumber}</Text>
     
  
        {/* Quantidade de Veículos Registrados */}
        <View style={styles.linha} justifyContent={'flex-start'}>
          <Text style={styles.textTitle}>Veiculos:</Text>
          <Text style={styles.text} marginHorizontal={10}>{vehicles.length}</Text>
        </View>
  
      </View>
    );
  };
  
  
  const styles = StyleSheet.create({
    container: {
      flex:  1,
      backgroundColor: '#F9F9F9',
      padding:  20,
    },

    linha: {
        justifyContent: 'center',
        flexDirection: 'row',
      },

    perfil: {
      width: 300,
      height: 300,
      backgroundColor: '#6A6A6A55',
      borderRadius: 150,
      borderColor: '#000000',
      borderWidth: 10,
      alignSelf: 'center',
      alignItems: 'center',
      justifyContent: 'center',
      marginBottom: 20,
    },
    image: {
      height: 300,
      width: 300,
      alignSelf: 'center',
      borderRadius: 150,
    },

    textTitle: {
      color: '#000000',
      fontSize: 22,
      fontWeight: '500',
    },
    text: {
      color: '#6A6A6A',
      fontSize: 22,
    },
    textInput: {
      color: '#6A6A6A',
      borderColor: '#6A6A6A',
      borderBottomWidth: 1,
      fontSize: 20,
      marginBottom: 10,
      paddingHorizontal: 6,
      paddingBottom: 6,
      marginTop: 4,
    },
  });
  
  export default ProfilePage;