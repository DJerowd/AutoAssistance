import { React, useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, TextInput, StyleSheet, Alert } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import Slider from '@react-native-community/slider';
import CheckBox from 'expo-checkbox';
import IconMCI from 'react-native-vector-icons/MaterialCommunityIcons';

import AsyncStorage from '@react-native-async-storage/async-storage';
import { updateMaintenance } from '../../database/MaintenanceDatabase';

const EditMaintenancePage = ({ route, navigation }) => {
  const { maintenance } = route.params;
  const [editedMaintenance, setEditedMaintenance] = useState({ ...maintenance });
  const [type, setType] = useState(maintenance.type);
  const [isRepeat, setIsRepeat] = useState(maintenance.isRepeat);
  const [isKilometersEnabled, setIsKilometersEnabled] = useState(maintenance.isKilometersEnabled);
  const [kilometers, setKilometers] = useState(maintenance.kilometers);
  const [kilometersTotal, setKilometersTotal] = useState(maintenance.kilometersTotal);
  const [isMonthsEnabled, setIsMonthsEnabled] = useState(maintenance.isMonthsEnabled);
  const [months, setMonths] = useState(maintenance.months);
  const [monthsTotal, setMonthsTotal] = useState(maintenance.monthsTotal);
  const [description, setDescription] = useState(editedMaintenance.description);
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


{/* Salvar */}
  const handleUpdateMaintenances = () => {

    const updatedMaintenance = {
      ...maintenance,
      type,
      isRepeat,
      isKilometersEnabled,
      kilometers,
      kilometersTotal,
      isMonthsEnabled,
      months,
      monthsTotal,
      description,
    };

{/* Alerta ao Tentar Salvar sem Preencher os Campos Necessários */}
    if (!type) {
      Alert.alert(
        'Campos não preenchidos',
        'Por favor, preencha todos os campos obrigatórios.',
        [
          {
            text: 'OK',
            onPress: () => console.log('OK Pressed'),
            style: 'cancel',
          },
        ],
        { cancelable: false }
      );
      return;
    }

    
    

{/* Mensagem no Console */}
    console.log(
        'Lembrete alterado:',
        'Tipo de manutenção:', editedMaintenance.type,
        ', Repetição:', editedMaintenance.isRepeat ? 'Ligada' : 'Desligada',
        ', Quilometros:', editedMaintenance.isKilometersEnabled ? editedMaintenance.kilometersTotal : 'Não habilitado',
        ', Meses:', editedMaintenance.isMonthsEnabled ? editedMaintenance.monthsTotal : 'Não habilitado',
        ', Descrição:', editedMaintenance.description
      );

    {/* Salvar atualizações do lembrete */}
    Alert.alert(
      "Confirmar Atualização",
      "Você tem certeza de que deseja salvar as alterações?",
      [
        { text: "Cancelar", onPress: () => console.log("Cancel Pressed"), style: "cancel" },
        { text: "Confirmar", onPress: () => {
            {/* Validar se o valor de quilometros e meses inserido não é menor que o progresso atual */}
            if (kilometersTotal >= kilometers) {
              if (monthsTotal >= months) {
                updateMaintenance(updatedMaintenance, activeVehicle.id)
                console.log('Veículo atualizado:', updatedMaintenance);
                navigation.navigate('SelectNavigator');
                Alert.alert('Alterações salvas com sucesso');
              } else {
                Alert.alert('Valor inválido', 'O valor de meses não pode ser menor que o progresso atual de meses.');
              }
            } else {
              Alert.alert('Valor inválido', 'O valor de quilômetros não pode ser menor que o progresso atual de quilômetros.');
            }
          }
        }
      ]
    );
  };


  return (
    <View style={styles.container}>

{/* Tipo do Lembrete */}
      <Text style={styles.label}>Tipo de Manutenção:</Text>
      <View style={styles.pickerLabel}>
      <Picker
        selectedValue={type}
        style={styles.picker}
        onValueChange={(itemValue, itemIndex) => setType(itemValue)}
        // onChangeText={(text) => handleChangeText('type', text)}
        mode={'dropdown'}
      >
        <Picker.Item label="Ar Condicionado" value="Ar Condicionado" />
        <Picker.Item label="Bateria" value="Bateria" />
        <Picker.Item label="Correia" value="Correia" />
        <Picker.Item label="Filtro de Ar" value="Filtro de Ar" />
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
      </View>
      
{/* Frequência de Repetição */}
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

      {/* <
      


{/* Estado de Notificação */}
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
            style={[styles.checkbox, (isKilometersEnabled || isMonthsEnabled) && styles.checkedCheckbox]}
            value={(isKilometersEnabled || isMonthsEnabled) ? 'Ligada' : 'Desligada'}
            editable={false}
        />
      </View>


      <Text style={styles.label}>Notificar a cada:</Text>
{/* Quilometros para Notificar */}
      <View style={styles.linha}>
        <View style={styles.checkboxContainer}>
          <CheckBox
            disabled={false}
            value={isKilometersEnabled}
            onValueChange={() => setIsKilometersEnabled(!isKilometersEnabled)}
            color={isKilometersEnabled ? '#009F4D' : undefined}
          />
          <Text style={styles.checkboxLabel}>  Quilometros:</Text>
        {isKilometersEnabled && (
          <Text style={styles.checkboxInput}>{kilometersTotal}</Text>
        )}
        </View>
      </View>
      <Slider
        style={styles.slider}
        minimumValue={0}
        maximumValue={150000}
        value={kilometersTotal}
        onValueChange={(value) => setKilometersTotal(Math.round(value / 1000) * 1000)}
        minimumTrackTintColor="#008F45"
        maximumTrackTintColor="#000000"
        thumbTintColor="#009F4D"
      />

{/* Meses para notificar */}
      <View style={styles.linha}>
        <View style={styles.checkboxContainer}>
          <CheckBox
            disabled={false}
            value={isMonthsEnabled}
            onValueChange={() => setIsMonthsEnabled(!isMonthsEnabled)}
            color={isMonthsEnabled ? '#009F4D' : undefined}
          />
          <Text style={styles.checkboxLabel}>  Meses:</Text>
          {isMonthsEnabled && (
            <Text style={styles.checkboxInput}>{monthsTotal}</Text>
          )}
        </View>
      </View>
      <Slider
        style={styles.slider}
        minimumValue={0}
        maximumValue={60}
        value={monthsTotal}
        onValueChange={(value) => setMonthsTotal(`${Math.round(value)}`)}
        minimumTrackTintColor="#008F45"
        maximumTrackTintColor="#000000"
        thumbTintColor="#009F4D"
      />

{/* Descrição do Lembrete */}
    <Text style={styles.label}>Descrição:</Text>
      <TextInput
        style={styles.input}
        value={description}
        multiline={true}
        rows={6}
        onChangeText={setDescription}
      />

{/* Botão Salvar */}
      <TouchableOpacity style={styles.saveButton} onPress={handleUpdateMaintenances}>
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
    color: '#000000',
    fontSize: 20,
    fontWeight: '500',
  },

  pickerLabel:{
    backgroundColor: '#6A6A6A22',
    borderColor: '#000000',
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 10,
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

  checkbox: {
    backgroundColor: '#6A6A6A22',
    borderColor: '#000000',
    color: '#6A6A6A',
    borderRadius: 6,
    borderWidth: 1,
    paddingHorizontal: 8,
    paddingVertical: 0,
    fontSize: 16,
    marginHorizontal: 10,
  },
  checkedCheckbox: {
    backgroundColor: '#009F4D',
    color: '#FFFFFF'
  },

  repeatCheckbox: {
    backgroundColor: '#6A6A6A22',
    borderColor: '#000000',
    borderRadius: 6,
    borderWidth: 1,
    paddingHorizontal: 8,
    paddingVertical: 4,
    marginRight: 10,
    marginTop: 6,
  },

  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
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
    fontSize: 20,
    paddingHorizontal: 10,
  },

  slider: {
    width: '100%',
    height: 20,
  },

  input: {
    backgroundColor: '#6A6A6A22',
    color: '#6A6A6A',
    borderColor: '#6A6A6A99',
    borderWidth: 2,
    height: 180,
    borderRadius: 10,
    marginTop: 10,
    marginBottom: 10,
    fontSize: 18,
    paddingHorizontal: 10,
    paddingVertical: 10,
    textAlignVertical: 'top',
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
    marginTop: 10,
    marginBottom: 10,
  },
  saveButtonText: {
    color: '#FFFFFF',
    fontSize: 20,
    fontWeight: 'bold',
  },
});

export default EditMaintenancePage;
