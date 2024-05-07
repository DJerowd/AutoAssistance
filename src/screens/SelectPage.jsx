import { React, useEffect, useState } from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import IconMCI from 'react-native-vector-icons/MaterialCommunityIcons';

import AsyncStorage from '@react-native-async-storage/async-storage';
import { fetchUserVehicles } from '../database/VehiclesDatabase';

const SelectPage = ({ navigation }) => {
  const [vehicles, setVehicles] = useState([]); 
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

   {/* Carregar os Veículos do Usuário Ativo Após Carregar o ID de Usuário */}
   useEffect(() => {
    if (user && user.id) {
      fetchUserVehicles(user.id).then(setVehicles).catch(console.error);
    }
  }, [user]);

    {/* Navegação para a Página de Detalhes Do Item Selecionado */}
    const handleItemPress = (item) => {
      navigation.navigate(item);
    };

  return (
    <View style={styles.container}>
      {/* Background da Página */}
      <View style={styles.container}>
        <View style={styles.buttonsContainer}>

          {/* Botão Veículos Salvos */}
          <View style={styles.item}>
            <TouchableOpacity
                style={styles.button}
                onPress={() => handleItemPress('VehiclesPage')}
            >
              <View style={styles.linha}>
                <IconMCI 
                  name="garage" 
                  color={'#ffffff'} 
                  size={48}
                />
                <Text style={styles.buttonText}>Veiculos Salvos</Text>
              </View>
            </TouchableOpacity>
          </View>
        
          {/* Botão Manutenções Pendentes */}
          <View style={styles.item}>
            <TouchableOpacity
              style={[styles.button, vehicles.length === 0 && styles.disabledButton]}
              disabled={vehicles.length === 0}
              onPress={() => handleItemPress('MaintencePage')}
            >
              <View style={styles.linha}>
                <IconMCI 
                  name="car-wrench" 
                  color={'#ffffff'} 
                  size={48}
                />
                <Text style={styles.buttonText}>Manutenções Pendentes</Text>
                {(vehicles.length === 0) && (
                  <IconMCI 
                    name="lock" 
                    color={'#000000'} 
                    size={24}
                  />
                )}
              </View>
            </TouchableOpacity>
          </View>

          {/* Botão Histórico de Problemas */}
          <View style={styles.item}>
            <TouchableOpacity
              style={[styles.button, vehicles.length >= 0 && styles.disabledButton]}
              disabled={vehicles.length >= 0}
              // onPress={() => handleItemPress('historicoPage')}
            >
              <View style={styles.linha}>
                <IconMCI 
                  name="history" 
                  color={'#ffffff'} 
                  size={48} 
                />
                <Text style={styles.buttonText}>Histórico de Problemas</Text>
                {(vehicles.length >= 0) && (
                  <IconMCI 
                    name="lock" 
                    color={'#000000'} 
                    size={24}
                  />
                )}
              </View>
            </TouchableOpacity>
          </View>
          
          {/* Botão identificação de Problemas */}
          <View style={styles.item}>
            <TouchableOpacity
              style={[styles.button, vehicles.length >= 0 && styles.disabledButton]}
              disabled={vehicles.length >= 0}
              // onPress={() => handleItemPress('identificacaoPage')}
            >
              <View style={styles.linha}>
                <IconMCI 
                  name="clipboard-search" 
                  color={'#ffffff'} 
                  size={48} 
                />
                <Text style={styles.buttonText}>Identificação de problemas</Text>
                {(vehicles.length >= 0) && (
                  <IconMCI 
                    name="lock" 
                    color={'#000000'} 
                    size={24}
                  />
                )}
              </View>
            </TouchableOpacity>
          </View>

          {/* Botão Mapa */}
          <View style={styles.item}>
            <TouchableOpacity
              style={[styles.button, vehicles.length >= 0 && styles.disabledButton]}
              disabled={vehicles.length >= 0}
              // onPress={() => handleItemPress('mapaPage')}
            >
              <View style={styles.linha}>
                <IconMCI 
                  name="map-search" 
                  color={'#ffffff'} 
                  size={48} 
                />
                <Text style={styles.buttonText}>Mapa</Text>
                {(vehicles.length >= 0) && (
                  <IconMCI 
                    name="lock" 
                    color={'#000000'} 
                    size={24}
                  />
                )}
              </View>
            </TouchableOpacity>
          </View>  

          {(vehicles.length === 0) && (
                <Text style={styles.text}>Adicione um veículo para utilizar outras funções.</Text>
              )} 

        </View>
      </View>
    </View>
  );
};


const styles = StyleSheet.create({
  container: {
    flex:  1,
    backgroundColor: '#F9F9F9',
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

  buttonsContainer: {
    margin: 10,
  },
  button: {
    backgroundColor: '#6A6A6A',
    borderRadius: 12,
    padding: 10,
    height:  70,
    width: '100%',
    alignItems: 'flex-start',
    justifyContent: 'center',
  },
  buttonText: {
    color: '#ffffff',
    textShadowColor: '#000000',
    fontSize: 20,
    width: '80%',
    height: '100%',
    fontWeight: '500',
    textAlign: 'center',
    textAlignVertical: 'center',
  },
  disabledButton: {
    opacity: 0.4,
  },

  text: {
    color: '#000000',
    marginTop: 20,
    fontSize: 16,
    fontWeight: '500',
    width: '80%',
    textAlign: 'center',
    alignSelf: 'center',
  },

  item: {
    width: '100%',
    alignItems: 'center',
    marginVertical: 10,
  },
});

export default SelectPage;
