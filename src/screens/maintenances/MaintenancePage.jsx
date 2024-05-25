import { React, useCallback, useEffect, useState } from 'react';
import { View, Text, TextInput, StyleSheet, FlatList, TouchableOpacity, Alert, ActivityIndicator } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import IconMCI from 'react-native-vector-icons/MaterialCommunityIcons';
import {Picker} from '@react-native-picker/picker';
import Modal from 'react-native-modal';

import AsyncStorage from '@react-native-async-storage/async-storage';
import { fetchVehicleMaintenances, updateMaintenance } from '../../database/MaintenanceDatabase';
import { fetchUserVehicles, updateVehicle } from '../../database/VehiclesDatabase';

const MaintencePage = ({ navigation }) => {
  const [maintenances, setMaintenances] = useState([]);
  const [vehicles, setVehicles] = useState([]);  
  const [activeVehicle, setActiveVehicle] = useState('');
  const [user, setUser] = useState('');
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [loading, setLoading] = useState(true);

  const [mileage, setMileage] = useState(0);
  const [additionalMileage, setAdditionalMileage] = useState(0);
  const totalMileage = additionalMileage ? parseInt(mileage, 10) + parseInt(additionalMileage, 10) : parseInt(mileage, 10) + 0;


  {/* Carregar o Veículo Ativo */}
  useEffect(() => {
    const fetchActiveVehicle = async () => {
      try {
        const activeVehicleData = await AsyncStorage.getItem('@activeVehicle');
        if (activeVehicleData !== '') {
          setActiveVehicle(JSON.parse(activeVehicleData));
        }
      } catch (error) {
        console.error('Erro ao recuperar os dados do usuário:', error);
      }
    };
    fetchActiveVehicle();
   }, []);

  {/* Carregar as Manutenções do Veículo Ativo Após Carregar o ID de Veículo */}
  useFocusEffect(
    useCallback(() => {
      if (activeVehicle && activeVehicle.id) {
        const fetchAndSetMaintenances = async () => {
          const fetchedMaintenances = await fetchVehicleMaintenances(activeVehicle.id);
          setMaintenances(fetchedMaintenances);
          setMileage(activeVehicle.mileage);
          setLoading(false);
        };

        fetchAndSetMaintenances();
      }
    }, [activeVehicle])
  );

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
    const fetchAndSetVehicles = async () => {
      if (user && user.id) {
        fetchUserVehicles(user.id).then(setVehicles).catch(console.error);
      }
    };
    fetchAndSetVehicles();
  }, [user]);


  {/* Navegação para a Página de Detalhes Do Veículo Selecionado */}
  const handleItemDetailsPress = (item) => {
    console.log('Item Selecionado:', item);
    navigation.navigate('MaintenanceDetailsPage', { maintenance: item });
  };

  {/* Definição da Visibilidade da Lista de Veículo Ativo */}
  const toggleModal = async () => {
    setIsModalVisible(!isModalVisible);
  };

  {/* Adicionar Quilometros */}
  const handleUpdateKilometers = async () => {
    const updatedMaintenances = [];
    const updatedVehicle = {
      ...activeVehicle,
      mileage: totalMileage,
    };
    Alert.alert(
      "Confirmar Atualização",
      "Você tem certeza de que deseja alterar a quilometragem?",
      [
        { text: "Cancelar", onPress: () => console.log("Cancel Pressed"), style: "cancel" },
        { text: "Confirmar", onPress: () => {
          maintenances.forEach((maintenance) => {
            if (maintenance.vehicleId === activeVehicle.id) {
              let kilometer = parseInt(maintenance.kilometers, 10) + parseInt(additionalMileage, 10);
              if (kilometer > maintenance.kilometersTotal) {
                kilometer = parseInt(maintenance.kilometersTotal, 10);
              } 
              const updatedMaintenance = {
                ...maintenance,
                kilometers: kilometer,
              };
              updatedMaintenances.push(updatedMaintenance);
              updateMaintenance(updatedMaintenance, activeVehicle.id);
            } else {
              updatedMaintenances.push(maintenance);
            }
          });
          updateVehicle(updatedVehicle, user.id);
          setActiveVehicle(updatedVehicle);
          console.log('Quilometragem atualizado:', updatedVehicle);
          // navigation.navigate('SelectNavigator');
          toggleModal()
          }
        }
      ]
    );
    await Promise.all(updatedMaintenances.map(updateMaintenance));
  };

  {/* Padrão dos Itens da Lista */}
  const renderItem = ({ item }) => (
    <TouchableOpacity 
      style={styles.item}
      onPress={() => handleItemDetailsPress(item)}
    >

      {(JSON.parse(item.isKilometersEnabled) || JSON.parse(item.isMonthsEnabled)) && (
        <IconMCI 
          name="bell" 
          style={styles.icon}
          size={30} 
        />
      )}
      {(!JSON.parse(item.isKilometersEnabled) && !JSON.parse(item.isMonthsEnabled)) && (
        <IconMCI 
          name="bell-off" 
          style={styles.icon}
          size={30} 
        />
      )}

      <View style={styles.coluna}>
        <View style={styles.linha}>
          <Text style={styles.itemText} width={'86%'}>{item.type}</Text>
          {/* Alerta de Barra de Progresso Completa */}
          {(JSON.parse(item.isKilometersEnabled) || JSON.parse(item.isMonthsEnabled)) && ((item.months == item.monthsTotal && !item.monthsTotal == '') || (item.kilometers == item.kilometersTotal && !item.kilometersTotal == '')) && (
            <IconMCI 
              name="alert" 
              color={'#DD0000'}
              size={30} 
              marginHorizontal={10}
            />
          )}
          {/* Alerta de Ausencia de Avisos */}
          {(!JSON.parse(item.isKilometersEnabled) && !JSON.parse(item.isMonthsEnabled)) && (
            <IconMCI 
              name="alert-outline" 
              color={'#FF9900'}
              size={30} 
              marginHorizontal={6}
            />
          )}
        </View>

        {/* Barra de Progresso em Quilometros */}
        {JSON.parse(item.isKilometersEnabled) && (
          <View>
            <View style={styles.linha} justifyContent={'space-between'}>
              <Text style={styles.text}>
                {JSON.parse(item.isKilometersEnabled) ? `${item.kilometers} KM ` : ''}
              </Text>
              <Text style={styles.text}>
                {JSON.parse(item.isKilometersEnabled) ? `${item.kilometersTotal} KM ` : ''}
              </Text>
            </View>
            <View style={styles.progressBarLabel}>
              {/* Barra de Progresso de Quilometros */}
              <View 
                style={[
                  styles.progressBar, 
                  { width: `${item.kilometers / (item.kilometersTotal / 100)}%`,
                  backgroundColor: item.kilometers === item.kilometersTotal? '#DD0000' : '#009F4D' }
                ]} 
              />
            </View>
          </View>
        )}

        {/* Barra de Progresso em Meses */}
        {JSON.parse(item.isMonthsEnabled) && (
          <View>
            <View style={styles.linha} justifyContent={'space-between'}>
              <Text style={styles.text}>
                {JSON.parse(item.isMonthsEnabled) ? `${item.months} Meses ` : ''}
              </Text>
              <Text style={styles.text}>
                {JSON.parse(item.isMonthsEnabled) ? `${item.monthsTotal} Meses ` : ''}
              </Text>
            </View>
            <View style={styles.progressBarLabel}>
              {/* Barra de Progresso de Meses */}
              <View 
                style={[
                  styles.progressBar, 
                  { width: `${item.months / (item.monthsTotal / 100)}%`,
                  backgroundColor: item.kilometers === item.kilometersTotal? '#DD0000' : '#009F4D' }
                ]} 
              />
            </View>
          </View>
        )}

      </View>
    </TouchableOpacity>
  );


  {/* Navegação para a Página de Adicionar Novo Veículo */}
  const handleItemPress = (item) => {
      navigation.navigate(item);
  };

  {/* Seleção do Veículo Ativo */}
  const handleVehicleChange = async (item) => {
    try {
      await AsyncStorage.setItem('@activeVehicle', JSON.stringify(item));
    } catch (error) {
      console.error('Erro ao armazenar os dados do veículo ativo:', error);
    }
    // console.log('Veículo Selecionado:', item);
    setActiveVehicle(item);
  };

  {/* Tela de carregamento */}
  if (loading) {
    return (
      <View style={styles.container}>
        <View style={{height: '100%', alignItems: 'center', justifyContent: 'center'}}>
        <Text style={{color: '#6A6A6A', fontWeight: '500', fontSize: 32, margin: 10}}>Carregando...</Text>
        <ActivityIndicator size="100" color="#6A6A6A" style={{margin: 10}} />
        </View>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.carPickerLabel}>
        <View style={styles.linha}>
          {/* Seleção do Veículo Ativo */}
          <Picker
            selectedValue={activeVehicle}
            style={styles.carPicker}
            dropdownIconColor={'#FFFFFF'}
            onValueChange={(itemValue, itemIndex) => handleVehicleChange(itemValue)}
            mode={'dropdown'}
          >
            {vehicles.map((vehicle) => (
              <Picker.Item style={styles.carPickerItem} key={vehicle.id} label={vehicle.brand+' '+vehicle.model+' '+vehicle.version} value={vehicle} />
            ))}
          </Picker>

          <TouchableOpacity 
          style={styles.addKmsButton}
          onPress={toggleModal}
          >
            <Text style={styles.carKm}>{activeVehicle.mileage} KM</Text>
          </TouchableOpacity>
        </View>
      </View>
      
      {/* Lista de Lembretes */}  
      <FlatList
        data={maintenances}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
        borderBottomWidth={4}
        borderBottomColor={'#6A6A6A11'}
      />

        {/* Tela de Adicionar Quilometragem */} 
        <Modal animationIn={'zoomIn'} animationOut={'zoomOut'} isVisible={isModalVisible} onBackdropPress={toggleModal}>
          <View style={styles.modalContainer}>
            <View style={styles.linha} alignItems={'center'} justifyContent={'space-between'}>
              <Text style={styles.modalTitle}>Quilometragem Atual:  </Text>
              <Text style={styles.modalText}>{totalMileage}</Text>
            </View>
            <TextInput
              style={styles.modalInput}
              value={additionalMileage.toString()}
              onChangeText={setAdditionalMileage}
              placeholder="Quilometragem a ser Acrescentada"
              keyboardType="numeric"
            />
            <TouchableOpacity 
              style={styles.modalButton}
              onPress={handleUpdateKilometers}
            >
              <Text style={styles.addButtonText}>Adicionar Quilometragem</Text>
            </TouchableOpacity>
          </View>
        </Modal>


      
      {/* Botão de Navegação para a Página de Adicionar Novo Lembrete */}
      <TouchableOpacity 
        style={styles.addButton} 
        onPress={() => handleItemPress('NewMaintencePage')}
        >
        <Text style={styles.addButtonText}>Adicionar Novo Lembrete +</Text>
      </TouchableOpacity>

    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9F9F9',
  },

  linha: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  coluna: {
    paddingHorizontal: 6,
    width: '88%',
  },

  carPickerLabel:{
    backgroundColor: '#009F4D',
    height: 60, 
    paddingHorizontal: 10, 
    justifyContent: 'center', 
  },
  carPicker:{
    color: '#FFFFFF',
    width: '76%'
  },
  carPickerItem:{
    backgroundColor: '#009F4D',
    color: '#FFFFFF',
    fontSize: 16,
  },
  carKm:{
    color: '#FFFFFF',
    fontWeight: '500',
  },
  
  icon: {
    backgroundColor: '#6A6A6A99',
    color: '#6A6A6A',
    borderRadius: 30,
    padding: 6,
  },

  item: {
    backgroundColor: '#6A6A6A0f',
    borderColor: '#000000',
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 8,
    paddingVertical: 8,
    marginVertical: 4,
    marginHorizontal: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  text: {
    color: '#6A6A6A',
    fontSize: 12,
    alignSelf: 'flex-end',
  },
  itemText: {
    color: '#000000',
    fontSize: 18,
    fontWeight: '500',
  },

  progressBar: {
    backgroundColor: '#009F4D',
    height: 10,
    borderRadius: 6,
  },
  progressBarLabel: {
    backgroundColor: '#6A6A6A99',
    height: 10,
    width: 300,
    borderRadius: 6,
  },

  modalContainer: {
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    paddingHorizontal: 20,
    paddingVertical: 20,
    width: '100%',
    alignSelf: 'center',
  },
  modalTitle: {
    color: '#000000',
    fontSize: 20,
    fontWeight: '500',
  },
  modalText: {
    color: '#6A6A6A',
    fontSize: 18,
    paddingHorizontal: 10,
  },
  modalInput: {
    color: '#6A6A6A',
    backgroundColor: '#6A6A6A22',
    borderColor: '#000000',
    borderWidth: 1,
    borderRadius: 10,
    fontSize: 18,
    height: 40,
    paddingHorizontal: 10,
    marginVertical: 20,
  },
  modalButton: {
    backgroundColor: '#009F4D',
    padding: 20,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },

  addButton: {
    backgroundColor: '#009F4D',
    padding: 20,
    marginVertical: 10,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
  },
  addButtonText: {
    color: '#FFFFFF',
    fontSize: 20,
    fontWeight: 'bold',
  },

  addKmsButton: {
    borderColor: '#FFFFFF22',
    borderWidth: 1.4,
    paddingHorizontal: 4,
    paddingVertical: 8,
    borderRadius: 10,
  },
});

export default MaintencePage;
