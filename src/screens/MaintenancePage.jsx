import { React, useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import IconMCI from 'react-native-vector-icons/MaterialCommunityIcons';

const MaintencePage = ({ navigation }) => {
    const [notes, setNotes] = useState([
        { id: '1', name: 'Lembrete 1' },
    ]);

    const renderItem = ({ item }) => (
        <TouchableOpacity style={styles.item}>

          <View style={styles.coluna}>
            <IconMCI 
                name="bell" 
                color={'#6A6A6A'} 
                size={40} 
            />
          </View>

          <View style={styles.coluna}>
            <Text style={styles.itemText}>{item.name}</Text>
            <Text style={styles.itemText}>=========================</Text>
          </View>

        </TouchableOpacity>
      );

    const handleItemPress = (item) => {
        console.log('Item Selecionado:', item);
        navigation.navigate(item);
    };

  return (
    <View style={styles.container}>
        
      <FlatList
        data={notes}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
      />

      <TouchableOpacity 
        style={styles.addButton} 
        onPress={() => handleItemPress('NewMaintencePage')}
        >
        <Text style={styles.addButtonText}>Adicionar Novo Veículo +</Text>
      </TouchableOpacity>

    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9F9F9',
  },

  coluna: {
    justifyContent: 'center',
    paddingHorizontal: 10,
  },

  item: {
    borderColor: '#6A6A6A',
    borderWidth: 1,
    padding: 10,
    flexDirection: 'row',
  },
  itemText: {
    color: '#6A6A6A',
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
  },

  addButton: {
    backgroundColor: '#009F4D',
    padding: 20,
    marginVertical: 30,
    marginHorizontal: 30,
    borderRadius: 12,
    alignItems: 'center',
  },
  addButtonText: {
    color: '#FFFFFF',
    fontSize: 20,
    fontWeight: 'bold',
  },
});

export default MaintencePage;
