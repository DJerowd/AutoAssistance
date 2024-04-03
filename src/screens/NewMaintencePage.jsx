import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';

const NewMaintencePage = ({ navigation }) => {
  const [type, setType] = useState('');
  const [isRepeat, setIsRepeat] = useState(false);
  const [isKilometersEnabled, setIsKilometersEnabled] = useState(false);
  const [isMonthsEnabled, setIsMonthsEnabled] = useState(false);
  const [kilometers, setKilometers] = useState('');
  const [months, setMonths] = useState('');
  const [description, setDescription] = useState('');

  const handleAddReminder = () => {
    console.log('Novo lembrete adicionado:');
    console.log('Tipo de manutenção:', type);
    console.log('Repetição:', isRepeat ? 'Ligada' : 'Desligada');
    console.log('Quilometros:', isKilometersEnabled ? kilometers : 'Não habilitado');
    console.log('Meses:', isMonthsEnabled ? months : 'Não habilitado');
    console.log('Descrição:', description);

    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Tipo:</Text>
      <TextInput
        style={styles.input}
        value={type}
        onChangeText={setType}
        placeholder="Tipo de manutenção"
      />

      <Text style={styles.label}>Frequência:</Text>
      
      <View style={styles.linha}>
        <View style={styles.checkboxContainer}>
          <TouchableOpacity
            style={[styles.repeatCheckbox, isRepeat && styles.checkedCheckbox]}
            onPress={() => setIsRepeat(!isRepeat)}
          >
            <Text style={styles.checkboxLabel}>Repetir</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.checkboxContainer}>
          <TouchableOpacity
            style={[styles.repeatCheckbox, !isRepeat && styles.checkedCheckbox]}
            onPress={() => setIsRepeat(!isRepeat)}
          >
            <Text style={styles.checkboxLabel}>Não Repetir</Text>
          </TouchableOpacity>
        </View>
      </View>
      

      <Text style={styles.label}>Notificar a cada:</Text>

      <View style={styles.linha}>
        <View style={styles.checkboxContainer}>
          <TouchableOpacity
            style={[styles.checkbox, isKilometersEnabled && styles.checkedCheckbox]}
            onPress={() => setIsKilometersEnabled(!isKilometersEnabled)}
          />
          <Text style={styles.checkboxLabel}>Quilometros:</Text>

        </View>
        {isKilometersEnabled && (
          <TextInput
            style={styles.checkboxInput}
            value={kilometers}
            onChangeText={setKilometers}
            placeholder="Km"
            keyboardType="numeric"
          />
        )}
      </View>

      <View style={styles.linha}>
        <View style={styles.checkboxContainer}>
          <TouchableOpacity
            style={[styles.checkbox, isMonthsEnabled && styles.checkedCheckbox]}
            onPress={() => setIsMonthsEnabled(!isMonthsEnabled)}
          />
          <Text style={styles.checkboxLabel}>Meses:</Text>
        </View>

        {isMonthsEnabled && (
          <TextInput
            style={styles.checkboxInput}
            value={months}
            onChangeText={setMonths}
            placeholder="M"
            keyboardType="numeric"
          />
        )}
      </View>


    <Text style={styles.label}>Descrição:</Text>

      <TextInput
        style={styles.input}
        value={description}
        onChangeText={setDescription}
        placeholder="Descrição da manutenção"
      />

      <TouchableOpacity style={styles.addButton} onPress={handleAddReminder}>
        <Text style={styles.addButtonText}>Salvar</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.cancelButton} onPress={handleAddReminder}>
        <Text style={styles.cancelButtonText}>Cancelar</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    paddingTop: 40,
    backgroundColor: '#FFFFFF',
  },
  label: {
    color: '#6A6A6A',
    fontSize: 20,
    fontWeight: 'bold',
  },
  input: {
    color: '#6A6A6A',
    borderBottomColor: '#6A6A6A99',
    fontSize: 18,
    height: 40,
    borderBottomWidth: 2,
    marginBottom: 20,
    paddingHorizontal: 10,
  },

  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  checkbox: {
    width: 20,
    height: 20,
    borderRadius: 6,
    borderWidth: 2,
    borderColor: '#6A6A6A99',
    marginRight: 10,
  },
  checkedCheckbox: {
    backgroundColor: '#009F4D',
  },
  checkboxLabel: {
    color: '#6A6A6A',
    fontSize: 20,
  },
  checkboxInput: {
    color: '#6A6A6A',
    borderBottomColor: '#6A6A6A99',
    fontSize: 18,
    borderBottomWidth: 2,
    marginBottom: 10,
    marginLeft: 10,
    paddingHorizontal: 10,
  },

  repeatCheckbox: {
    paddingVertical: 4,
    paddingHorizontal: 10,
    borderRadius: 6,
    borderWidth: 2,
    borderColor: '#6A6A6A99',
    marginRight: 10,
    marginTop: 10,
  },

  linha: {
    flexDirection: 'row',
  },

  addButton: {
    backgroundColor: '#009F4D',
    borderColor: '#009F4D',
    borderWidth: 4,
    padding: 20,
    borderRadius: 12,
    alignItems: 'center',
    marginBottom: 10,
  },
  addButtonText: {
    color: '#FFFFFF',
    fontSize: 20,
    fontWeight: 'bold',
  },

  cancelButton: {
    backgroundColor: '#FFFFFF',
    borderColor: '#009F4D',
    borderWidth: 4,
    padding: 20,
    borderRadius: 12,
    alignItems: 'center',
    marginBottom: 10,
  },
  cancelButtonText: {
    color: '#009F4D',
    fontSize: 20,
    fontWeight: 'bold',
  },
});

export default NewMaintencePage;
