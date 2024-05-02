import { React, useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView, Alert } from 'react-native';
import {Picker} from '@react-native-picker/picker';

import AsyncStorage from '@react-native-async-storage/async-storage';
import { insertVehicle, fetchUserVehicles } from '../../database/VehiclesDatabase';

const NewVehiclePage = ({ navigation }) => {
  const [name, setName] = useState('Carro');
  const [brands, setBrands] = useState([]);
  const [brand, setBrand] = useState('');
  const [model, setModel] = useState('');
  const [version, setVersion] = useState('');
  const [color, setColor] = useState('');
  const [manufactureYear, setManufactureYear] = useState('');
  const [licensePlate, setLicensePlate] = useState('');
  const [fuelType, setFuelType] = useState('');
  const [transmission, setTransmission] = useState('');
  const [engine, setEngine] = useState('');
  const [mileage, setMileage] = useState('');
  const [user, setUser] = useState('');

  {/* Carregamentos */}
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const userData = await AsyncStorage.getItem('@user');
        if (userData !== '') {
          setUser(JSON.parse(userData));
        }
      } catch (error) {
        console.error('Erro ao recuperar os dados do usuário:', error);
      }
    };
    fetchUser();
    fetchBrands();
 }, []);

  {/* Requisição da API */}
  {/* Documentação da Api https://deividfortuna.github.io/fipe/v2/#tag/Fipe/operation/GetFipeInfo */}
  const fetchBrands = async () => {
    try {
      const response = await fetch('https://fipe.parallelum.com.br/api/v2/cars/brands');
      const data = await response.json();
      setBrands(data);
    } catch (error) {
      console.error('Error ao Encontrar Marcas: ', error);
    }
  };

  {/* Salvar */}
  const handleAddVehicle = async  () => {
    {/* Verificação dos campos obrigatórios */}
    if (!name || !brand || !model || !version || !color || !fuelType || !transmission || !engine || !mileage) {
      Alert.alert(
        'Campos não preenchidos',
        'Por favor, preencha todos os campos obrigatórios.',
        [
          {
            text: 'OK', onPress: () => console.log('OK Pressed'), style: 'cancel',
          },
        ],
        { cancelable: false }
      );
      return;
   }

   {/* Verificação do Limite de Veículos */}
   const vehicles = await fetchUserVehicles(user.id);
    if (vehicles.length >= 8) {
        Alert.alert(
          'Limite Máximo de Veículos Atingido',
          'Você atingiu o máximo de 8 veículos.',
          [
            {
              text: 'OK', onPress: () => console.log('OK Pressed'), style: 'cancel',
            },
          ],
          { cancelable: false }
        );
        return;
    }

    {/* Inserção dos Dados de Veículo */}
    insertVehicle({ name, brand, model, version, color, manufactureYear, licensePlate, fuelType, transmission, engine, mileage }, user.id);
    console.log( 'Novo veículo adicionado:', ', Marca:', brand, ', Modelo:', model, ', Versão:', version, ', Cor:', color, ', Ano de fabricação:', manufactureYear, ', Placa:', licensePlate, ', Combustivel:', fuelType, ', Transmissão:', transmission, ', Motor:', engine, ', Quilometragem:', mileage );
    navigation.navigate('SelectNavigator');
    Alert.alert( 'Veículo Salvo com Sucesso!' );
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
        return '#6A6A6A22';
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
      <Text style={styles.label}>Marca do veículo:</Text>
      <View style={styles.pickerLabel}>
      <Picker
        selectedValue={brand}
        style={styles.picker}
        onValueChange={(itemValue, itemIndex) => setBrand(itemValue)}
        mode={'dropdown'}
      >
        <Picker.Item label="Selecione a marca" value="" />
        {brands.map((brand) => (
          <Picker.Item key={brand.code} label={brand.name} value={brand.name} />
        ))}
      </Picker>
      </View>

      {/* Modelo do Veículo */}
      <Text style={styles.label}>Modelo do Veículo:</Text>
      <TextInput
        style={styles.input}
        value={model}
        onChangeText={setModel}
        placeholder=" "
      />

      {/* Versão do Veículo */}
      <Text style={styles.label}>Versão do veículo:</Text>
      <TextInput
        style={styles.input}
        value={version}
        onChangeText={setVersion}
        placeholder=" "
      />

      {/* Cor do Veículo */}
      <View style={styles.linha}>
        <Text style={styles.label}>Cor do veículo:</Text>
        <View style={[styles.colorButton, { backgroundColor: getColorCode(color) }]}/>
      </View>
      <View style={styles.pickerLabel}>
        <Picker
          selectedValue={color}
          style={styles.picker}
          onValueChange={(itemValue, itemIndex) => setColor(itemValue)}
          mode={'dropdown'}
        >
          <Picker.Item label="Selecione a cor" value=""/>
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
          <Picker.Item label="Selecione o tipo de combustível" value=""/>
          <Picker.Item label="Gasolina" value="Gasolina" />
          <Picker.Item label="Etanol" value="Etanol" />
          <Picker.Item label="Flex (Gasolina e Etanol)" value="Flex" />
          <Picker.Item label="Diesel" value="Diesel" />
          <Picker.Item label="Eletrico" value="Eletrico" />
          <Picker.Item label="Híbrido" value="Híbrido" />
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
          <Picker.Item label="Selecione o tipo de câmbio" value=""/>
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
        placeholder="ex: 1.0"
      />

      {/* Ano de Fabricação do Veículo */}
      <Text style={styles.label}>Ano de Fabricação:</Text>
      <TextInput
        style={styles.input}
        value={manufactureYear}
        onChangeText={setManufactureYear}
        placeholder="(Opcional)"
        keyboardType="numeric"
        maxLength={4}
      />

      {/* Placa do Veículo */}
      <Text style={styles.label}>Placa do Veículo:</Text>
      <TextInput
        style={styles.input}
        value={licensePlate}
        onChangeText={setLicensePlate}
        placeholder="(Opcional)"
        maxLength={7}
      />

      {/* Quilometragem do Veículo */}
      <Text style={styles.label}>Quilometragem:</Text>
      <TextInput
        style={styles.input}
        value={mileage}
        onChangeText={setMileage}
        placeholder="KM"
        keyboardType="numeric"
      />

      {/* Botão de Salvar */}
      <TouchableOpacity style={styles.addButton} onPress={handleAddVehicle}>
        <Text style={styles.addButtonText}>Adicionar Veículo</Text>
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
    paddingTop: 10,
    alignItems: 'center',
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

  colorButton: {
    borderColor: '#000000',
    borderWidth: 1,
    borderRadius: 2,
    width: 20,
    height: 20,
    marginLeft: 10,
  },

  addButton: {
    backgroundColor: '#009F4D',
    padding: 20,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 60,
  },
  addButtonText: {
    color: '#FFFFFF',
    fontSize: 20,
    fontWeight: 'bold',
  },
});

export default NewVehiclePage;
