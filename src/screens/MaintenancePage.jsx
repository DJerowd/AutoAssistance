import { React, useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import IconMCI from 'react-native-vector-icons/MaterialCommunityIcons';

const MaintencePage = ({ navigation }) => {
    const [notes, setNotes] = useState([
        { id: '1', name: 'Lembrete 1', type: 'Pneus', isRepeat: true, isKilometersEnabled: true, isMonthsEnabled: true, kilometersEnd: 100, kilometers: 80, monthsEnd: 24, months: 5, description: 'abcdefghijklmnopqrstuvwxyzabcdefghijklmnopqrstuvwxyzabcdefghijklmnopqrstuvwxyzabcdefghijklmnopqrstuvwxyzabcdefghijklmnopqrstuvwxyzabcdefghijklmnopqrstuvwxyzabcdefghijklmnopqrstuvwxyzabcdefghijklmnopqrstuvwxyzabcdefghijklmnopqrstuvwxyzabcdefghijklmnopqrstuvwxyzabcdefghijklmnopqrstuvwxyzabcdefghijklmnopqrstuvwxyzabcdefghijklmnopqrstuvwxyzabcdefghijklmnopqrstuvwxyz' },
        { id: '2', name: 'Lembrete 2', type: 'Filtro de Ar', isRepeat: true, isKilometersEnabled: true, isMonthsEnabled: false, kilometersEnd: 100, kilometers: 60, description: 'abcdefghijklmnopqrstuvwxyz' },
        { id: '3', name: 'Lembrete 3', type: 'Filtro de Combustível', isRepeat: true, isKilometersEnabled: false, isMonthsEnabled: true, monthsEnd: 12, months: 6, description: 'abcdefghijklmnopqrstuvwxyz'  },
        { id: '4', name: 'Lembrete 4', type: 'Fluído de Freio', isRepeat: false, isKilometersEnabled: false, isMonthsEnabled: false, description: 'abcdefghijklmnopqrstuvwxyz'  },
        { id: '5', name: 'Lembrete 5', type: 'Bateria', isRepeat: true, isKilometersEnabled: true, isMonthsEnabled: true, kilometersEnd: 100, kilometers: 1, monthsEnd: 12, months: 1, description: 'abcdefghijklmnopqrstuvwxyz' },
        { id: '6', name: 'Lembrete 6', type: 'Correia', isRepeat: true, isKilometersEnabled: true, isMonthsEnabled: true, kilometersEnd: 100, kilometers: 50, monthsEnd: 12, months: 7, description: 'abcdefghijklmnopqrstuvwxyz' },
        { id: '7', name: 'Lembrete 7', type: 'Suspensão', isRepeat: true, isKilometersEnabled: true, isMonthsEnabled: true, kilometersEnd: 100, kilometers: 100, monthsEnd: 12, months: 4, description: 'abcdefghijklmnopqrstuvwxyz' },
        { id: '8', name: 'Lembrete 8', type: 'Amortecedores', isRepeat: true, isKilometersEnabled: true, isMonthsEnabled: true, kilometersEnd: 100, kilometers: 10, monthsEnd: 12, months: 5, description: 'abcdefghijklmnopqrstuvwxyz' },
        { id: '9', name: 'Lembrete 9', type: 'Revisão', isRepeat: true, isKilometersEnabled: true, isMonthsEnabled: true, kilometersEnd: 100, kilometers: 80, monthsEnd: 10, months: 7, description: 'abcdefghijklmnopqrstuvwxyz' },
        { id: '10', name: 'Lembrete 10', type: 'Troca de Óleo', isRepeat: true, isKilometersEnabled: true, isMonthsEnabled: true, kilometersEnd: 100, kilometers: 60, monthsEnd: 12, months: 8, description: 'abcdefghijklmnopqrstuvwxyz' },
    ]);

    const calculateKilometersProgress = (item) => {
      if (item.isKilometersEnabled) {
          return (3.2 *(item.kilometers / (item.kilometersEnd / 100)));
      } else {
          return 0;
      }
    };

    const calculateMonthsProgress = (item) => {
      if (item.isMonthsEnabled) {
          return (3.2 *(item.months / (item.monthsEnd / 100)));
      } else {
          return 0;
      }
    };

    const renderItem = ({ item }) => (
        <TouchableOpacity 
          style={styles.item}
          onPress={() => handleItemDetailsPress(item)}
        >

          {(item.isKilometersEnabled || item.isMonthsEnabled) && (
          <IconMCI 
            name="bell" 
            style={styles.icon}
            size={30} 
          />
          )}

          {(!item.isKilometersEnabled && !item.isMonthsEnabled) && (
          <IconMCI 
            name="alert-outline" 
            color={'#FF9900'}
            size={30} 
          />
          )}
          
          <View style={styles.coluna}>
            <View style={styles.linha}>
              <Text style={styles.itemText}>{item.name} - {item.type}</Text>

              {((item.months == item.monthsEnd && !item.monthsEnd == '') || (item.kilometers == item.kilometersEnd && !item.kilometersEnd == '')) && (
                <IconMCI 
                  name="alert" 
                  color={'#DD0000'}
                  size={20} 
                  marginHorizontal={6}
                />
              )}
            </View>

            {item.isKilometersEnabled && (
            <View>

              <View style={styles.linha} justifyContent={'space-between'}>
                <Text style={styles.text}>
                  {item.isKilometersEnabled ? `${item.kilometers} KM ` : ''}
                </Text>

                <Text style={styles.text}>
                  {item.isKilometersEnabled ? `${item.kilometersEnd} KM ` : ''}
                </Text>
              </View>

              <View style={styles.progressBarTotal}><View style={styles.progressBar} width={calculateKilometersProgress(item)}></View></View>
            </View>
            )}

            {item.isMonthsEnabled && (
            <View>

              <View style={styles.linha} justifyContent={'space-between'}>
                <Text style={styles.text}>
                  {item.isMonthsEnabled ? `${item.months} Meses ` : ''}
                </Text>

                <Text style={styles.text}>
                  {item.isMonthsEnabled ? `${item.monthsEnd} Meses ` : ''}
                </Text>
              </View>

              <View style={styles.progressBarTotal}><View style={styles.progressBar} width={calculateMonthsProgress(item)}></View></View>
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
        borderBottomWidth={4}
        borderBottomColor={'#6A6A6A11'}
      ></FlatList>

      <TouchableOpacity 
        style={styles.addButton} 
        onPress={() => handleItemPress('NewMaintencePage')}
        >
        <Text style={styles.addButtonText}>Adicionar Novo Lembrete +</Text>
      </TouchableOpacity>

    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9F9F9',
  },

  linha: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  coluna: {
    paddingHorizontal: 6,
  },

  icon: {
    backgroundColor: '#6A6A6A99',
    color: '#6A6A6A',
    borderRadius: 30,
    padding: 6,
  },

  item: {
    borderColor: '#6A6A6A11',
    borderWidth: 2,
    paddingVertical: 2,
    paddingBottom: 6,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    color: '#6A6A6A',
    fontSize: 12,
    fontWeight: 'bold',
    alignSelf: 'flex-end',
  },
  itemText: {
    color: '#6A6A6A',
    fontSize: 18,
    fontWeight: 'bold',
  },

  progressBar: {
    backgroundColor: '#009F4D',
    height: 10,
    width: '10%',
  },
  progressBarTotal: {
    backgroundColor: '#6A6A6A99',
    width: 320,
    height: 10,
  },

  addButton: {
    backgroundColor: '#009F4D',
    padding: 20,
    marginVertical: 10,
    marginHorizontal: 30,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
  },
  addButtonText: {
    color: '#FFFFFF',
    fontSize: 20,
    fontWeight: 'bold',
  },
});

export default MaintencePage;
