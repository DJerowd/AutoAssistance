import { React, useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView, Alert } from 'react-native';
import {Picker} from '@react-native-picker/picker';

const NewVehiclePage = ({ navigation }) => {
  const [name, setName] = useState('');
  const [brand, setBrand] = useState('');
  const [model, setModel] = useState('');
  const [version, setVersion] = useState('');
  const [color, setColor] = useState('');
  const [manufactureYear, setManufactureYear] = useState('');
  const [licensePlate, setLicensePlate] = useState('');
  const [fuelType, setFuelType] = useState('');
  const [transmissionType, setTransmissionType] = useState('');
  const [engine, setEngine] = useState('');
  const [mileage, setMileage] = useState('');

  const handleAddVehicle = () => {
    console.log(
      'Novo veículo adicionado:',
      ', Marca:', brand,
      ', Modelo:', model,
      ', Versão:', version,
      ', Cor:', color,
      ', Ano de fabricação:', manufactureYear,
      ', Placa:', licensePlate,
      ', Combustivel:', fuelType,
      ', Transmissão:', transmissionType,
      ', Motor:', engine,
      ', Quilometragem:', mileage
    );

    navigation.goBack();
    Alert.alert(
      'Veículo Salvo com Sucesso!'
    );
  };

//   const handleAdd = () => {
//     const newVehicle = {
// // Gera um ID único para o novo veículo
//       id: (Math.random() * 1000000).toString(),
// // Nome padrão para o novo veículo
//       name: `Carro ${vehicles.length + 1}`, 
//     };
// // Adiciona o novo veículo à lista de veículos
//     setVehicles([...vehicles, newVehicle]);
//   };

  return (
    <ScrollView style={styles.container}>
      
      <Text style={styles.label}>Nome do veículo:</Text>
      <TextInput
        style={styles.input}
        value={name}
        onChangeText={setName}
        placeholder="Carro"
      />


      <Text style={styles.label}>Marca do veículo:</Text>
      <TextInput
        style={styles.input}
        value={brand}
        onChangeText={setBrand}
        placeholder="Marca"
      />


      <Text style={styles.label}>Modelo do veículo:</Text>
      <TextInput
        style={styles.input}
        value={model}
        onChangeText={setModel}
        placeholder="Modelo"
      />


      <Text style={styles.label}>Versão do veículo:</Text>
      <TextInput
        style={styles.input}
        value={version}
        onChangeText={setVersion}
        placeholder="Versão"
      />


      <View style={styles.linha}>
      <Text style={styles.label}>Cor do veículo:</Text>
      <View
        style={[styles.colorButton, { backgroundColor: color }]}
      />
      </View>
      <Picker
        selectedValue={color}
        style={styles.picker}
        onValueChange={(itemValue, itemIndex) => setColor(itemValue)}
        mode={'dropdown'}
      >
        <Picker.Item label="Cor" />
        <Picker.Item label="_____________________________________" />
        <Picker.Item label="Preto" value="#000000" />
        <Picker.Item label="Cinza" value="#4A4A4A" />
        <Picker.Item label="Prata" value="#C3BFBF" />
        <Picker.Item label="Branco" value="#FFFFFF" />
        <Picker.Item label="Vermelho" value="#FF0000" />
        <Picker.Item label="Azul" value="#2400FF" />
        <Picker.Item label="Verde" value="#21A400" />
        <Picker.Item label="Amarelo" value="#FAFF00" />
        <Picker.Item label="Laranja" value="#FF9900" />
        <Picker.Item label="Marrom" value="#523100" />
        <Picker.Item label="Rosa" value="#FF00D6" />
      </Picker>


      <Text style={styles.label}>Tipo de Combustível:</Text>
      <Picker
        selectedValue={fuelType}
        style={styles.picker}
        onValueChange={(itemValue, itemIndex) => setFuelType(itemValue)}
        mode={'dropdown'}
      >
        <Picker.Item label="Combustível" />
        <Picker.Item label="_____________________________________" />
        <Picker.Item label="Gasolina" value="gasolina" />
        <Picker.Item label="Etanol" value="etanol" />
        <Picker.Item label="Flex (Gasolina e Etanol)" value="flex" />
        <Picker.Item label="Diesel" value="diesel" />
        <Picker.Item label="Eletrico" value="eletrico" />
        <Picker.Item label="Híbrido" value="hibrido" />
        <Picker.Item label="GNV" value="gnv" />
      </Picker>


      <Text style={styles.label}>Tipo de Câmbio:</Text>
      <Picker
        selectedValue={transmissionType}
        style={styles.picker}
        onValueChange={(itemValue, itemIndex) => setTransmissionType(itemValue)}
        mode={'dropdown'}
      >
        <Picker.Item label="Câmbio" />
        <Picker.Item label="_____________________________________" />
        <Picker.Item label="Manual" value="manual" />
        <Picker.Item label="Automatico" value="automatico" />
        <Picker.Item label="CVT" value="cvt" />
        <Picker.Item label="Eletrico" value="eletrico" />
      </Picker>


      <Text style={styles.label}>Motor do veículo:</Text>
      <TextInput
        style={styles.input}
        value={engine}
        onChangeText={setEngine}
        placeholder="Motor"
      />


      <Text style={styles.label}>Ano de Fabricação:</Text>
      <TextInput
        style={styles.input}
        value={manufactureYear}
        onChangeText={setManufactureYear}
        placeholder="Ano"
        keyboardType="numeric"
      />


      <Text style={styles.label}>Placa do Veículo:</Text>
      <TextInput
        style={styles.input}
        value={licensePlate}
        onChangeText={setLicensePlate}
        placeholder="Placa (Opcional)"
        maxLength={7}
      />


      <Text style={styles.label}>Quilometragem:</Text>
      <TextInput
        style={styles.input}
        value={mileage}
        onChangeText={setMileage}
        placeholder="KM"
        keyboardType="numeric"
      />


      <TouchableOpacity style={styles.addButton} onPress={handleAddVehicle}>
        <Text style={styles.addButtonText}>Adicionar Veículo</Text>
      </TouchableOpacity>
      
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 30,
    paddingVertical: 20,
    backgroundColor: '#F9F9F9',
  },

  linha: {
    flexDirection: 'row',
  },

  label: {
    color: '#6A6A6A',
    fontSize: 20,
    fontWeight: 'bold',
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

  colorButton: {
    borderColor: '#6A6A6A',
    borderWidth: 2,
    borderRadius: 20,
    width: '56%',
    height: 20,
    marginLeft: 10,
    alignSelf: 'center',
  },
  picker: {
    color: '#6A6A6A',
    borderBottomColor: '#6A6A6A99',
    borderBottomWidth: 2,
    fontSize: 18,
    height: 40,
    marginBottom: 20,
    paddingHorizontal: 10,
  },

  addButton: {
    backgroundColor: '#009F4D',
    padding: 20,
    borderRadius: 12,
    alignItems: 'center',
    marginBottom: 100,
  },
  addButtonText: {
    color: '#FFFFFF',
    fontSize: 20,
    fontWeight: 'bold',
  },
});

export default NewVehiclePage;
