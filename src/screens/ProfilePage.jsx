import { React, useEffect, useState } from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { VehiclesDB } from '../database/VehiclesDB';

const ProfilePage = () => {
    const {vehicles, setVehicles} = VehiclesDB(); 
    const [user, setUser] = useState('');
  
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
    
    return (
      <View style={styles.container}>
  
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
  
  {/* Localização do Usuário */}
        
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
      fontSize: 20,
      marginBottom: 10,
    },
    textInput: {
      color: '#6A6A6A',
      borderColor: '#6A6A6A',
      borderBottomWidth: 1,
      fontSize: 20,
      marginBottom: 10,
      paddingHorizontal: 6,
      paddingVertical: 2,
      marginTop: 4,
    },
  });
  
  export default ProfilePage;