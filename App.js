import { React, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { StatusBar } from 'react-native';
import * as Notifications from 'expo-notifications';

import StartPage from './src/screens/StartPage.jsx';
import LoginPage from './src/screens/LoginPage';
import RegisterPage from './src/screens/RegisterPage.jsx';
import EditProfilePage from './src/screens/EditProfilePage.jsx';

import SelectNavigator from './src/components/SelectNavigator.jsx';

import VehiclesPage from './src/screens/vehicles/VehiclesPage.jsx';
import NewVehiclePage from './src/screens/vehicles/NewVehiclePage.jsx';
import VehicleDetailsPage from './src/screens/vehicles/VehicleDetailsPage.jsx';
import EditVehiclePage from './src/screens/vehicles/EditVehiclePage.jsx';

import MaintencePage from './src/screens/maintenances/MaintenancePage.jsx';
import NewMaintencePage from './src/screens/maintenances/NewMaintencePage.jsx';
import MaintenanceDetailsPage from './src/screens/maintenances/MaintenanceDetailsPage.jsx';
import EditMaintenancePage from './src/screens/maintenances/EditMaintenancePage.jsx';

import { initMaintenancesDB } from './src/database/MaintenanceDatabase.jsx';
import { initVehiclesDB } from './src/database/VehiclesDatabase.jsx';
import { initUsersDB } from './src/database/UsersDatabase.jsx';

const Stack = createStackNavigator();

Notifications.requestPermissionsAsync().then(({ status }) => {
  if (status!== 'granted') {
    alert('Permissões de notificação não concedidas.');
  }
});

const App = () => {

  {/* Inicialização do Banco de Dados */}
  useEffect(() => {
      initUsersDB();
      initVehiclesDB();
      initMaintenancesDB();
 }, []);

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
          name="SelectNavigator" 
          component={SelectNavigator} 
          options={{
            title: '',
            headerStyle: { backgroundColor: '#009F4D' },
            headerTintColor: '#ffffff',
          }}
        />
        <Stack.Screen 
          name="EditProfilePage" 
          component={EditProfilePage} 
          options={{
            title: '',
            headerStyle: { backgroundColor: '#009F4D' },
            headerTintColor: '#ffffff',
          }}
        />

        <Stack.Screen 
          name="MaintencePage" 
          component={MaintencePage} 
          options={{
            title: 'Lembretes',
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
