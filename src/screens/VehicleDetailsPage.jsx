import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, Image, Alert  } from 'react-native';

const VehicleDetailsPage = ({ route, navigation }) => {
  const { vehicle } = route.params;

{/* Alerta ae Confirmação de Excluir Veículo */}
  const handleDeleteVehicle = () => {
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
            Alert.alert('Veículo excluído com sucesso');
            console.log('Veículo excluído com sucesso');
            navigation.goBack();
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
    <Text style={styles.title}>{vehicle.id} - {vehicle.name}</Text>
      <View style={styles.imageLabel}>
        <Image
            source={{ uri: 'https://cdn.vectorstock.com/i/preview-1x/75/52/modern-car-hatchback-abstract-silhouette-vector-45697552.jpg' }}
            style={styles.image}
            resizeMode="contain"
        />
      </View>

{/* Marca do Veículo */}
      <Text style={styles.label}>Marca:</Text>
      <Text style={styles.text}>{vehicle.brand}</Text>

{/* Modelo do Veículo */}
      <Text style={styles.label}>Modelo:</Text> 
      <Text style={styles.text}>{vehicle.model}</Text>
      
{/* Versão do Veículo */}
      <Text style={styles.label}>Versão:</Text> 
      <Text style={styles.text}>{vehicle.version}</Text>

{/* Cor do Veículo */}
      <Text style={styles.label}>Cor:</Text> 
      <Text style={styles.text}>{vehicle.color}</Text>

{/* Ano de Fabricação do Veículo */}
      <Text style={styles.label}>Ano de Fabricação:</Text> 
      <Text style={styles.text}>{vehicle.manufactureYear}</Text>

{/* Placa do Veículo */}
      <Text style={styles.label}>Placa:</Text> 
      <Text style={styles.text}>{vehicle.licensePlate}</Text>

{/* Tipo de Combustível do Veículo */}
      <Text style={styles.label}>Tipo de Combustível:</Text> 
      <Text style={styles.text}>{vehicle.fuelType}</Text>

{/* Tipo de Câmbio do Veículo */}
      <Text style={styles.label}>Câmbio:</Text> 
      <Text style={styles.text}>{vehicle.transmission}</Text>
      
{/* Motor do Veículo */}
      <Text style={styles.label}>Motor:</Text> 
      <Text style={styles.text}>{vehicle.engine}</Text>

{/* Quilometragem do Veículo */}
      <Text style={styles.label}>Quilometragem:</Text> 
      <Text style={styles.text}>{vehicle.mileage} Km</Text>

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

  title: {
    backgroundColor: '#009F4D',
    color: '#FFFFFF',
    borderColor: '#6A6A6A',
    borderWidth: 4,
    borderBottomWidth: 0,
    paddingHorizontal: 10,
    paddingVertical: 4,
    fontSize: 18,
    fontWeight: 'bold',
  },

  imageLabel: {
    borderColor: '#6A6A6A',
    borderWidth: 4,
    width: '100%',
    aspectRatio: 16 / 9,
    alignSelf: 'center',
    marginBottom: 20,
  },
  image: {
    flex: 1,
  },

  label: {
    color: '#6A6A6A',
    fontSize: 20,
    fontWeight: 'bold',
  },

  text: {
    color: '#6A6A6A',
    borderBottomColor: '#6A6A6A99',
    borderBottomWidth: 2,
    marginBottom: 20,
    marginTop: 10,
    fontSize: 18,
    paddingHorizontal: 10,
  },

  editButton: {
    backgroundColor: '#009F4D',
    borderColor: '#009F4D',
    borderWidth: 4,
    padding: 20,
    borderRadius: 12,
    alignItems: 'center',
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
