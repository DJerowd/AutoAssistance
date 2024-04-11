import { React, useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView, Alert } from 'react-native';
import {Picker} from '@react-native-picker/picker';

const NewVehiclePage = ({ navigation }) => {
  const [name, setName] = useState('');
  const [brands, setBrands] = useState([]);
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

  {/* Requisição da API */}
  {/* Documentação da Api https://deividfortuna.github.io/fipe/v2/#tag/Fipe/operation/GetFipeInfo */}
  useEffect(() => {
    fetchBrands();
  }, []);
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
  const handleAddVehicle = () => {
{/* Alerta ao Tentar Salvar sem Preencher os Campos Necessários */}
    if (!brand || !model || !color || !mileage) {
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

{/* Alerta de Sucesso ao Salvar */}
    Alert.alert(
      'Veículo Salvo com Sucesso!'
    );
  };

{/* Cancelar */}
  const handleCancelReminder = () => {
    navigation.goBack();
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

{/* Adicionar Novo Veículo */}  
  const handleAdd = () => {
//     const newVehicle = {
//       id: (Math.random() * 1000000).toString(),
//       name: `Carro ${vehicles.length + 1}`, 
//     };
//     setVehicles([...vehicles, newVehicle]);
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
      <Picker
        selectedValue={brand}
        style={styles.picker}
        onValueChange={(itemValue, itemIndex) => setBrand(itemValue)}
        mode={'dropdown'}
      >
        <Picker.Item label="Selecione a marca" value="" />
        <Picker.Item label="_____________________________________" />
        {brands.map((brand) => (
          <Picker.Item key={brand.code} label={brand.name} value={brand.name} />
        ))}
      </Picker>

{/* Modelo do Veículo */}
      <TextInput
        style={styles.input}
        value={model}
        onChangeText={setModel}
        placeholder="Modelo"
      />

{/* Versão do Veículo */}
      <Text style={styles.label}>Versão do veículo:</Text>
      <TextInput
        style={styles.input}
        value={version}
        onChangeText={setVersion}
        placeholder="Versão"
      />

{/* Cor do Veículo */}
      <View style={styles.linha} justifyContent={'space-between'}>
      <Text style={styles.label}>Cor do veículo:</Text>
      <View
        style={[styles.colorButton, { backgroundColor: getColorCode(color) }]}
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

{/* Tipo de Combustível do Veículo */}
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

{/* Tipo de Câmbio do Veículo */}
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

{/* Motor do Veículo */}
      <Text style={styles.label}>Motor do veículo:</Text>
      <TextInput
        style={styles.input}
        value={engine}
        onChangeText={setEngine}
        placeholder="Motor"
      />

{/* Ano de Fabricação do Veículo */}
      <Text style={styles.label}>Ano de Fabricação:</Text>
      <TextInput
        style={styles.input}
        value={manufactureYear}
        onChangeText={setManufactureYear}
        placeholder="Ano"
        keyboardType="numeric"
      />

{/* Placa do Veículo */}
      <Text style={styles.label}>Placa do Veículo:</Text>
      <TextInput
        style={styles.input}
        value={licensePlate}
        onChangeText={setLicensePlate}
        placeholder="Placa (Opcional)"
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
    borderColor: '#6A6A6A99',
    borderWidth: 1,
    fontSize: 18,
    height: 40,
    marginBottom: 20,
    paddingHorizontal: 10,
  },

  colorButton: {
    borderColor: '#6A6A6A',
    borderWidth: 1,
    borderRadius: 10,
    width: '50%',
    height: 20,
    marginLeft: 10,
    alignSelf: 'center',
  },
  picker: {
    color: '#6A6A6A',
    borderColor: '#6A6A6A99',
    borderWidth: 1,
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
