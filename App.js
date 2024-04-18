import { React } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { StatusBar, TouchableOpacity } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

import StartPage from './src/screens/StartPage.jsx';
import LoginPage from './src/screens/LoginPage';
import RegisterPage from './src/screens/RegisterPage.jsx';
import SelectPage from './src/screens/SelectPage.jsx';
import VehiclesPage from './src/screens/VehiclesPage.jsx';
import NewVehiclePage from './src/screens/NewVehiclePage.jsx';
import VehicleDetailsPage from './src/screens/VehicleDetailsPage.jsx';
import EditVehiclePage from './src/screens/EditVehiclePage.jsx';
import MaintencePage from './src/screens/MaintenancePage.jsx';
import NewMaintencePage from './src/screens/NewMaintencePage.jsx';
import MaintenanceDetailsPage from './src/screens/MaintenanceDetailsPage.jsx';
import EditMaintenancePage from './src/screens/EditMaintenancePage.jsx';

const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <StatusBar backgroundColor={'#008F45'} barStyle={'light-content'}/>
      <Stack.Navigator initialRouteName="StartPage">
        <Stack.Screen 
          name="StartPage" 
          component={StartPage} 
          options={{
            title: '',
            headerShown: false,
          }}
        />
        <Stack.Screen 
          name="LoginPage" 
          component={LoginPage} 
          options={{
            title: '',
            headerStyle: { backgroundColor: '#009F4D' },
            headerTintColor: '#ffffff',
          }}
        />
        <Stack.Screen 
        name="RegisterPage" 
        component={RegisterPage} 
        options={{
          title: '',
          headerStyle: { backgroundColor: '#009F4D' },
          headerTintColor: '#ffffff',
        }}
      />
      <Stack.Screen 
          name="SelectPage" 
          component={SelectPage} 
          options={{
            title: '',
            headerStyle: { backgroundColor: '#009F4D' },
            headerTintColor: '#ffffff',
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
            title: 'Lembretes de Manutenções',
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
          name="EditMaintenancePage" 
          component={EditMaintenancePage} 
          options={{
            title: 'Editar Lembrete',
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
        <Stack.Screen 
          name="EditVehiclePage" 
          component={EditVehiclePage} 
          options={{
            title: 'Editar Veículo',
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
