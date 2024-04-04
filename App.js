import { React } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { TouchableOpacity } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import StartPage from './src/screens/StartPage.jsx';
import LoginPage from './src/screens/LoginPage';
import RegisterPage from './src/screens/RegisterPage.jsx';
import SelectPage from './src/screens/SelectPage.jsx';
import VehiclesPage from './src/screens/VehiclesPage.jsx';
import NewVehiclePage from './src/screens/NewVehiclePage.jsx';
import MaintencePage from './src/screens/MaintenancePage.jsx';
import NewMaintencePage from './src/screens/NewMaintencePage.jsx';
import VehicleDetailsPage from './src/screens/VehicleDetailsPage.jsx';
import MaintenanceDetailsPage from './src/screens/MaintenanceDetailsPage.jsx';

const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="StartPage">
        <Stack.Screen 
          name="StartPage" 
          component={StartPage} 
          options={{
            title: '',
            headerStyle: { backgroundColor: '#009F4D', height: 40 },
            headerTintColor: '#ffffff',
            headerTitleAlign: 'center',
            headerTitleStyle: { fontWeight: 'bold' },
          }}
        />
        <Stack.Screen 
          name="LoginPage" 
          component={LoginPage} 
          options={{
            title: '',
            headerStyle: { backgroundColor: '#009F4D' },
            headerTintColor: '#ffffff',
            headerTitleAlign: 'center',
            headerTitleStyle: { fontWeight: 'bold' },
          }}
        />
        <Stack.Screen 
        name="RegisterPage" 
        component={RegisterPage} 
        options={{
          title: '',
          headerStyle: { backgroundColor: '#009F4D' },
          headerTintColor: '#ffffff',
          headerTitleAlign: 'center',
          headerTitleStyle: { fontWeight: 'bold' },
        }}
      />
      <Stack.Screen 
          name="SelectPage" 
          component={SelectPage} 
          options={{
            title: '',
            headerStyle: { backgroundColor: '#009F4D' },
            headerTintColor: '#ffffff',
            headerTitleAlign: 'center',
            headerTitleStyle: { fontWeight: 'bold' },
            headerRight: () => (
              <TouchableOpacity style={{ marginRight: 20 }}>
                <MaterialIcons name="settings" size={30} color="white" />
              </TouchableOpacity>
            ),
          }}
        />

        <Stack.Screen 
          name="MaintencePage" 
          component={MaintencePage} 
          options={{
            title: 'Manutenções',
            headerStyle: { backgroundColor: '#009F4D' },
            headerTintColor: '#ffffff',
            headerTitleAlign: 'center',
            headerTitleStyle: { fontWeight: 'bold' },
          }}
        />
        <Stack.Screen 
          name="NewMaintencePage" 
          component={NewMaintencePage} 
          options={{
            title: 'Novo Lembrete',
            headerStyle: { backgroundColor: '#009F4D' },
            headerTintColor: '#ffffff',
            headerTitleAlign: 'center',
            headerTitleStyle: { fontWeight: 'bold' },
          }}
        />
        <Stack.Screen 
          name="MaintenanceDetailsPage" 
          component={MaintenanceDetailsPage} 
          options={{
            title: 'Detalhes do Lembrete',
            headerStyle: { backgroundColor: '#009F4D' },
            headerTintColor: '#ffffff',
            headerTitleAlign: 'center',
            headerTitleStyle: { fontWeight: 'bold' },
          }}
        />

        <Stack.Screen 
          name="VehiclesPage" 
          component={VehiclesPage} 
          options={{
            title: 'Veículos',
            headerStyle: { backgroundColor: '#009F4D' },
            headerTintColor: '#ffffff',
            headerTitleAlign: 'center',
            headerTitleStyle: { fontWeight: 'bold' },
          }}
        />
        <Stack.Screen 
          name="NewVehiclePage" 
          component={NewVehiclePage} 
          options={{
            title: 'Novo Veículo',
            headerStyle: { backgroundColor: '#009F4D' },
            headerTintColor: '#ffffff',
            headerTitleAlign: 'center',
            headerTitleStyle: { fontWeight: 'bold' },
          }}
        />
        <Stack.Screen 
          name="VehicleDetailsPage" 
          component={VehicleDetailsPage} 
          options={{
            title: 'Detalhes do Veículo',
            headerStyle: { backgroundColor: '#009F4D' },
            headerTintColor: '#ffffff',
            headerTitleAlign: 'center',
            headerTitleStyle: { fontWeight: 'bold' },
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
