import { React, useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';

const VehiclesPage = ({ navigation }) => {
  const [vehicles, setVehicles] = useState([
    { id: '1', name: 'Carro 1' },
    { id: '2', name: 'Carro 2' },
    { id: '3', name: 'Carro 3' },
  ]);

  const renderItem = ({ item }) => (
    <TouchableOpacity style={styles.item}>
      <Text style={styles.itemText}>{item.name}</Text>
    </TouchableOpacity>
  );

  const handleItemPress = (item) => {
    console.log('Item Selecionado:', item);
    navigation.navigate(item);
  };

  const handleAddVehicle = () => {
    const newVehicle = {
// Gera um ID único para o novo veículo
      id: (Math.random() * 1000000).toString(),
// Nome padrão para o novo veículo
      name: `Carro ${vehicles.length + 1}`, 
    };
// Adiciona o novo veículo à lista de veículos
    setVehicles([...vehicles, newVehicle]);
  };

  return (
    <View style={styles.container}>
        
      <FlatList
        data={vehicles}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
      />

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
    paddingVertical: 20,
    paddingHorizontal: 10,
  },

  item: {
    backgroundColor: '#6A6A6A',
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
    borderRadius: 8,
  },
  itemText: {
    color: '#ffffff',
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
  },

  addButton: {
    backgroundColor: '#009F4D',
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
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