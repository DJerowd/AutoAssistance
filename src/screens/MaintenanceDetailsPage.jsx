import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, Alert } from 'react-native';
import IconMCI from 'react-native-vector-icons/MaterialCommunityIcons';

const MaintenanceDetailsPage = ({ route, navigation }) => {
  const { maintenance } = route.params;

  const handleDeleteMaintenance = () => {
{/* Alerta ae Confirmação de Excluir Lembrete */}
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
            Alert.alert('Lembrete excluído com sucesso');
            console.log('Lembrete excluído com sucesso');
          },
          style: 'destructive'
        },
      ],
      { cancelable: false, alertContainerStyle: styles.alertContainer }
    );
  };

{/* Calcular Percentual de Quilometros */}
  const calculateKilometersProgress = (item) => {
    if (item.isKilometersEnabled) {
        return (3.4 *(item.kilometers / (item.kilometersEnd / 100)));
    } else {
        return 0;
    }
  };

{/* Calcular Percentual de Meses */}
  const calculateMonthsProgress = (item) => {
    if (item.isMonthsEnabled) {
        return (3.4 *(item.months / (item.monthsEnd / 100)));
    } else {
        return 0;
    }
  };

{/* Navegação Para a Página de Edição da Manutenção */}
  const handleEditMaintenance = () => {
    navigation.navigate('EditMaintenancePage', { maintenance });
  };

  return (
    <ScrollView style={styles.container}>

{/* Tipo de Manutenção */}
      <Text style={styles.label}>Tipo de Manutenção:</Text>
      <Text style={styles.text}>{maintenance.type}</Text>

{/* Estado da Notifição */}
      <View style={styles.linha} marginBottom={10}>
        <Text style={styles.label}>Notificação:</Text>
        {(!maintenance.isKilometersEnabled && !maintenance.isMonthsEnabled) && (
          <IconMCI 
            name="alert-outline" 
            color={'#FF9900'}
            size={30} 
            marginLeft={10}
          />
        )}
        <Text style={[styles.checkbox, maintenance.isRepeat && styles.checkedCheckbox]}>{maintenance.isRepeat ? 'Ligada' : 'Desligada'}</Text>
      </View>

{/* Notificações */}
      {maintenance.isRepeat && (
        <View>
          <Text style={styles.label}>Notificar a cada:</Text>

{/* Barra de Progresso em Quilometros */}
          {maintenance.isKilometersEnabled && (
            <View>
              <View style={styles.linha} justifyContent={'space-between'}>
                <Text style={styles.itemText}>
                  {maintenance.isKilometersEnabled ? `${maintenance.kilometers} KM ` : ''}
                </Text>
                  {((maintenance.kilometers == maintenance.kilometersEnd && !maintenance.kilometersEnd == '')) && (
                    <IconMCI 
                      name="alert" 
                      color={'#DD0000'}
                      size={30} 
                      marginRight={10}
                    />
                  )}
                <Text style={styles.itemText}>
                  {maintenance.isKilometersEnabled ? `${maintenance.kilometersEnd} KM ` : ''}
                </Text>
              </View>
              <View style={styles.progressBarTotal}><View style={styles.progressBar} width={calculateKilometersProgress(maintenance)}></View></View>
            </View>
          )}

{/* Barra de Progresso em Meses */}
          {maintenance.isMonthsEnabled && (
            <View>
              <View style={styles.linha} justifyContent={'space-between'}>
                <Text style={styles.itemText}>
                  {maintenance.isMonthsEnabled ? `${maintenance.months} Meses ` : ''}
                </Text>
                  {((maintenance.months == maintenance.monthsEnd && !maintenance.monthsEnd == '')) && (
                    <IconMCI 
                      name="alert" 
                      color={'#DD0000'}
                      size={30} 
                      marginRight={10}
                    />
                  )}
                <Text style={styles.itemText}>
                  {maintenance.isMonthsEnabled ? `${maintenance.monthsEnd} Meses ` : ''}
                </Text>
              </View>

              <View style={styles.progressBarTotal}><View style={styles.progressBar} width={calculateMonthsProgress(maintenance)}></View></View>
            </View>
          )}

        </View>
      )}

{/* Descrição do Lembrete */}
      <Text style={styles.label} marginTop={20}>Descrição:</Text>
      <Text style={styles.descriptionInput}>{maintenance.description}</Text>
      
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
    color: '#6A6A6A',
    fontSize: 20,
    fontWeight: 'bold',
  },
  text: {
    color: '#6A6A6A',
    borderBottomColor: '#6A6A6A99',
    borderBottomWidth: 2,
    marginBottom: 20,
    marginTop: 10,
    fontSize: 18,
    paddingHorizontal: 10,
  },

  checkbox: {
    borderColor: '#6A6A6A',
    color: '#6A6A6A',
    borderRadius: 6,
    borderWidth: 2,
    paddingHorizontal: 10,
    paddingVertical: 4,
    fontSize: 16,
    marginHorizontal: 10,
  },
  checkedCheckbox: {
    backgroundColor: '#009F4D',
    color: '#FFFFFF'
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
  },
  progressBarTotal: {
    backgroundColor: '#6A6A6A99',
    width: 340,
    height: 10,
    alignSelf: 'center',
  },

  
  descriptionInput: {
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
