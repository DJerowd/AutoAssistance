import { React, useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';

const NewVehiclePage = ({ navigation }) => {
  const [name, setName] = useState('');
  const [brand, setBrand] = useState('');
  const [model, setModel] = useState('');
  const [version, setVersion] = useState('');
  const [color, setColor] = useState('');
  const [manufactureYear, setManufactureYear] = useState('');
  const [licensePlate, setLicensePlate] = useState('');
  const [transmissionType, setTransmissionType] = useState('');
  const [engine, setEngine] = useState('');
  const [mileage, setMileage] = useState('');

  const handleAddVehicle = () => {
    navigation.goBack();
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
    <ScrollView style={styles.container}
    sc>
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

      <Text style={styles.label}>Cor do veículo:</Text>
      <TextInput
        style={styles.input}
        value={color}
        onChangeText={setColor}
        placeholder="Cor"
      />

      <Text style={styles.label}>Ano de Fabricação:</Text>
      <TextInput
        style={styles.input}
        value={manufactureYear}
        onChangeText={setManufactureYear}
        placeholder="XX/XX/XXXX"
      />

      <Text style={styles.label}>Placa do Veículo:</Text>
      <TextInput
        style={styles.input}
        value={licensePlate}
        onChangeText={setLicensePlate}
        placeholder="Placa (Opcional)"
      />

      <Text style={styles.label}>Tipo de Câmbio:</Text>
      <TextInput
        style={styles.input}
        value={transmissionType}
        onChangeText={setTransmissionType}
        placeholder="Câmbio"
      />

      <Text style={styles.label}>Motor do veículo:</Text>
      <TextInput
        style={styles.input}
        value={engine}
        onChangeText={setEngine}
        placeholder="Motor"
      />

      <Text style={styles.label}>Quilometragem:</Text>
      <TextInput
        style={styles.input}
        value={mileage}
        onChangeText={setMileage}
        placeholder="KM"
      />


      <TouchableOpacity style={styles.addButton} onPress={handleAddVehicle}>
        <Text 
        style={styles.addButtonText}
        // onPress={() => handleAdd()}
        >
          Adicionar Veículo
        </Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingBottom: 0,
    paddingHorizontal: 30,
    paddingVertical: 20,
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

  addButton: {
    backgroundColor: '#009F4D',
    padding: 20,
    borderRadius: 12,
    alignItems: 'center',
    marginBottom: 40,
  },
  addButtonText: {
    color: '#FFFFFF',
    fontSize: 20,
    fontWeight: 'bold',
  },
});

export default NewVehiclePage;
