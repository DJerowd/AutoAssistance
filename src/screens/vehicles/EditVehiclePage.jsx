import {React, useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView, Alert } from 'react-native';
import {Picker} from '@react-native-picker/picker';

import { updateVehicle, fetchVehicles } from '../../database/VehiclesDatabase';

const EditVehiclePage = ({ navigation, route }) => {
 const { vehicle } = route.params;
 const [name, setName] = useState(vehicle.name);
 const [brand, setBrand] = useState(vehicle.brand);
 const [model, setModel] = useState(vehicle.model);
 const [version, setVersion] = useState(vehicle.version);
 const [color, setColor] = useState(vehicle.color);
 const [manufactureYear, setManufactureYear] = useState(vehicle.manufactureYear);
 const [licensePlate, setLicensePlate] = useState(vehicle.licensePlate);
 const [fuelType, setFuelType] = useState(vehicle.fuelType);
 const [transmission, setTransmission] = useState(vehicle.transmission);
 const [engine, setEngine] = useState(vehicle.engine);
 const [mileage, setMileage] = useState(vehicle.mileage);
 const [additionalMileage, setAdditionalMileage] = useState(0);

 const totalMileage = additionalMileage ? parseInt(mileage, 10) + parseInt(additionalMileage, 10) : parseInt(mileage, 10) + 0;


{/* Salvar */}
 const handleUpdateVehicle = () => {

  const updatedVehicle = {
    ...vehicle,
    name,
    brand,
    model,
    version,
    color,
    manufactureYear,
    licensePlate,
    fuelType,
    transmission,
    engine,
    mileage: totalMileage,
  };

{/* Alerta ao Tentar Salvar sem Preencher os Campos Necessários */}
    if (!name || !brand || !model || !color || !fuelType || !transmission || !engine) {
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

    // Salvar atualizações do veículo
    Alert.alert(
      "Confirmar Atualização",
      "Você tem certeza de que deseja salvar as alterações?",
      [
        { text: "Cancelar", onPress: () => console.log("Cancel Pressed"), style: "cancel" },
        { text: "Confirmar", onPress: () => {

          

          updateVehicle(updatedVehicle);
          console.log('Veículo atualizado:', updatedVehicle);
          navigation.navigate('SelectNavigator');
          Alert.alert('Veículo Atualizado com Sucesso!');

          }
        }
      ]
    );
 };

 {/* Identificação do Codigo HEX de Cor */}
 const getColorCode = (colorName) => {
    switch (colorName.toLowerCase()) {
      case 'preto':
        return '#000000DD';
      case 'cinza':
        return '#4A4A4ADD';
      case 'prata':
        return '#C3BFBFDD';
      case 'branco':
        return '#EEEEEEDD';
      case 'vermelho':
        return '#FF0000DD';
      case 'azul':
        return '#2400FFDD';
      case 'verde':
        return '#21A400DD';
      case 'amarelo':
        return '#FAFF00DD';
      case 'laranja':
        return '#FF9900DD';
      case 'marrom':
        return '#523100DD';
      case 'rosa':
        return '#FF00D6DD';
     
      default:
        return '#6A6A6A55';
    }
  };


 return (
    <ScrollView style={styles.container}>

{/* Nome do Veículo */}
      <Text style={styles.label}>Nome do veículo:</Text>
      <TextInput
        style={styles.input}
        value={name}
        onChangeText={setName}
        placeholder="Carro"
      />


{/* Marca do Veículo */}
      <View style={styles.linha}>
      <Text style={styles.label}>Marca do veículo:</Text>
      <Text style={styles.text}>{vehicle.brand}</Text>
      </View>

{/* Modelo do Veículo */}
      <View style={styles.linha}>
      <Text style={styles.label}>Modelo do Veículo:</Text>
      <Text style={styles.text}>{vehicle.model}</Text>
      </View>

{/* Versão do Veículo */}
      <View style={styles.linha}>
      <Text style={styles.label}>Versão do veículo:</Text>
      <Text style={styles.text}>{vehicle.version}</Text>
      </View>


{/* Cor do Veículo */}
      <View style={{flexDirection: 'row', marginTop: 10,}}>
      <Text style={styles.label}>Cor do veículo:</Text>
      <View
        style={[styles.colorButton, { backgroundColor: getColorCode(color) }]}
      />
      </View>
      <View style={styles.pickerLabel}>
      <Picker
        selectedValue={color}
        style={styles.picker}
        onValueChange={(itemValue, itemIndex) => setColor(itemValue)}
        mode={'dropdown'}
      >
        <Picker.Item label="Preto" value="Preto" />
        <Picker.Item label="Cinza" value="Cinza" />
        <Picker.Item label="Prata" value="Prata" />
        <Picker.Item label="Branco" value="Branco" />
        <Picker.Item label="Vermelho" value="Vermelho" />
        <Picker.Item label="Azul" value="Azul" />
        <Picker.Item label="Verde" value="Verde" />
        <Picker.Item label="Amarelo" value="Amarelo" />
        <Picker.Item label="Laranja" value="Laranja" />
        <Picker.Item label="Marrom" value="Marrom" />
        <Picker.Item label="Rosa" value="Rosa" />
      </Picker>
      </View>

{/* Tipo de Combustível do Veículo */}
      <Text style={styles.label}>Tipo de Combustível:</Text>
      <View style={styles.pickerLabel}>
      <Picker
        selectedValue={fuelType}
        style={styles.picker}
        onValueChange={(itemValue, itemIndex) => setFuelType(itemValue)}
        mode={'dropdown'}
      >
        <Picker.Item label="Gasolina" value="Gasolina" />
        <Picker.Item label="Etanol" value="Etanol" />
        <Picker.Item label="Flex (Gasolina e Etanol)" value="Flex" />
        <Picker.Item label="Diesel" value="Diesel" />
        <Picker.Item label="Eletrico" value="Eletrico" />
        <Picker.Item label="Híbrido" value="Hibrido" />
        <Picker.Item label="GNV" value="GNV" />
      </Picker>
      </View>

{/* Tipo de Câmbio do Veículo */}
      <Text style={styles.label}>Tipo de Câmbio:</Text>
      <View style={styles.pickerLabel}>
      <Picker
        selectedValue={transmission}
        style={styles.picker}
        onValueChange={(itemValue, itemIndex) => setTransmission(itemValue)}
        mode={'dropdown'}
      >
        <Picker.Item label="Manual" value="Manual" />
        <Picker.Item label="Automatico" value="Automatico" />
        <Picker.Item label="CVT" value="CVT" />
        <Picker.Item label="Eletrico" value="Eletrico" />
      </Picker>
      </View>

{/* Motor do Veículo */}
      <Text style={styles.label}>Motor do veículo:</Text>
      <TextInput
        style={styles.input}
        value={engine}
        onChangeText={setEngine}
        placeholder="Motor"
      />

{/* Ano de Fabricação do Veículo */}
      <View style={styles.linha} alignItems={'center'}>
        <Text style={styles.label}>Ano de Fabricação:  </Text>
        {vehicle.manufactureYear && (
          <Text style={styles.text}>{vehicle.manufactureYear || '(Não informado)'}</Text>
        )}
        {!vehicle.manufactureYear && (
        <TextInput
          style={styles.shortInput}
          value={manufactureYear}
          onChangeText={setManufactureYear}
          placeholder="(Opcional)"
          keyboardType="numeric"
          maxLength={4}
        />
      )}
      </View>
      

{/* Placa do Veículo */}
      <View style={styles.linha} alignItems={'center'}>
        <Text style={styles.label}>Placa do Veículo:  </Text>
        {vehicle.licensePlate ? (
          <Text style={styles.text}>{vehicle.licensePlate || '(Não informado)'}</Text>
        ) : (
        <TextInput
          style={styles.shortInput}
          value={licensePlate}
          onChangeText={setLicensePlate}
          placeholder="(Opcional)"
          maxLength={7}
        />
      )}
      </View>

{/* Quilometragem do Veículo */}
      <View style={styles.linha} alignItems={'center'} borderBottomWidth={0}>
        <Text style={styles.label}>Quilometragem Atual:  </Text>
        <Text style={styles.text}>{totalMileage}</Text>
      </View>
      <TextInput
        style={styles.input}
        value={additionalMileage.toString()}
        onChangeText={setAdditionalMileage}
        placeholder="Quilometragem a ser Acrescentada"
        keyboardType="numeric"
      />



      <TouchableOpacity style={styles.addButton} onPress={handleUpdateVehicle}>
        <Text style={styles.addButtonText}>Atualizar Veículo</Text>
      </TouchableOpacity>
    </ScrollView>
 );
};

const styles = StyleSheet.create({
    container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingVertical: 20,
    backgroundColor: '#F9F9F9',
    },

    linha: {
      flexDirection: 'row',
      borderBottomColor: '#6A6A6A',
      borderBottomWidth: 1,
      paddingTop: 10,
    },

    label: {
        color: '#000000',
        fontSize: 20,
        fontWeight: '500',
    },

    input: {
      color: '#6A6A6A',
      backgroundColor: '#6A6A6A22',
      borderColor: '#000000',
      borderWidth: 1,
      borderRadius: 8,
      fontSize: 18,
      height: 40,
      paddingHorizontal: 10,
      marginBottom: 10,
    },
    shortInput: {
      color: '#6A6A6A',
      backgroundColor: '#6A6A6A22',
      borderColor: '#000000',
      borderWidth: 1,
      borderRadius: 8,
      fontSize: 18,
      height: 40,
      paddingHorizontal: 10,
      marginBottom: 4,
    },
  

    text: {
      color: '#6A6A6A',
      fontSize: 18,
      paddingHorizontal: 10,
      textAlignVertical: 'center',
    },

    colorButton: {
      borderColor: '#000000',
      borderWidth: 1,
      borderRadius: 2,
      width: 20,
      height: 20,
      marginLeft: 10,
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
      borderColor: '#6A6A6A99',
      borderWidth: 1,
      fontSize: 18,
      height: 40,
      marginBottom: 8,
      paddingHorizontal: 10,
    },

    addButton: {
        backgroundColor: '#009F4D',
        padding: 20,
        borderRadius: 12,
        alignItems: 'center',
        marginTop: 10,
        marginBottom: 80,
    },
    addButtonText: {
        color: '#FFFFFF',
        fontSize: 20,
        fontWeight: 'bold',
    },
  });

export default EditVehiclePage;