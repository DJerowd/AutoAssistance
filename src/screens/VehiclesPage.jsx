import { React, useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import IconI from 'react-native-vector-icons/Ionicons';

const VehiclesPage = ({ navigation }) => {
  const [vehicles, setVehicles] = useState([
    { id: '1', name: 'Carro 1', brand: 'Peugeot', model: '208', mileage: 100000 },
    { id: '2', name: 'Carro 2', brand: 'Fiat', model: 'Argo', mileage: 10000 },
    { id: '3', name: 'Carro 3', brand: 'Volkswagen', model: 'Polo', version: 'Highline', color: 'Cinza', manufactureYear: '2024', licensePlate: 'HIJ7K89', fuelType: 'Etanol (Flex)', transmission: 'Manual', engine: '2.0', mileage: 150000 },
    { id: '4', name: 'Carro 4', brand: 'Ford', model: 'Fiesta', mileage: 10000 },
    { id: '5', name: 'Carro 5', brand: 'Renault', model: 'Kwid', mileage: 10000 },
    { id: '6', name: 'Carro 6', brand: 'Chevrolet', model: 'Onix', mileage: 10000 },
    { id: '7', name: 'Carro 7', brand: 'Citroen', model: 'C3', mileage: 10000 },
    { id: '8', name: 'Carro 8', brand: 'Nissan', model: 'March', mileage: 10000 },
    { id: '9', name: 'Carro 9', brand: 'Honda', model: 'Fit', mileage: 10000 },
  ]);  

  const renderItem = ({ item }) => (
    <TouchableOpacity 
      style={styles.item}
      onPress={() => handleItemDetailsPress(item)}
    >
      <IconI 
                name="car-sport-sharp" 
                style={styles.icon} 
                size={40}
            />

      <View style={styles.coluna}>
        <Text style={styles.itemText}>{item.id} - {item.name}</Text>
        <Text style={styles.itemText}>Veículo: {item.brand} {item.model}</Text>
      </View>
    </TouchableOpacity>
  );

  const handleItemDetailsPress = (item) => {
    console.log('Item Selecionado:', item);
    navigation.navigate('VehicleDetailsPage', { vehicle: item });
  };

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
        borderBottomWidth={4}
        borderBottomColor={'#6A6A6A11'}
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

  coluna: {
    paddingHorizontal: 20,
  },

  icon: {
    backgroundColor: '#6A6A6A55',
    color: '#6A6A6A',
    borderRadius: 30,
    padding: 6,
  },

  item: {
    borderColor: '#6A6A6A11',
    borderWidth: 2,
    padding: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  itemText: {
    color: '#6A6A6A',
    fontSize: 20,
    fontWeight: 'bold',
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