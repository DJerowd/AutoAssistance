import { React } from 'react';
import StartPage from './src/screens/StartPage.jsx';
import LoginPage from './src/screens/LoginPage';
import RegisterPage from './src/screens/RegisterPage.jsx';
import SelectPage from './src/screens/SelectPage.jsx';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="StartPage">
        <Stack.Screen 
          name="StartPage" 
          component={StartPage} 
          options={{
            title: 'Página Inicial',
            headerStyle: { backgroundColor: '#009F4D' },
            headerTintColor: '#ffffff',
            headerTitleAlign: 'center',
            headerTitleStyle: { fontWeight: 'bold' },
          }}
        />
        <Stack.Screen 
          name="LoginPage" 
          component={LoginPage} 
          options={{
            title: 'Login',
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
          title: 'Registro',
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
            title: 'Seleção',
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
