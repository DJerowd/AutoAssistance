import { React, useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, Image, Alert  } from 'react-native';

import AsyncStorage from '@react-native-async-storage/async-storage';
import { deleteVehicle } from '../../database/VehiclesDatabase';

const VehicleDetailsPage = ({ route, navigation }) => {
  const { vehicle } = route.params;
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


  const handleDeleteVehicle = () => {
    {/* Alerta ae Confirmação de Excluir Veículo */}
    Alert.alert(
      'Excluir Veículo',
      'Tem certeza que deseja excluir este veículo permanentemente?',
      [
        {
          text: 'Cancelar',
          style: 'cancel',
        },
        {
          text: 'Confirmar',
          onPress: () => {
            deleteVehicle(vehicle.id, user.id);
            Alert.alert('Veículo excluído com sucesso');
            console.log('Veículo excluído com sucesso');
            navigation.navigate('SelectNavigator');
          },
          style: 'destructive',
        },
      ],
      { cancelable: false, alertContainerStyle: styles.alertContainer }
    );
  };

{/* Navegação para a Página de Editar Veículo */}
  const handleEditVehicle = () => {
    navigation.navigate('EditVehiclePage', { vehicle });
  };

  return (
    <ScrollView style={styles.container}>
        
{/* Identificação do Veículo */}
    <Text style={styles.title}>{vehicle.name}</Text>
      <View style={styles.imageLabel}>
        <Image
            source={{ uri: 'https://cdn.vectorstock.com/i/preview-1x/75/52/modern-car-hatchback-abstract-silhouette-vector-45697552.jpg' }}
            style={styles.image}
            resizeMode="contain"
        />
      </View>

{/* Marca do Veículo */}
      <View style={styles.linha}>
        <Text style={styles.label}>Marca:</Text>
        <Text style={styles.text}>{vehicle.brand}</Text>
      </View>

{/* Modelo do Veículo */}
      <View style={styles.linha}>
      <Text style={styles.label}>Modelo:</Text> 
      <Text style={styles.text}>{vehicle.model}</Text>
      </View>
      
{/* Versão do Veículo */}
      <View style={styles.linha}>
      <Text style={styles.label}>Versão:</Text> 
      <Text style={styles.text}>{vehicle.version}</Text>
      </View>

{/* Cor do Veículo */}
      <View style={styles.linha}>
      <Text style={styles.label}>Cor:</Text> 
      <Text style={styles.text}>{vehicle.color}</Text>
      </View>

{/* Ano de Fabricação do Veículo */}
      <View style={styles.linha}>
      <Text style={styles.label}>Ano de Fabricação:</Text> 
      <Text style={styles.text}>{vehicle.manufactureYear || '(Não informado)'}</Text>
      </View>

{/* Placa do Veículo */}
      <View style={styles.linha}>
      <Text style={styles.label}>Placa:</Text> 
      <Text style={styles.text}>{vehicle.licensePlate || '(Não informado)'}</Text>
      </View>

{/* Tipo de Combustível do Veículo */}
      <View style={styles.linha}>
      <Text style={styles.label}>Tipo de Combustível:</Text> 
      <Text style={styles.text}>{vehicle.fuelType}</Text>
      </View>

{/* Tipo de Câmbio do Veículo */}
      <View style={styles.linha}>
      <Text style={styles.label}>Câmbio:</Text> 
      <Text style={styles.text}>{vehicle.transmission}</Text>
      </View>
      
{/* Motor do Veículo */}
      <View style={styles.linha}>
      <Text style={styles.label}>Motor:</Text> 
      <Text style={styles.text}>{vehicle.engine}</Text>
      </View>

{/* Quilometragem do Veículo */}
      <View style={styles.linha}>
      <Text style={styles.label}>Quilometragem:</Text> 
      <Text style={styles.text}>{vehicle.mileage} Km</Text>
      </View>

{/* Botão de Editar Informações */}
      <TouchableOpacity style={styles.editButton} onPress={handleEditVehicle}>
        <Text style={styles.editButtonText}>Editar Informações</Text>
      </TouchableOpacity>

{/* Botão de Excluir Veículo */}
      <TouchableOpacity style={styles.deleteButton} onPress={handleDeleteVehicle}>
        <Text style={styles.deleteButtonText}>Excluir Veículo</Text>
      </TouchableOpacity>

    </ScrollView>
  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingVertical: 10,
    backgroundColor: '#F9F9F9',
  },

  linha: {
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomColor: '#6A6A6A',
    borderBottomWidth: 1,
  },

  title: {
    color: '#000000',
    paddingVertical: 4,
    fontSize: 24,
    fontWeight: 'bold',
  },

  imageLabel: {
    borderColor: '#000000',
    borderWidth: 2,
    borderRadius: 10,
    marginBottom: 10,
    aspectRatio: 16 / 9,
    width: '100%',
    alignSelf: 'center',
  },
  image: {
    flex: 1,
  },

  label: {
    color: '#000000',
    fontSize: 20,
    marginVertical: 4,
    fontWeight: '500',
  },

  text: {
    color: '#6A6A6A',
    marginVertical: 6,
    fontSize: 18,
    paddingHorizontal: 10,
  },

  editButton: {
    backgroundColor: '#009F4D',
    borderColor: '#009F4D',
    padding: 20,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 10,
  },
  editButtonText: {
    color: '#FFFFFF',
    fontSize: 20,
    fontWeight: 'bold',
  },

  deleteButton: {
    backgroundColor: '#F9F9F9',
    borderColor: '#009F4D',
    borderWidth: 4,
    padding: 20,
    borderRadius: 12,
    alignItems: 'center',
    marginBottom: 40,
  },
  deleteButtonText: {
    color: '#009F4D',
    fontSize: 20,
    fontWeight: 'bold',
  },
  
  alertContainer: {
    borderRadius: 10,
    backgroundColor: '#009F4D',
    elevation: 6,
  },
});

export default VehicleDetailsPage;
