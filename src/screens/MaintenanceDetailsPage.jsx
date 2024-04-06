import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import IconMCI from 'react-native-vector-icons/MaterialCommunityIcons';

const MaintenanceDetailsPage = ({ route }) => {
  const { maintenance } = route.params;

  return (
    <View style={styles.container}>
      {((maintenance.months == maintenance.monthsEnd && !maintenance.monthsEnd == '') || (maintenance.kilometers == maintenance.kilometersEnd && !maintenance.kilometersEnd == '')) && (
          <IconMCI 
            name="alert" 
            color={'#DD0000'}
            size={40} 
            alignSelf={'flex-end'}
          />
        )}
        {(!maintenance.isKilometersEnabled && !maintenance.isMonthsEnabled) && (
          <View style={styles.linha} alignSelf={'flex-end'}>
            <Text>Notificação Desligada</Text>
            <IconMCI 
              name="alert-outline" 
              color={'#FF9900'}
              size={40} 
            />
          </View>
        )}
      <Text style={styles.label}>Tipo de Manutenção:</Text>
      <Text style={styles.text}>{maintenance.type}</Text>

      <Text style={styles.label}>Repetição:</Text>
      <Text style={styles.text}>{maintenance.isRepeat ? 'Ligada' : 'Desligada'}</Text>

      {maintenance.isRepeat && (
        <>
          <Text style={styles.label}>Notificar a cada:</Text>
          <Text style={styles.text}>
            {maintenance.isKilometersEnabled ? `${maintenance.kilometers} Quilometros ` : ''}
          </Text>
          <Text style={styles.text}>
            {maintenance.isMonthsEnabled ? `${maintenance.months} Meses ` : ''}
          </Text>
        </>
      )}

      <Text style={styles.label}>Descrição:</Text>
      <Text style={styles.descriptionInput}>{maintenance.description}</Text>
      
    </View>
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
  
});

export default MaintenanceDetailsPage;
