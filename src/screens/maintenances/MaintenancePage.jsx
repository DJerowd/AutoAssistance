import { React, useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import IconMCI from 'react-native-vector-icons/MaterialCommunityIcons';
import {Picker} from '@react-native-picker/picker';

import AsyncStorage from '@react-native-async-storage/async-storage';
import { fetchMaintenances, fetchVehicleMaintenances } from '../../database/MaintenanceDatabase';
import { fetchUserVehicles } from '../../database/VehiclesDatabase';

const MaintencePage = ({ navigation }) => {
    const [maintenances, setMaintenances] = useState([]);
    const [vehicles, setVehicles] = useState([]);  
    const [activeVehicle, setActiveVehicle] = useState('');
    const [user, setUser] = useState('');

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
   useEffect(() => {
    if (activeVehicle && activeVehicle.id) {
      const fetchAndSetMaintenances = async () => {
        const fetchedMaintenances = await fetchVehicleMaintenances(activeVehicle.id);
        setMaintenances(fetchedMaintenances);
      };

      fetchAndSetMaintenances();
    }
  }, [activeVehicle]);
    

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


    const calculateProgress = (item, itemEnd) => {
          return (3 *(item / (itemEnd / 100)));
    };



{/* Navegação para a Página de Detalhes Do Veículo Selecionado */}
    const handleItemDetailsPress = (item) => {
      console.log('Item Selecionado:', item);
      navigation.navigate('MaintenanceDetailsPage', { maintenance: item });
    };

{/* Padrão dos Itens da Lista */}
    const renderItem = ({ item }) => (
        <TouchableOpacity 
          style={styles.item}
          onPress={() => handleItemDetailsPress(item)}
        >

          {(item.isKilometersEnabled == 'true' || item.isMonthsEnabled == 'true') && (
            <IconMCI 
              name="bell" 
              style={styles.icon}
              size={30} 
            />
          )}

          {/* Alerta de Ausencia de Avisos */}
          {(item.isKilometersEnabled == 'false' && item.isMonthsEnabled == 'false') && (
            <IconMCI 
              name="alert-outline" 
              color={'#FF9900'}
              size={30} 
              marginHorizontal={10}
            />
          )}
          
          <View style={styles.coluna}>
            <View style={styles.linha}>
              <Text style={styles.itemText} width={'86%'}>{item.type}</Text>
{/* Alerta de Barra de Progresso Completa */}
              {((item.months == item.monthsTotal && !item.monthsTotal == '') || (item.kilometers == item.kilometersTotal && !item.kilometersTotal == '')) && (
                <IconMCI 
                  name="alert" 
                  color={'#DD0000'}
                  size={30} 
                  marginHorizontal={10}
                />
              )}
            </View>

{/* Barra de Progresso em Quilometros */}
            {item.isKilometersEnabled == 'true' && (
              <View>
                <View style={styles.linha} justifyContent={'space-between'}>
                  <Text style={styles.text}>
                    {item.isKilometersEnabled ? `${item.kilometersTotal} KM ` : ''}
                  </Text>
                  <Text style={styles.text}>
                    {item.isKilometersEnabled ? `${item.kilometersTotal} KM ` : ''}
                  </Text>
                </View>
                <View style={styles.progressBarLabel}>
                  {/* Barra de Progresso de Quilometros */}
                  <View style={[styles.progressBar, { width: `${item.kilometers / (item.kilometersTotal / 100)}%` }]} />
                </View>
              </View>
            )}

{/* Barra de Progresso em Meses */}
            {item.isMonthsEnabled == 'true' && (
              <View>
                <View style={styles.linha} justifyContent={'space-between'}>
                  <Text style={styles.text}>
                    {item.isMonthsEnabled ? `${item.monthsTotal} Meses ` : ''}
                  </Text>
                  <Text style={styles.text}>
                    {item.isMonthsEnabled ? `${item.monthsTotal} Meses ` : ''}
                  </Text>
                </View>
                <View style={styles.progressBarLabel}>
                  {/* Barra de Progresso de Meses */}
                  <View style={[styles.progressBar, { width: `${item.months / (item.monthsTotal / 100)}%` }]} />
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
      console.log('Veículo Selecionado:', item);
      setActiveVehicle(item);
    };

  return (
    <View style={styles.container}>
      <View style={styles.carPickerLabel}>
        <View style={styles.linha}>
        {/* Seleção do Veículo Ativo */}
        <Picker
          selectedValue={activeVehicle}
          style={styles.carPicker}
          dropdownIconColor={'#fff'}
          onValueChange={(itemValue, itemIndex) => handleVehicleChange(itemValue)}
          mode={'dropdown'}
        >
          {/* <Picker.Item style={styles.carPickerItem} label="Selecione aqui um veículo" value="" /> */}
          {vehicles.map((vehicle) => (
            <Picker.Item style={styles.carPickerItem} key={vehicle.id} label={vehicle.brand+' '+vehicle.model+' '+vehicle.version} value={vehicle} />
          ))}
        </Picker>
        <Text style={styles.carKm}>{activeVehicle.mileage} KM</Text>
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
    width: '80%',
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
    width: '24%',
    fontWeight: '500',
  },
  
  icon: {
    backgroundColor: '#6A6A6A99',
    color: '#6A6A6A',
    borderRadius: 30,
    padding: 6,
  },

  item: {
    borderColor: '#6A6A6A55',
    borderWidth: 1,
    paddingVertical: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
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
});

export default MaintencePage;
