import { React, useEffect, useState } from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import IconMCI from 'react-native-vector-icons/MaterialCommunityIcons';

const SelectPage = ({ navigation }) => {

    {/* Navegação para a Página de Detalhes Do Item Selecionado */}
    const handleItemPress = (item) => {
      navigation.navigate(item);
    };

  return (
    <View style={styles.container}>

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
    marginVertical: 14,
  },
});

export default SelectPage;
