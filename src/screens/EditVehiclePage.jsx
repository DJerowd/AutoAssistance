import {React, useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView, Alert } from 'react-native';
import {Picker} from '@react-native-picker/picker';

const EditVehiclePage = ({ navigation, route }) => {
 const { vehicle } = route.params;
 const [name, setName] = useState(vehicle.name);
 const [brands, setBrands] = useState([]);
 const [brand, setBrand] = useState(vehicle.brand);
 const [model, setModel] = useState(vehicle.model);
 const [version, setVersion] = useState(vehicle.version);
 const [color, setColor] = useState(vehicle.color);
 const [manufactureYear, setManufactureYear] = useState(vehicle.manufactureYear);
 const [licensePlate, setLicensePlate] = useState(vehicle.licensePlate);
 const [fuelType, setFuelType] = useState(vehicle.fuelType);
 const [transmissionType, setTransmissionType] = useState(vehicle.transmissionType);
 const [engine, setEngine] = useState(vehicle.engine);
 const [mileage, setMileage] = useState(vehicle.mileage);

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
 const handleUpdateVehicle = () => {
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

    // Aqui você deve implementar a lógica para atualizar o veículo no seu backend ou estado global
    console.log('Veículo atualizado:', vehie.id, name, brand, model, version, color, manufactureYear, licensePlate, fuelType, transmissionType, engine, mileage);
    navigation.goBack();
    Alert.alert(
        'Veículo Atualizado com Sucesso!'
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
      <Text style={styles.label}>Marca do veículo:</Text>
      <Text style={styles.text}>{vehicle.brand}</Text>

{/* Modelo do Veículo */}
      <Text style={styles.label}>Modelo do Veículo:</Text>
      <Text style={styles.text}>{vehicle.model}</Text>

{/* Versão do Veículo */}
      <Text style={styles.label}>Versão do veículo:</Text>
      <Text style={styles.text}>{vehicle.version}</Text>


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
        <Picker.Item label="Cor" value="" />
        <Picker.Item label="_____________________________________" value="" />
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
      <Text style={styles.text}>{vehicle.manufactureYear}</Text>

{/* Placa do Veículo */}
      <Text style={styles.label}>Placa do Veículo:</Text>
      <Text style={styles.text}>{vehicle.licensePlate}</Text>

{/* Quilometragem do Veículo */}
      <Text style={styles.label}>Quilometragem:</Text>
      <TextInput
        style={styles.input}
        value={mileage}
        onChangeText={setMileage}
        placeholder="KM"
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

    text: {
      color: '#6A6A6A',
      borderBottomColor: '#6A6A6A99',
      borderBottomWidth: 2,
      marginBottom: 20,
      marginTop: 10,
      fontSize: 18,
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

export default EditVehiclePage;