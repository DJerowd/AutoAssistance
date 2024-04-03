import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const MaintenanceDetailsPage = ({ route }) => {
  const { maintenance } = route.params;

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Tipo de Manutenção:</Text>
      <Text style={styles.text}>{maintenance.type}</Text>

      <Text style={styles.label}>Repetição:</Text>
      <Text style={styles.text}>{maintenance.isRepeat ? 'Sim' : 'Não'}</Text>

      {maintenance.isRepeat && (
        <>
          <Text style={styles.label}>Notificar a cada:</Text>
          <Text style={styles.text}>
            {maintenance.isKilometersEnabled ? `${maintenance.kilometers} KM ` : ''}
            {maintenance.isMonthsEnabled ? `${maintenance.months} Meses ` : ''}
          </Text>
        </>
      )}

      <Text style={styles.label}>Descrição:</Text>
      <Text style={styles.text}>{maintenance.description}</Text>
      
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#FFFFFF',
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
});

export default MaintenanceDetailsPage;
