import { React, useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import IconMCI from 'react-native-vector-icons/MaterialCommunityIcons';

const MaintencePage = ({ navigation }) => {
    const [notes, setNotes] = useState([
        { id: '1', name: 'Lembrete 1', type: 'Pneus', isRepeat: true, isKilometersEnabled: true, isMonthsEnabled: true, kilometers: 100, months: 10, description: 'abcdefghijklmnopqrstuvwxyz' },
        { id: '2', name: 'Lembrete 2', type: 'Pneus', isRepeat: true, isKilometersEnabled: true, isMonthsEnabled: false, kilometers: 100, description: 'abcdefghijklmnopqrstuvwxyz' },
        { id: '3', name: 'Lembrete 3', type: 'Pneus', isRepeat: true, isKilometersEnabled: false, isMonthsEnabled: true, months: 10, description: 'abcdefghijklmnopqrstuvwxyz'  },
        { id: '4', name: 'Lembrete 4', type: 'Pneus', isRepeat: false, isKilometersEnabled: false, isMonthsEnabled: false, description: 'abcdefghijklmnopqrstuvwxyz'  },
        { id: '5', name: 'Lembrete 5' },
        { id: '6', name: 'Lembrete 6' },
        { id: '7', name: 'Lembrete 7' },
        { id: '8', name: 'Lembrete 8' },
        { id: '9', name: 'Lembrete 9' },
        { id: '10', name: 'Lembrete 10' },
    ]);

    const renderItem = ({ item }) => (
        <TouchableOpacity 
          style={styles.item}
          onPress={() => handleItemDetailsPress(item)}
        >

          <View style={styles.coluna}>
            <IconMCI 
                name="bell" 
                color={'#6A6A6A'} 
                size={40} 
            />
          </View>

          <View style={styles.coluna}>
            <Text style={styles.itemText}>{item.name}</Text>

            {item.isKilometersEnabled && (
            <View>
              <Text style={styles.text}>
                {item.isKilometersEnabled ? `${item.kilometers} KM ` : ''}
              </Text>
              <Text style={styles.itemText}>=========================</Text>
            </View>
            )}

            {item.isMonthsEnabled && (
            <View>
              <Text style={styles.text}>
                {item.isMonthsEnabled ? `${item.months} Meses ` : ''}
              </Text>
              <Text style={styles.itemText}>=========================</Text>
            </View>
            )}
          </View>

        </TouchableOpacity>
      );

    const handleItemDetailsPress = (item) => {
      console.log('Item Selecionado:', item);
      navigation.navigate('MaintenanceDetailsPage', { maintenance: item });
    };

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
        <Text style={styles.addButtonText}>+</Text>
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
    padding: 4,
    flexDirection: 'row',
  },
  text: {
    color: '#6A6A6A',
    fontSize: 12,
    fontWeight: 'bold',
    alignSelf: 'flex-end',
  },
  itemText: {
    color: '#6A6A6A',
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
  },

  addButton: {
    backgroundColor: '#009F4D',
    width: 60,
    height: 60,
    marginVertical: 30,
    marginHorizontal: 30,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'flex-end',
  },
  addButtonText: {
    color: '#FFFFFF',
    fontSize: 30,
    fontWeight: 'bold',
  },
});

export default MaintencePage;
