import { React } from 'react';
import { View, TouchableOpacity, Text, Image, StyleSheet } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import IconFA from 'react-native-vector-icons/FontAwesome';
import IconMCI from 'react-native-vector-icons/MaterialCommunityIcons';

const Tab = createBottomTabNavigator();

const SelectPage  = ({ navigation }) => {

  const handleItemPress = (item) => {
    console.log('Item Selecionado:', item);
    navigation.navigate(item);
  };

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

    const handleItemPress = (item) => {
      console.log('Item Selecionado:', item);
      navigation.navigate(item);
    };

  return (
    <View style={styles.container}>

      <View style={styles.buttonsContainer}>
        
        <View style={styles.linha}>
          <View style={styles.item}>
            <TouchableOpacity
              style={styles.button}
              // onPress={() => handleItemPress('')}
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
              //onPress={() => handleItemPress('')}
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
              //onPress={() => handleItemPress('')}
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
              //onPress={() => handleItemPress('')}
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
              //onPress={() => handleItemPress('')}
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
  );
};

const PerfilScreen = () => {
  return (
    <View style={styles.container}>
      <Text>Perfil</Text>
    </View>
  );
};


const styles = StyleSheet.create({
  container: {
    flex:  1,
    backgroundColor: '#F9F9F9',
    padding:  10,
  },

  buttonsContainer: {
    margin: 10,
  },
  item: {
    width: 140,
    alignItems: 'center',
    marginHorizontal: 20,
    marginVertical: 10,
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
});

export default SelectPage;
