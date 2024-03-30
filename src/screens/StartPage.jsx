import { React } from 'react';
import { Text, View, TouchableOpacity, StyleSheet, Image } from 'react-native';

const StartPage = ({ navigation }) => {

  const handleItemPress = (item) => {
    console.log('Item Pressed:', item);
    navigation.navigate(item);
  };

return (
    <View style={styles.container}>
      

      <View style={styles.buttonsContainer}>
        <TouchableOpacity
            style={styles.button}
            onPress={() => handleItemPress('LoginPage')}
        >
          <Text style={styles.buttonText}>Entrar</Text>
        </TouchableOpacity>
      </View>

    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9F9F9',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },

  buttonsContainer: {
    alignItems: 'center',
    margin: 20,
  },
  button: {
    height:  50,
    width: 200,
    backgroundColor: '#6A6A6A',
    marginTop:  20,
    borderRadius: 40,
    justifyContent: 'center',
  },
  buttonText: {
    color: '#F9F9F9',
    fontSize: 20,
    textAlign: 'center',
    fontWeight: 'bold',
  },

  logo: {
    width: 300,
    height: 300,
    backgroundColor: '#000000',
    marginTop: 100,
    marginBottom: 50,
  },

  Text: {
    color: '#000000',
    fontSize: 40,
    fontWeight: 'bold',
  }
});

export default StartPage;