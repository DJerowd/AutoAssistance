import { React, useEffect, useState } from 'react';
import { Text, View, TouchableOpacity, StyleSheet, Image, ImageBackground, ActivityIndicator } from 'react-native';
import Swiper from 'react-native-swiper';


const StartPage = ({ navigation }) => {

  {/* Navegação para a Página Inicial */}
  const handleItemPress = (item) => {
    navigation.navigate(item);
  };

  {/* Anúncios da Página de Rolagem */}  
  const ads = [
    { id: 1, image: require('../assets/ad1.jpg'), legend: 'Organize as manutenções de seus veículos.' },
    { id: 2, image: require('../assets/ad2.jpg'), legend: 'Mantenha a manutenção em dia.' },
    { id: 3, image: require('../assets/ad3.jpg'), legend: 'Melhore a segurança no transito e vida util do veículo.' },
  ];
  

  return (
    <View style={styles.container}>

      <Image
          source={require('../assets/Auto-Assistance.png')}
          style={styles.title}
      />

      {/* Página de Rolagem */}  
      <View style={styles.swiperContainer}>
      <Swiper autoplay={true} autoplayTimeout={30} loop={true} activeDotColor='#009F4D'>
        {ads.map(ad => (
          <View key={ad.id} style={styles.swiper}>
            <ImageBackground source={ad.image} style={styles.adImage}/>
            <Text style={styles.legend}>{ad.legend}</Text>
          </View>
        ))}
      </Swiper>
      </View>

      {/* Botão de Navegação para a Página Inicial */}  
      <View style={styles.buttonsContainer}>
        <TouchableOpacity
            style={styles.button}
            onPress={() => handleItemPress('LoginPage')}
        >
          <Text style={styles.buttonText}>Iniciar</Text>
        </TouchableOpacity>
      </View>

    </View>
  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },

  swiperContainer: {
    flex: 1,
  },
  swiper: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  adImage: {
    width: '100%',
    height: 400,
    resizeMode: 'cover',
  },
  legend: {
    color: '#000000',
    marginTop: 40,
    marginHorizontal: 20,
    bottom: 10,
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
  },

  title: {
    width: "98%",
    height: 20,
    marginVertical: 20,
  },

  buttonsContainer: {
    alignItems: 'center',
    margin: 10,
  },
  button: {
    backgroundColor: '#009F4D',
    paddingVertical: 20,
    paddingHorizontal: 100,
    marginVertical: 10,
    marginHorizontal: 30,
    borderRadius: 12,
    alignItems: 'center',
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 20,
    fontWeight: 'bold',
  },
});

export default StartPage;