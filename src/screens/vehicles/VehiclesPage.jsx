import { React, useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import IconI from 'react-native-vector-icons/Ionicons';

import AsyncStorage from '@react-native-async-storage/async-storage';
import { fetchVehicles, fetchUserVehicles } from '../../database/VehiclesDatabase';

const VehiclesPage = ({ navigation }) => {
  const [vehicles, setVehicles] = useState([]);  
  const [user, setUser] = useState('');

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
  }
}, [user]);

{/* Identificação do Codigo HEX de Cor */}
  const getColorCode = (colorName) => {
    switch (colorName.toLowerCase()) {
      case 'preto':
        return '#000000DD';
      case 'cinza':
        return '#4A4A4ADD';
      case 'prata':
        return '#C3BFBFDD';
      case 'branco':
        return '#EEEEEEDD';
      case 'vermelho':
        return '#FF0000DD';
      case 'azul':
        return '#2400FFDD';
      case 'verde':
        return '#21A400DD';
      case 'amarelo':
        return '#FAFF00DD';
      case 'laranja':
        return '#FF9900DD';
      case 'marrom':
        return '#523100DD';
      case 'rosa':
        return '#FF00D6DD';
     
      default:
        return '#6A6A6A55';
    }
  };

{/* Navegação para a Página de Detalhes Do Veículo Selecionado */}
  const handleItemDetailsPress = (item) => {
    console.log('Item Selecionado:', item);
    navigation.navigate('VehicleDetailsPage', { vehicle: item });
  };
  
{/* Padrão dos Itens da Lista */}
  const renderItem = ({ item }) => (
    <TouchableOpacity 
      style={styles.item}
      onPress={() => handleItemDetailsPress(item)}
    >
      <View style={[styles.iconLabel, { backgroundColor: getColorCode(item.color) }]}>
      <IconI 
        name="car-sport-sharp" 
        style={[styles.icon]}
        size={40}
      />
      </View>

      <View style={styles.coluna}>
        <Text style={styles.itemTitle}>{item.name}</Text>
        <Text style={styles.itemText}>{item.brand} {item.model} {item.version}</Text>
      </View>
    </TouchableOpacity>
  );


{/* Navegação para a Página de Adicionar Novo Veículo */}
  const handleItemPress = (item) => {
    navigation.navigate(item);
  };

  return (
    <View style={styles.container}>
{/* Lista de Veículos */}  
      <FlatList
        data={vehicles}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
        borderBottomWidth={4}
        borderBottomColor={'#6A6A6A11'}
      />

{/* Botão de Navegação para a Página de Adicionar Novo Veículo */}
      <TouchableOpacity 
        style={styles.addButton} 
        onPress={() => handleItemPress('NewVehiclePage')}
        >
        <Text style={styles.addButtonText}>Adicionar Novo Veículo +</Text>
      </TouchableOpacity>

    </View>
  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9F9F9',
  },

  coluna: {
    paddingHorizontal: 10,
  },

  iconLabel: {
    borderColor: '#000000',
    borderRadius: 30,
    borderWidth: 1.8,
  },
  icon: {
    color: '#000000',
    padding: 4,
  },

  item: {
    borderColor: '#6A6A6A55',
    borderWidth: 1,
    paddingHorizontal: 20,
    paddingVertical: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  itemTitle: {
    color: '#000000',
    fontSize: 20,
    fontWeight: '500',
  },
  itemText: {
    color: '#6A6A6A',
    fontSize: 20,
  },

  addButton: {
    backgroundColor: '#009F4D',
    padding: 20,
    marginVertical: 10,
    marginHorizontal: 30,
    borderRadius: 12,
    alignItems: 'center',
  },
  addButtonText: {
    color: '#FFFFFF',
    fontSize: 20,
    fontWeight: 'bold',
  },
});

export default VehiclesPage;