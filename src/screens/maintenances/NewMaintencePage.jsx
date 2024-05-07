import { React, useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, TextInput, StyleSheet, Alert } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import Slider from '@react-native-community/slider';
import CheckBox from 'expo-checkbox';
import IconMCI from 'react-native-vector-icons/MaterialCommunityIcons';

import AsyncStorage from '@react-native-async-storage/async-storage';
import { fetchVehicleMaintenances, insertMaintenance } from '../../database/MaintenanceDatabase';

const NewMaintencePage = ({ navigation }) => {
  const [type, setType] = useState('');
  const [isRepeat, setIsRepeat] = useState(false);
  const [isKilometersEnabled, setIsKilometersEnabled] = useState(false);
  const [isMonthsEnabled, setIsMonthsEnabled] = useState(false);
  const [kilometers, setKilometers] = useState(0);
  const [kilometersTotal, setKilometersTotal] = useState(0);
  const [months, setMonths] = useState(0);
  const [monthsTotal, setMonthsTotal] = useState(0);
  const [description, setDescription] = useState('');
  const [activeVehicle, setActiveVehicle] = useState('');

  {/* Carregamentos */}
  useEffect(() => {
    const fetchVehicle = async () => {
      try {
        const vehicleData = await AsyncStorage.getItem('@activeVehicle');
        if (vehicleData !== '') {
          setActiveVehicle(JSON.parse(vehicleData));
        }
      } catch (error) {
        console.error('Erro ao recuperar os dados do veículo ativo:', error);
      }
    };
    fetchVehicle();
  }, []);
 
{/* Salvar */}
  const handleAddReminder = async () => {
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

  {/* Verificação do Limite de Veículos */}
   const maintenances = await fetchVehicleMaintenances(activeVehicle.id);
   if (maintenances.length >= 10) {
       Alert.alert(
         'Limite Máximo de Lembretes Atingido',
         'Você atingiu o máximo de 10 veículos.',
         [
           {
             text: 'OK', onPress: () => console.log('OK Pressed'), style: 'cancel',
           },
         ],
         { cancelable: false }
       );
       return;
   }

{/* Inserção dos Dados do Lembrete */}
    insertMaintenance({type, isRepeat, isKilometersEnabled, kilometers, kilometersTotal, isMonthsEnabled, months, monthsTotal, description}, activeVehicle.id);
    console.log('Novo lembrete:','Tipo:',type, ',Repetição:',isRepeat ? 'Ligada' : 'Desligada',', Quilometros:', isKilometersEnabled ? kilometers : 'Não habilitado',', Meses:', isMonthsEnabled ? months : 'Não habilitado',', Descrição:',description,', Veículo:',activeVehicle.name);
    navigation.navigate('SelectNavigator');
    Alert.alert('Novo Lembrete Salvo com Sucesso!'); 
  };


  return (
    <View style={styles.container}>
    
{/* Tipo do Lembrete */}
      <Text style={styles.label}>Tipo:</Text>
      <Picker
        selectedValue={type}
        style={styles.picker}
        onValueChange={(itemValue, itemIndex) => setType(itemValue)}
        mode={'dropdown'}
      >
        <Picker.Item label="Tipo de Manutenção" value=" " />
        <Picker.Item label="_____________________________________" value=" " />
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
          <Text style={styles.checkboxLabel}>  Meses: </Text>
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
        style={styles.descriptionInput}
        value={description}
        multiline={true}
        rows={6}
        onChangeText={setDescription}
        placeholder="Descrição da manutenção"
      />

{/* Botão Salvar */}
      <TouchableOpacity style={styles.addButton} onPress={handleAddReminder}>
        <Text style={styles.addButtonText}>Salvar</Text>
      </TouchableOpacity>

    </View>
  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9F9F9',
    padding: 20,
    paddingTop: 10,
  },

  label: {
    color: '#000000',
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

  checkbox: {
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

  descriptionInput: {
    color: '#6A6A6A',
    borderColor: '#6A6A6A99',
    borderWidth: 2,
    height: 180,
    borderRadius: 10,
    marginTop: 10,
    marginBottom: 10,
    fontSize: 18,
    paddingTop: 10,
    paddingHorizontal: 10,
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
    marginTop: 10,
    marginBottom: 10,
  },
  addButtonText: {
    color: '#FFFFFF',
    fontSize: 20,
    fontWeight: 'bold',
  },
});

export default NewMaintencePage;
