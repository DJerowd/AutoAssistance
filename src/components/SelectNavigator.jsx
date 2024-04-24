import { React } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import IconFA from 'react-native-vector-icons/FontAwesome';

import SelectPage from '../screens/SelectPage';
import ProfilePage from '../screens/ProfilePage';


const Tab = createBottomTabNavigator();

const SelectNavigator  = () => {
{/* Navegação Entre a Página de seleção e o Perfil do Usuário */}
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
        component={SelectPage} 
        options={{
          tabBarIcon: ({ color }) => (
            <IconFA name="home" color={color} size={30} />
          ),
        }}
        />

      <Tab.Screen 
        name="Perfil" 
        component={ProfilePage} 
        options={{
          tabBarIcon: ({ color }) => (
            <IconFA name="user" color={color} size={30} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default SelectNavigator;
