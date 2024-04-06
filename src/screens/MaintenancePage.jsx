import { React, useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import IconMCI from 'react-native-vector-icons/MaterialCommunityIcons';
import { MaintenanceDB } from '../components/MaintenanceDB';

const MaintencePage = ({ navigation }) => {
    const {notes, setNotes} = MaintenanceDB();

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
