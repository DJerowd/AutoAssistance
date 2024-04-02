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
  },

  item: {
    borderColor: '#6A6A6A',
    borderWidth: 1,
    padding: 10,
  },
  itemText: {
    color: '#6A6A6A',
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
  },

  addButton: {
    backgroundColor: '#009F4D',
    padding: 20,
    marginVertical: 30,
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