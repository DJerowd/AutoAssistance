import { React, useState } from 'react';
import { View, TouchableOpacity, Text, Image, StyleSheet, ImageBackground, FlatList } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Modal from 'react-native-modal';
import IconFA from 'react-native-vector-icons/FontAwesome';
import IconMCI from 'react-native-vector-icons/MaterialCommunityIcons';
import { VehiclesDB } from '../components/VehiclesDB';

const Tab = createBottomTabNavigator();

const SelectPage  = () => {

  return (
    <Tab.Navigator
    screenOptions={{
      headerShown: false,
      tabBarActiveTintColor: '#ffffff',
      tabBarInactiveTintColor: '#c0c0c0',
      tabBarStyle: {
            backgroundColor: '#009F4D',
            height: 60,
      },
      tabBarLabelStyle: {
        fontSize: 16,
        fontWeight: 'bold',
      },
  }}
    >
      <Tab.Screen 
        name="Seleção" 
        component={SelecaoScreen} 
        options={{
          tabBarIcon: ({ color }) => (
            <IconFA name="home" color={color} size={30} />
          ),
        }}
        />

      <Tab.Screen 
        name="Perfil" 
        component={PerfilScreen} 
        options={{
          tabBarIcon: ({ color }) => (
            <IconFA name="user" color={color} size={30} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};


const SelecaoScreen = ({ navigation }) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const {vehicles, setVehicles} = VehiclesDB(); 
  const [selectedVehicle, setSelectedVehicle] = useState('');

    const handleItemPress = (item) => {
      console.log('Item Selecionado:', item);
      navigation.navigate(item);
    };

    const toggleModal = () => {
      setIsModalVisible(!isModalVisible);
    };

    const handleVehicleChange = (item) => {
      console.log('Veículo Selecionado:', item);
      setSelectedVehicle(item);
    };

  return (
    <View style={styles.container}>
      <View style={{ height: 50, paddingHorizontal: 40, justifyContent: 'center', backgroundColor: '#009F4D'}}>
        
      <TouchableOpacity onPress={toggleModal}>
      {(!selectedVehicle == '') && (
        <Text style={styles.carPicker}>{selectedVehicle.name} | {selectedVehicle.brand} {selectedVehicle.model}</Text>
      )}
      {(selectedVehicle == '') && (
        <Text style={styles.carPicker}>Selecione aqui um veículo.</Text>
      )}
      </TouchableOpacity>

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
    <ImageBackground
    source={{ uri: 'https://www.creativefabrica.com/wp-content/uploads/2020/03/05/Black-Triangle-Polygon-Background-Graphics-3128551-1-580x387.jpg' }}
    style={styles.backgroundImage}
    >

      <View style={styles.buttonsContainer}>
        
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

    </ImageBackground>
    </View>
  );
};


const PerfilScreen = () => {
  return (
    <View style={styles.containerPerfil}>

      <View style={styles.perfil}>
        <Image
        source={require('../assets/Logo.png')}
        style={styles.image}
        />
      </View>

      <View>
        <Text style={styles.textTitle}>Nome de Usuário</Text>
        <Text style={styles.text}>usuario</Text>
      </View>

      <View>
        <Text style={styles.textTitle}>E-mail</Text>
        <Text style={styles.text}>email</Text>
      </View>

      <View>
        <Text style={styles.textTitle}>Veiculos Registrados:</Text>
        <Text style={styles.text}>veiculos</Text>
      </View>

      <View>
        <Text style={styles.textTitle}>Localização</Text>
        <Text style={styles.text}>local</Text>
      </View>

    </View>
  );
};


const styles = StyleSheet.create({
  container: {
    flex:  1,
    backgroundColor: '#F9F9F9',
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

  backgroundImage: {
    flex: 1,
    padding: 10,
  },

  buttonsContainer: {
    margin: 10,
  },
  item: {
    width: 140,
    alignItems: 'center',
    marginHorizontal: 20,
    marginVertical: 4,
  },
  linha: {
    justifyContent: 'center',
    flexDirection: 'row',
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

  containerPerfil: {
    flex:  1,
    backgroundColor: '#F9F9F9',
    padding:  20,
  },
  perfil: {
    width: 300,
    height: 300,
    backgroundColor: '#6A6A6A99',
    borderRadius: 150,
    borderColor: '#6A6A6A',
    borderWidth: 10,
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
  },
  image: {
    height: 280,
    width: 280,
    alignSelf: 'center',
    borderRadius: 150,
    backgroundColor: '#009F4D50',
  },
  textTitle: {
    color: '#6A6A6A',
    fontSize: 20,
    fontWeight: 'bold',
  },
  text: {
    color: '#6A6A6A99',
    fontSize: 18,
    borderBottomWidth: 1,
    borderBottomColor: '#6A6A6A99',
    marginBottom: 20,
  },
});

export default SelectPage;
