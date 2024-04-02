import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';

const NewMaintencePage = ({ navigation }) => {
  const [type, setType] = useState('');
  const [kilometers, setKilometers] = useState('');
  const [months, setMonths] = useState('');
  const [description, setDescription] = useState('');

  const handleAddReminder = () => {
    console.log('Novo lembrete adicionado:');
    console.log('Tipo de manutenção:', type);
    console.log('Quilometros:', kilometers);
    console.log('Meses:', months);
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
        <Text style={styles.label}>[X]</Text>
        <TextInput
            style={styles.input}
            value={kilometers}
            onChangeText={setKilometers}
            placeholder="KM"
            keyboardType="numeric"
        />
      </View>

      <View style={styles.linha}>
        <Text style={styles.label}>[X]</Text>
        <TextInput
            style={styles.input}
            value={months}
            onChangeText={setMonths}
            placeholder="Meses"
            keyboardType="numeric"
        />
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

  linha: {
    flexDirection: 'row',
  },

  addButton: {
    backgroundColor: '#009F4D',
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
    borderWidth: 4,
    borderColor: '#009F4D',
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
