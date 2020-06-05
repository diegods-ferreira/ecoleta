/**
 * Imports de pacotes necessários.
 */
import React, { useState, useEffect } from 'react';
import { View, ImageBackground, Text, Image, KeyboardAvoidingView, Platform, Alert, StyleSheet } from 'react-native';
import { Feather as Icon } from '@expo/vector-icons';
import { RectButton } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';
import RNPickerSelect from 'react-native-picker-select';
import axios from 'axios';

/**
 * Define o tipo de cada propriedade do objeto de UFs retornado pela API do IBGE.  
 */
interface IBGEUFResponse {
  sigla: string;
}

/**
 * Define o tipo de cada propriedade do objeto de Cidades retornado pela API do IBGE.
 */
interface IBGECityResponse {
  nome: string;
}

/**
 * Definindo o componente Home em forma de função.
 */
const Home = () => {
  // Guarda os métodos de navegação nesta constante.
  const navigation = useNavigation();

  /**
   * Definição de estados.
   */
  const [ufs, setUfs] = useState<string[]>([]);
  const [cities, setCities] = useState<string[]>([]);
  const [selectedUf, setSelectedUf] = useState('0');
  const [selectedCity, setSelectedCity] = useState('0');

  /**
   * Requisita as informações de UFs à API do IBGE.
   */
  useEffect(() => {
    axios.get<IBGEUFResponse[]>('https://servicodados.ibge.gov.br/api/v1/localidades/estados').then(response => {
      const ufInitials = response.data.map(uf => uf.sigla);
      setUfs(ufInitials);
    });
  }, []);

  /**
   * Requisita as informações das Cidades pertencentes à UF selecionada.
   * Executa toda vez que o valor do estado selectedUf mudar.
   */
  useEffect(() => {
    if (selectedUf === '0')
      return;
    
    axios.get<IBGECityResponse[]>(`https://servicodados.ibge.gov.br/api/v1/localidades/estados/${selectedUf}/municipios`).then(response => {
      const cityNames = response.data.map(city => city.nome);
      setCities(cityNames);
    });
  }, [selectedUf]);

  /**
   * Atualiza o valor do estado selectedUf para que o <select> de Cidades atualize também.
   */
  function handleSelectUf(value: string) {
    setSelectedUf(value);
  }

  /**
   * Atualiza o valor do estado selectedCity.
   */
  function handleSelectCity(value: string) {
    setSelectedCity(value);
  }

  /**
   * Navega para a tela Points.
   */
  function handleNavigationToPoints() {
    if (selectedUf !== '0' && selectedCity !== '0') 
      navigation.navigate('Points', { uf: selectedUf, city: selectedCity });
    else
      Alert.alert('Oooops!', 'Você precisa selecionar um UF e uma cidade.');
  }

  /**
   * Retorna a tela com todos os seus componentes.
   */
  return (
    <KeyboardAvoidingView style={{flex: 1}} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
      <ImageBackground source={require('../../assets/home-background.png')} style={styles.container} imageStyle={{ width: 274, height: 368 }}>
        <View style={styles.main}>
          <Image source={require('../../assets/logo.png')} />
          <View>
            <Text style={styles.title}>Seu marketplace de coleta de resíduos</Text>
            <Text style={styles.description}>Ajudamos pessoas a encontrarem pontos de coleta de forma eficiente.</Text>
          </View>
        </View>

        <View style={styles.footer}>
          <RNPickerSelect
            style={pickerSelectStyles}
            onValueChange={handleSelectUf}
            useNativeAndroidPickerStyle={false}
            placeholder={{ label: 'Selecione a UF', value: '0' }}
            items={ufs.map(uf => {
              return { label: uf, value: uf }
            })}
          />

          <RNPickerSelect
            style={pickerSelectStyles}
            onValueChange={handleSelectCity}
            useNativeAndroidPickerStyle={false}
            placeholder={{ label: 'Selecione a cidade', value: '0' }}
            items={cities.map(city => {
              return { label: city, value: city }
            })}
          />

          <RectButton style={styles.button} onPress={handleNavigationToPoints}>
            <View style={styles.buttonIcon}>
              <Icon name="arrow-right" color="#fff" size={24} />
            </View>
            <Text style={styles.buttonText}>Entrar</Text>
          </RectButton>
        </View>
      </ImageBackground>
    </KeyboardAvoidingView>
  );
};

/**
 * Cria a folha de estilos da tela.
 */
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 32
  },

  main: {
    flex: 1,
    justifyContent: 'center',
  },

  title: {
    color: '#322153',
    fontSize: 32,
    fontFamily: 'Ubuntu_700Bold',
    maxWidth: 260,
    marginTop: 64,
  },

  description: {
    color: '#6C6C80',
    fontSize: 16,
    marginTop: 16,
    fontFamily: 'Roboto_400Regular',
    maxWidth: 260,
    lineHeight: 24,
  },

  footer: {},

  select: {},

  input: {
    height: 60,
    backgroundColor: '#FFF',
    borderRadius: 10,
    marginBottom: 8,
    paddingHorizontal: 24,
    fontSize: 16,
  },

  button: {
    backgroundColor: '#34CB79',
    height: 60,
    flexDirection: 'row',
    borderRadius: 10,
    overflow: 'hidden',
    alignItems: 'center',
    marginTop: 8,
  },

  buttonIcon: {
    height: 60,
    width: 60,
    backgroundColor: 'rgba(0, 0, 0, 0.1)',
    justifyContent: 'center',
    alignItems: 'center'
  },

  buttonText: {
    flex: 1,
    justifyContent: 'center',
    textAlign: 'center',
    color: '#FFF',
    fontFamily: 'Roboto_500Medium',
    fontSize: 16,
  }
});

/**
 * Os PickerSelects precisam ter essas duas 'classes' para funcionar.
 * Por isso, resolvi separar.
 */
const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
    height: 60,
    backgroundColor: '#FFF',
    borderRadius: 10,
    marginBottom: 8,
    paddingHorizontal: 24,
    fontSize: 16,
  },
  inputAndroid: {
    height: 60,
    backgroundColor: '#FFF',
    borderRadius: 10,
    marginBottom: 8,
    paddingHorizontal: 24,
    fontSize: 16,
  }
});

/**
 * Exporta o componente Home;
 */
export default Home;