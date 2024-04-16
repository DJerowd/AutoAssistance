import { React } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import IconI from 'react-native-vector-icons/Ionicons';
import { VehiclesDB } from '../components/VehiclesDB';

const VehiclesPage = ({ navigation }) => {
  const {vehicles, setVehicles} = VehiclesDB();  

{/* Identificação do Codigo HEX de Cor */}
  const getColorCode = (colorName) => {
    switch (colorName.toLowerCase()) {
      case 'preto':
        return '#00000077';
      case 'cinza':
        return '#4A4A4A77';
      case 'prata':
        return '#C3BFBF77';
      case 'branco':
        return '#EEEEEE77';
      case 'vermelho':
        return '#FF000077';
      case 'azul':
        return '#2400FF77';
      case 'verde':
        return '#21A40077';
      case 'amarelo':
        return '#FAFF0077';
      case 'laranja':
        return '#FF990077';
      case 'marrom':
        return '#52310077';
      case 'rosa':
        return '#FF00D677';
     
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
      <IconI 
                name="car-sport-sharp" 
                style={[styles.icon, { backgroundColor: getColorCode(item.color) }]}
                size={40}
            />

      <View style={styles.coluna}>
        <Text style={styles.itemTitle}>{item.id} - {item.name}</Text>
        <Text style={styles.itemText}>Veículo: {item.brand} {item.model}</Text>
      </View>
    </TouchableOpacity>
  );


{/* Navegação para a Página de Adicionar Novo Veículo */}
  const handleItemPress = (item) => {
    console.log('Item Selecionado:', item);
    navigation.navigate(item);
  };

  return (
    <View style={styles.container}>

{/* Lista de Veículos */}  
      <FlatList
        data={vehicles}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}  
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
    paddingHorizontal: 20,
  },

  icon: {
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
  itemTitle: {
    color: '#6A6A6A',
    fontSize: 20,
    fontWeight: 'bold',
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