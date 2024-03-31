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
              // onPress={() => handleItemPress('manutencoesPage')}
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
      
    </View>
  );
};

const PerfilScreen = () => {
  return (
    <View style={styles.containerPerfil}>
      

      <View style={styles.perfil}>
        <Image
        source={{ uri: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOEAAADhCAMAAAAJbSJIAAAAeFBMVEUAAAD////z8/OHh4f6+voiIiK7u7u+vr7v7+88PDy2trb19fXp6elUVFTf39+cnJyrq6vY2Nh9fX1gYGAXFxelpaVubm7Ly8tnZ2d1dXWxsbGdnZ2WlpaQkJASEhLHx8cwMDAgICBFRUVZWVlQUFAsLCw4ODiCgoIpdevqAAADLUlEQVR4nO3Ya3OiMBSAYY+iUEEFrfe7ttv//w831BtCSA6zbmd35n0+1fRMyAkht1YLAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAD817rdnTLyPOr3+tPFURn+vjDxvXT8pq1+k1c/+1SG60XS0YTtprFcBPuTIv5jH1zjJdkq4tftW/h8oGlPA7Eqw3He3iTshVneiJU3PszDonl4iY+/POGLuFh9qGq4WluTYWqeO+1e/u5EpjHu8E/zQoLp4fJjMc9fjDN+lPfaNXycmK559zdJT5OhSTA7Pv10ptg1b6Rf+H0airQd8RtT3+Hx0+QbaecGDUWGC5H9U8HYPZLMUCsNy5Wk9eED03/l57nfeTOKDNsyLJWYbl7UhndERuWyiaP6pDIiTA1jX6P0/Bma51Vm/KSS9EPs+J/FUuRcLsskalKFmz/DxDIkZyJ1a8bY0mKXzDIkzcB1vfVmvBm+WUdkIJua+L1vpn12tI7IyPXhNuTN0IwiS+m8dq5JFMtlwVnEsjaEL5xrvBmurTN9vzT/PYho9jB3X9YOTJsNBCdvhql14ljVTicN58GNdVJZv3Cq8WY4tT5M+w5nt+1m3ajuSGAp/dF3OG78HRb3M48Ma77OibX6H/0OTyIf1dKg9mvbP73z7nmQM5XUzL2fIrNqaSRTd6sa8K+HkaX73ethdS37Ze2mb8PSljA3aLimOvkzXItUjqXuPU31G1rVb707ls7KXvgZavalQWVW2bj2HKbJ5SF2qBYVW1DuLbOCLH2N0lNkaNb8nrvgWVZZEofWCfNqUj5KVAr+jPJ8WHykGbbOvfUuej4fHofW2eTOnFSywoFw6z1hN9OWzeHtov5kbVIMbnPhMvEkaFI0IcHoWt0uP8G7tzl5xPoaPjPdkbzyANyK7wuWq5+/72mG+nuavnzHr1bhML+88n1Vs1v1879wTxMFN45Dbav1nt67Yl437xedwvtdW5wqrl2m97u27HXrxEX3wTM28gvNXqq/0Jzk8f2ttsGDbV798qCtHgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA/Nt+A2s+HI+FMHFPAAAAAElFTkSuQmCC' }}
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
