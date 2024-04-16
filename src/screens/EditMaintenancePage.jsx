import React, { useState } from 'react';
import { View, Text, TouchableOpacity, TextInput, StyleSheet, ScrollView, Alert } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import IconMCI from 'react-native-vector-icons/MaterialCommunityIcons';

const EditMaintenancePage = ({ route }) => {
  const { maintenance } = route.params;
  const [editedMaintenance, setEditedMaintenance] = useState({ ...maintenance });
  const [type, setType] = useState(maintenance.type);
  const [isRepeat, setIsRepeat] = useState(maintenance.isRepeat);
  const [isKilometersEnabled, setIsKilometersEnabled] = useState(maintenance.isKilometersEnabled);
  const [isMonthsEnabled, setIsMonthsEnabled] = useState(maintenance.isMonthsEnabled);
  const [kilometers, setKilometers] = useState(maintenance.kilometers);
  const [months, setMonths] = useState(maintenance.months);
  const [description, setDescription] = useState(editedMaintenance.description);

  const handleSaveChanges = () => {
    console.log(
        'Lembrete alterado:',
        'Tipo de manutenção:', editedMaintenance.type,
        ', Repetição:', editedMaintenance.isRepeat ? 'Ligada' : 'Desligada',
        ', Quilometros:', editedMaintenance.isKilometersEnabled ? editedMaintenance.kilometers : 'Não habilitado',
        ', Meses:', editedMaintenance.isMonthsEnabled ? editedMaintenance.months : 'Não habilitado',
        ', Descrição:', editedMaintenance.description
      );

    Alert.alert('Alterações salvas com sucesso');
  };

  const handleChangeText = (key, value) => {
    setEditedMaintenance({ ...editedMaintenance, [key]: value });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Tipo de Manutenção:</Text>
      <Picker
        selectedValue={type}
        style={styles.picker}
        onValueChange={(itemValue, itemIndex) => setType(itemValue)}
        // onChangeText={(text) => handleChangeText('type', text)}
        mode={'dropdown'}
      >
        <Picker.Item label="Tipo de Manutenção" />
        <Picker.Item label="_____________________________________" />
        <Picker.Item label="Ar Condicionado" value="ar condicionado" />
        <Picker.Item label="Bateria" value="bateria" />
        <Picker.Item label="Correia" value="correia" />
        <Picker.Item label="Filtro de Ar" value="filtro de ar" />
        <Picker.Item label="Filtro de Combustível" value="Filtro de Combustível" />
        <Picker.Item label="Filtro de Óleo" value="Filtro de Óleo" />
        <Picker.Item label="Fluído de Freio" value="Fluído de Freio" />
        <Picker.Item label="Luzes" value="Luzes" />
        <Picker.Item label="Pastilha de Freio" value="Pastilha de Freio" />
        <Picker.Item label="Pneus" value="Pneus" />
        <Picker.Item label="Revisão" value="Revisão" />
        <Picker.Item label="Suspensão" value="Suspensão" />
        <Picker.Item label="Amortecedores" value="Amortecedores" />
        <Picker.Item label="Troca de Óleo" value="Troca de Óleo" />
      </Picker>
      

      <Text style={styles.label}>Frequência:</Text> 
      <View style={styles.linha}>
        <View style={styles.checkboxContainer}>
          <TouchableOpacity
            style={[styles.repeatCheckbox, isRepeat && styles.checkedCheckbox]}
            onPress={() => setIsRepeat(!isRepeat)}
          >
            <Text style={[styles.checkboxLabel, isRepeat && styles.checkedCheckboxLabel]}>Repetir</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.checkboxContainer}>
          <TouchableOpacity
            style={[styles.repeatCheckbox, !isRepeat && styles.checkedCheckbox]}
            onPress={() => setIsRepeat(!isRepeat)}
          >
            <Text style={[styles.checkboxLabel, !isRepeat && styles.checkedCheckboxLabel]}>Não Repetir</Text>
          </TouchableOpacity>
        </View>
      </View>
      

      {/* <Text style={styles.label} marginBottom={10}>Notificação:</Text>
        <View style={styles.linha} marginBottom={10}>
      
        <Text style={[styles.checkbox, maintenance.isRepeat && styles.checkedCheckbox]}>{maintenance.isRepeat ? 'Ligada' : 'Desligada'}</Text>
      </View> */}


      <View style={styles.linha} marginBottom={10}>
        <Text style={styles.label} >Notificação:</Text>
        {(!isKilometersEnabled && !isMonthsEnabled) && (
          <IconMCI 
            name="alert-outline" 
            color={'#FF9900'}
            size={30} 
            marginLeft={10}
          />
        )}
        <TextInput
            style={[styles.checkbox1, isRepeat && styles.checkedCheckbox1]}
            value={editedMaintenance.isRepeat ? 'Ligada' : 'Desligada'}
            editable={false}
        />
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
            value={`${kilometers}`}
            onChangeText={setKilometers}
            // onChangeText={(text) => handleChangeText('kilometers', text)}
            placeholder={`${kilometers}`}
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
            value={`${months}`}
            onChangeText={setMonths}
            // onChangeText={(text) => handleChangeText('months', text)}
            placeholder={`${months}`}
            keyboardType="numeric"
            scrollEnabled={true}
          />
        )}
      </View>

      {/* <TextInput
        style={styles.textInput}
        value={editedMaintenance.type}
        onChangeText={(text) => handleChangeText('type', text)}
      /> */}


    <Text style={styles.label}>Descrição:</Text>
      <TextInput
        style={styles.descriptionInput}
        value={description}
        multiline={true}
        rows={6}
        onChangeText={setDescription}
        // onChangeText={(text) => handleChangeText('description', text)}
      />
      
      
      <TouchableOpacity style={styles.saveButton} onPress={handleSaveChanges}>
        <Text style={styles.saveButtonText}>Salvar Alterações</Text>
      </TouchableOpacity>
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

  picker: {
    color: '#6A6A6A',
    borderBottomColor: '#6A6A6A99',
    borderBottomWidth: 2,
    fontSize: 18,
    height: 40,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
  
  input: {
    color: '#6A6A6A',
    borderBottomColor: '#6A6A6A99',
    borderBottomWidth: 2,
    fontSize: 18,
    height: 40,
    marginBottom: 20,
    paddingHorizontal: 10,
  },

  checkbox1: {
    borderColor: '#6A6A6A',
    color: '#6A6A6A',
    borderRadius: 6,
    borderWidth: 2,
    paddingHorizontal: 10,
    paddingVertical: 4,
    fontSize: 16,
    marginHorizontal: 10,
  },
  checkedCheckbox1: {
    backgroundColor: '#009F4D',
    color: '#FFFFFF'
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
  checkedCheckboxLabel: {
    color: '#FFFFFF',
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

  descriptionInput: {
    color: '#6A6A6A',
    borderColor: '#6A6A6A99',
    borderWidth: 2,
    height: 160,
    borderRadius: 10,
    marginTop: 10,
    marginBottom: 20,
    fontSize: 18,
    paddingHorizontal: 10,
    paddingVertical: 10,
    textAlignVertical: 'top',
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

  textInput: {
    borderColor: '#6A6A6A99',
    borderBottomWidth: 2,
    marginTop: 10,
    fontSize: 18,
    paddingHorizontal: 10,
    paddingVertical: 10,
  },
  saveButton: {
    backgroundColor: '#009F4D',
    borderColor: '#009F4D',
    borderWidth: 4,
    padding: 20,
    borderRadius: 12,
    alignItems: 'center',
    marginBottom: 10,
  },
  saveButtonText: {
    color: '#FFFFFF',
    fontSize: 20,
    fontWeight: 'bold',
  },
});

export default EditMaintenancePage;
