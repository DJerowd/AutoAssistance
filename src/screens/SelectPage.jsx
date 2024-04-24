import { React, useState } from 'react';
import { View, TouchableOpacity, Text, StyleSheet, FlatList } from 'react-native';
import Modal from 'react-native-modal';
import IconMCI from 'react-native-vector-icons/MaterialCommunityIcons';

import { VehiclesDB } from '../database/VehiclesDB';


const SelectPage = ({ navigation }) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const {vehicles, setVehicles} = VehiclesDB(); 
  const [selectedVehicle, setSelectedVehicle] = useState('');

{/* Navegação para a Página de Detalhes Do Item Selecionado */}
    const handleItemPress = (item) => {
      console.log('Item Selecionado:', item);
      navigation.navigate(item);
    };

{/* Definição da Visibilidade da Lista de Veículo Ativo */}
    const toggleModal = () => {
      setIsModalVisible(!isModalVisible);
    };

{/* Seleção do Veículo Ativo */}
    const handleVehicleChange = (item) => {
      console.log('Veículo Selecionado:', item);
      setSelectedVehicle(item);
    };

  return (
    <View style={styles.container}>
      <View style={{ height: 50, paddingHorizontal: 40, justifyContent: 'center', backgroundColor: '#009F4D'}}>
        
{/* Seleção do Veículo Ativo */}
      <TouchableOpacity onPress={toggleModal}>
      {(!selectedVehicle == '') && (
        <Text style={styles.carPicker}>{selectedVehicle.name} | {selectedVehicle.brand} {selectedVehicle.model}</Text>
      )}
      {(selectedVehicle == '') && (
        <Text style={styles.carPicker}>Selecione aqui um veículo.</Text>
      )}
      </TouchableOpacity>

{/* Lista de Veículo Ativo */}
        <Modal isVisible={isModalVisible} onBackdropPress={toggleModal}>
          <View style={styles.modalContainer}>
            <FlatList
              data={vehicles}
              renderItem={({ item }) => (
                <TouchableOpacity onPress={() => handleVehicleChange(item)}>
                  <Text style={styles.modalContainerText}>{item.id} - {item.name} - {item.brand} {item.model}</Text>
                </TouchableOpacity>
              )}
              keyExtractor={(item) => item.id}
            />
          </View>
        </Modal>
      </View>

{/* Background da Página */}
    <View style={styles.container}>

      <View style={styles.buttonsContainer}>
        
{/* Botão Manutenções Pendentes */}
        <View style={styles.linha}>
          <View style={styles.item}>
            <TouchableOpacity
              style={styles.button}
              onPress={() => handleItemPress('MaintencePage')}
            >
              <IconMCI 
              name="car-wrench" 
              color={'#ffffff'} 
              size={120} 
              />
            </TouchableOpacity>
            <Text style={styles.buttonText}>
              Manutenções Pendentes
            </Text>
          </View>

{/* Botão Veículos Salvos */}
          <View style={styles.item}>
            <TouchableOpacity
              style={styles.button}
              onPress={() => handleItemPress('VehiclesPage')}
            >
              <IconMCI 
              name="garage" 
              color={'#ffffff'} 
              size={140} 
              />
            </TouchableOpacity>
            <Text style={styles.buttonText}>
              Veiculos Salvos
            </Text>
          </View>
        </View>

{/* Botão Histórico de Problemas */}
        <View style={styles.linha}>
          <View style={styles.item}>
            <TouchableOpacity
              style={styles.button}
              // onPress={() => handleItemPress('historicoPage')}
            >
              <IconMCI 
              name="history" 
              color={'#ffffff'} 
              size={120} 
              />
            </TouchableOpacity>
            <Text style={styles.buttonText}>
              Histórico de Problemas
            </Text>
          </View>
          
{/* Botão identificação de Problemas */}
          <View style={styles.item}>
            <TouchableOpacity
              style={styles.button}
              // onPress={() => handleItemPress('identificacaoPage')}
            >
              <IconMCI 
              name="clipboard-search" 
              color={'#ffffff'} 
              size={100} 
              />
            </TouchableOpacity>
            <Text style={styles.buttonText}>
              Identificação de problemas
            </Text>
          </View>
        </View>

{/* Botão Mapa */}
        <View style={styles.linha}>
          <View style={styles.item}>
            <TouchableOpacity
              style={styles.button}
              // onPress={() => handleItemPress('mapaPage')}
            >
              <IconMCI 
              name="map-search" 
              color={'#ffffff'} 
              size={100} 
              />
            </TouchableOpacity>
            <Text style={styles.buttonText}>
              Mapa
            </Text>
          </View>
        </View>

      </View>

    </View>
    </View>
  );
};


const styles = StyleSheet.create({
  container: {
    flex:  1,
    backgroundColor: '#101010',
  },

  linha: {
    justifyContent: 'center',
    flexDirection: 'row',
  },

  carPicker:{
    color: '#FFFFFF',
    backgroundColor: '#009F4D',
    borderColor: '#6A6A6A55',
    borderWidth: 2,
    borderRadius: 6,
    height: 40,
    paddingHorizontal: 10,
    fontSize: 18,
    fontWeight: 'bold',
    textAlignVertical: 'center',
  },

  modalContainer: {
    color: '#FFFFFF',
    backgroundColor: '#009F4D',
    marginHorizontal: 16,
  },
  modalContainerText: {
    color: '#FFFFFF',
    borderBottomColor: '#6A6A6A99',
    borderBottomWidth: 2,
    fontSize: 18,
    paddingHorizontal: 10,
  },

  buttonsContainer: {
    margin: 10,
  },
  button: {
    height:  140,
    width: 140,
    borderRadius: 12,
    backgroundColor: '#6A6A6A',
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    color: '#ffffff',
    textShadowColor: '#000000',
    textShadowRadius: 6,
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  item: {
    width: 140,
    alignItems: 'center',
    marginHorizontal: 20,
    marginVertical: 4,
  },
});

export default SelectPage;
