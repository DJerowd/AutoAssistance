import { React } from 'react';
import { Text, View, TouchableOpacity, StyleSheet, Image } from 'react-native';
import Swiper from 'react-native-swiper';

const StartPage = ({ navigation }) => {

{/* Navegação para a Página Inicial */}
  const handleItemPress = (item) => {
    console.log('Item Selecionado:', item);
    navigation.navigate(item);
  };

{/* Anúncios da Página de Rolagem */}  
  const ads = [
    { id: 1, imageUrl: 'https://img.freepik.com/psd-gratuitas/modelo-de-cartaz-de-anuncio-de-oficina-mecanica_23-2148747133.jpg' },
    { id: 2, imageUrl: 'https://img.freepik.com/psd-gratuitas/modelo-de-anuncio-de-oficina-mecanica-de-poster_23-2148747129.jpg' },
    { id: 3, imageUrl: 'https://img.freepik.com/psd-gratuitas/modelo-de-folheto-de-oficina-mecanica_23-2148747126.jpg?size=626&ext=jpg' },
  ];
  
return (
    <View style={styles.container}>

{/* Página de Rolagem */}  
      <View style={styles.swiperContainer}>
      <Swiper autoplay={true} autoplayTimeout={30} loop={true}>
        {ads.map(ad => (
          <View key={ad.id} style={styles.swiper}>
            <Image source={{ uri: ad.imageUrl }} style={styles.adImage} />
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

  swiperContainer: {
    paddingTop: 160,
    paddingBottom: 40,
    paddingHorizontal: 20,
  },
  swiper: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  adImage: {
    width: '100%',
    height: '100%',
  },

  buttonsContainer: {
    alignItems: 'center',
    margin: 10,
  },
  button: {
    height:  60,
    width: 200,
    backgroundColor: '#6A6A6A',
    borderRadius: 40,
    marginBottom: 40,
    justifyContent: 'center',
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 20,
    textAlign: 'center',
    fontWeight: 'bold',
  },
});

export default StartPage;