import { React, useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import IconI from 'react-native-vector-icons/Ionicons';
import { VehiclesDB } from '../components/VehiclesDB';

const VehiclesPage = ({ navigation }) => {
  const {vehicles, setVehicles} = VehiclesDB();  

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