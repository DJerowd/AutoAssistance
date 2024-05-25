import { React, useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, Alert } from 'react-native';
import IconMCI from 'react-native-vector-icons/MaterialCommunityIcons';

import AsyncStorage from '@react-native-async-storage/async-storage';
import { resetMaintenance, deleteMaintenances } from '../../database/MaintenanceDatabase';

const MaintenanceDetailsPage = ({ route, navigation }) => {
  const { maintenance } = route.params;
  const [activeVehicle, setActiveVehicle] = useState('');

  {/* Carregar o Veículo Ativo */}
  useEffect(() => {
    const fetchActiveVehicle = async () => {
      try {
        const activeVehicleData = await AsyncStorage.getItem('@activeVehicle');
        if (activeVehicleData !== '') {
          setActiveVehicle(JSON.parse(activeVehicleData));
        }
      } catch (error) {
        console.error('Erro ao recuperar os dados do usuário:', error);
      }
    };
    fetchActiveVehicle();
  }, []);
 
  {/* Excluir Lembrete */}
  const handleDeleteMaintenance = () => {
    Alert.alert(
      'Excluir Lembrete',
      'Tem certeza que deseja excluir este lembrete permanentemente?',
      [
        {
          text: 'Cancelar',
          style: 'cancel',
        },
        {
          text: 'Confirmar',
          onPress: () => {
            deleteMaintenances(maintenance.id, activeVehicle.id)
            Alert.alert('Lembrete excluído com sucesso');
            console.log('Lembrete excluído com sucesso');
            navigation.navigate('MaintencePage');
          },
          style: 'destructive'
        },
      ],
      { cancelable: false, alertContainerStyle: styles.alertContainer }
    );
  };

  {/* Navegação Para a Página de Edição da Manutenção */}
  const handleEditMaintenance = () => {
    navigation.navigate('EditMaintenancePage', { maintenance });
  };

  {/* Reiniciar Progresso */}
  const handleRestartMaintenances = () => {
    Alert.alert(
      "Confirmar Reinício",
      "Você tem certeza de que deseja reiniciar o lembrete?",
      [
        { text: "Cancelar", onPress: () => console.log("Cancel Pressed"), style: "cancel" },
        { text: "Confirmar", onPress: () => {
            resetMaintenance(maintenance, activeVehicle.id)
            console.log('Manutenção resetada:', maintenance);
            navigation.navigate('MaintencePage');
            Alert.alert('','Manutenção reiniciada com sucesso');
          }
        }
      ]
    );
  };


  return (
    <ScrollView style={styles.container}>

      {/* Tipo de Manutenção */}
      <Text style={styles.label}>Tipo de Manutenção:</Text>
      <Text style={styles.text}>{maintenance.type}</Text>

      {/* Estado da Notifição */}
      <View style={styles.linha} marginBottom={10}>
        <Text style={styles.label}>Quando notificar:</Text>
        {(JSON.parse(maintenance.isKilometersEnabled) || JSON.parse(maintenance.isMonthsEnabled)) && (
            <IconMCI 
              name="bell" 
              style={styles.icon}
              size={30} 
            />
          )}
        {(!JSON.parse(maintenance.isKilometersEnabled) && !JSON.parse(maintenance.isMonthsEnabled)) && (
          <View style={styles.linha}>
          <IconMCI 
            name="bell-off" 
            style={styles.icon}
            size={30} 
          />
          <IconMCI 
            name="alert-outline" 
            color={'#FF9900'}
            size={30} 
          />
          </View>
        )}
        {(JSON.parse(maintenance.isKilometersEnabled) || JSON.parse(maintenance.isMonthsEnabled)) && ((maintenance.months == maintenance.monthsTotal && !maintenance.monthsTotal == '') || (maintenance.kilometers == maintenance.kilometersTotal && !maintenance.kilometersTotal == '')) && (
          <IconMCI 
            name="alert" 
            color={'#DD0000'}
            size={30} 
            marginRight={10}
          />
        )}
        {/* <Text style={[styles.checkbox, maintenance.isRepeat && styles.checkedCheckbox]}>{maintenance.isRepeat ? 'Ligada' : 'Desligada'}</Text> */}
      </View>

      {/* Notificações */}
      <View>

        {/* Barra de Progresso em Quilometros */}
        {JSON.parse(maintenance.isKilometersEnabled) && (
          <View>
            <View style={styles.linha} justifyContent={'space-between'}>
              <Text style={styles.itemText}>
                {JSON.parse(maintenance.isKilometersEnabled) ? `${maintenance.kilometers} KM ` : ''}
              </Text>
                
              <Text style={styles.itemText}>
                {JSON.parse(maintenance.isKilometersEnabled) ? `${maintenance.kilometersTotal} KM ` : ''}
              </Text>
            </View>
            <View style={styles.progressBarTotal}>
              {/* Barra de Progresso de Quilometros */}
              <View 
                style={[
                  styles.progressBar, 
                  { width: `${maintenance.kilometers / (maintenance.kilometersTotal / 100)}%`, 
                  backgroundColor: maintenance.kilometers === maintenance.kilometersTotal? '#DD0000' : '#009F4D' }
                ]} 
              />
            </View>
          </View>
        )}

        {/* Barra de Progresso em Meses */}
        {JSON.parse(maintenance.isMonthsEnabled) && (
          <View>
            <View style={styles.linha} justifyContent={'space-between'}>
              <Text style={styles.itemText}>
                {JSON.parse(maintenance.isMonthsEnabled) ? `${maintenance.months} Meses ` : ''}
              </Text>
                {((maintenance.months == maintenance.monthsTotal && !maintenance.monthsTotal == '')) && (
                  <IconMCI 
                    name="alert" 
                    color={'#DD0000'}
                    size={30} 
                    marginRight={10}
                  />
                )}
              <Text style={styles.itemText}>
                {JSON.parse(maintenance.isMonthsEnabled) ? `${maintenance.monthsTotal} Meses ` : ''}
              </Text>
            </View>
            <View style={styles.progressBarTotal}>
              {/* Barra de Progresso de Meses */}
              <View 
                style={[
                  styles.progressBar, 
                  { width: `${maintenance.months / (maintenance.monthsTotal / 100)}%`,
                  backgroundColor: maintenance.kilometers === maintenance.kilometersTotal? '#DD0000' : '#009F4D' }
                ]} 
              />
            </View>
          </View>
        )}

      </View>
      
      {/* Botão de Resetar Progresso */}
      {JSON.parse(maintenance.isRepeat) && (
        <TouchableOpacity style={[styles.restartButton, {backgroundColor: maintenance.kilometers !== maintenance.kilometersTotal? '#6A6A6A55' : '#6A6A6A' }]} disabled={maintenance.kilometers !== maintenance.kilometersTotal} onPress={handleRestartMaintenances}>
          <View style={styles.linha}>
          <Text style={styles.restartButtonText}>Reiniciar progresso</Text>
          <IconMCI 
            name="restart" 
            style={{color: '#fff', marginLeft: 10}}
            size={28} 
          />
          </View>
        </TouchableOpacity>
      )}

      {/* Descrição do Lembrete */}
      <Text style={styles.label} marginTop={20}>Descrição:</Text>
      <Text style={styles.input}>{maintenance.description} {maintenance.description == '' && ('Sem descrição.')}</Text>
      
      {/* Botão de Editar Informações */}
      <TouchableOpacity style={styles.editButton} onPress={handleEditMaintenance}>
        <Text style={styles.editButtonText}>Editar Informações</Text>
      </TouchableOpacity>

      {/* Botão de Excluir Lembrete */}
      <TouchableOpacity style={styles.deleteButton} onPress={handleDeleteMaintenance}>
        <Text style={styles.deleteButtonText}>Excluir Lembrete</Text>
      </TouchableOpacity>

    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#FFFFFF',
  },

  linha: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  label: {
    color: '#000000',
    fontSize: 20,
    fontWeight: '500',
  },
  text: {
    color: '#6A6A6A',
    borderBottomColor: '#6A6A6A99',
    borderBottomWidth: 2,
    marginBottom: 20,
    marginTop: 10,
    paddingHorizontal: 10,
    paddingVertical: 6,
    fontSize: 20,
  },

  icon: {
    color: '#6A6A6A',
    borderRadius: 30,
    paddingHorizontal: 10,
  },

  itemText: {
    color: '#6A6A6A',
    fontSize: 16,
    paddingHorizontal: 10,
    marginTop: 10,
  },

  progressBar: {
    backgroundColor: '#009F4D',
    height: 10,
    borderRadius: 6,
  },
  progressBarTotal: {
    backgroundColor: '#6A6A6A99',
    width: 340,
    height: 10,
    borderRadius: 6,
    alignSelf: 'center',
  },
  
  input: {
    backgroundColor: '#6A6A6A22',
    color: '#6A6A6A',
    borderColor: '#6A6A6A99',
    borderWidth: 2,
    borderRadius: 10,
    marginTop: 10,
    marginBottom: 20,
    fontSize: 18,
    paddingHorizontal: 10,
    paddingVertical: 10,
    textAlignVertical: 'top',
  },

  restartButton: {
    backgroundColor: '#009F4D',
    padding: 10,
    marginTop: 20,
    marginHorizontal: 40,
    borderRadius: 12,
    alignItems: 'center',
  },
  restartButtonText: {
    color: '#FFFFFF',
    fontSize: 20,
    fontWeight: 'bold',
  },

  editButton: {
    backgroundColor: '#009F4D',
    borderColor: '#009F4D',
    borderWidth: 4,
    padding: 20,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 20,
  },
  editButtonText: {
    color: '#FFFFFF',
    fontSize: 20,
    fontWeight: 'bold',
  },

  deleteButton: {
    backgroundColor: '#F9F9F9',
    borderColor: '#009F4D',
    borderWidth: 4,
    padding: 20,
    borderRadius: 12,
    alignItems: 'center',
    marginBottom: 40,
  },
  deleteButtonText: {
    color: '#009F4D',
    fontSize: 20,
    fontWeight: 'bold',
  },
});

export default MaintenanceDetailsPage;
