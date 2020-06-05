/**
 * Imports de pacotes necessários.
 */
import React, { useState, useEffect } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, Linking, SafeAreaView } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { Feather as Icon, FontAwesome } from '@expo/vector-icons';
import Constants from 'expo-constants';
import { RectButton } from 'react-native-gesture-handler';
import * as MailComposer from 'expo-mail-composer';

import api from '../../services/api';

/**
 * Interface para indicar que essa tela receberá obrigatoriamente um parâmetro point_id:number.
 */
interface Params {
  point_id: number;
}

/**
 * Interface para definir os tipos de dados vindos dos dados do ponto de coleta recuperados pela API.
 */
interface Data {
  point: {
    image: string;
    image_url: string;
    name: string;
    email: string;
    whatsapp: string;
    city: string;
    uf: string;
  };
  items: {
    title: string;
  }[];
}

/**
 * Definindo o componente Detail em forma de função.
 */
const Detail = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const routeParams = route.params as Params;

  /**
   * Definição de estados.
   */
  const [data, setData] = useState<Data>({} as Data);

  /**
   * Busca as informações do ponto recebido como parâmetro.
   */
  useEffect(() => {
    api.get(`/points/${routeParams.point_id}`).then(response => {
      setData(response.data);
    });
  }, []);

  /**
   * Navega o usuário para a tela anterior.
   */
  function handleNavigationBack() {
    navigation.goBack();
  }

  /**
   * Método que compõe o e-mail a ser enviado ao ponto de coleta.
   */
  function handleComposeMail() {
    MailComposer.composeAsync({
      subject: 'Interesse na coleta de resíduos.',
      recipients: [data.point.email]
    });
  }

  /**
   * Método que compõe a mensagem a ser enviada pelo Whatsapp ao ponto de coleta.
   */
  function handleWhatsapp() {
    Linking.openURL(`whatsapp://send?phone=${data.point.whatsapp}&text=Tenha interesse sobre coleta de resíduos.`);
  }

  if (!data.point) {
    /* Caso não tenha sido possível recuperar o ponto de coleta da API, não mostra nada na tela */
    return null;
  }

  /**
   * Retorna a tela com seus componentes.
   */
  return (
    <SafeAreaView style={{flex: 1}}>
      <View style={styles.container}>
        <TouchableOpacity onPress={handleNavigationBack}>
            <Icon name="arrow-left" size={20} color="#34cb79" />
          </TouchableOpacity>

          <Image style={styles.pointImage} source={{uri: data.point.image_url}} />

          <Text style={styles.pointName}>{data.point.name}</Text>
          <Text style={styles.pointItems}>{data.items.map(item => item.title).join(', ')}</Text>

          <View style={styles.address}>
            <Text style={styles.addressTitle}>Endereço</Text>
            <Text style={styles.addressContent}>{data.point.city}, {data.point.uf}</Text>
          </View>
      </View>
      <View style={styles.footer}>
        <RectButton style={styles.button} onPress={handleWhatsapp}>
          <FontAwesome name="whatsapp" size={20} color="#fff" />
          <Text style={styles.buttonText}>Whatsapp</Text>
        </RectButton>

        <RectButton style={styles.button} onPress={handleComposeMail}>
          <Icon name="mail" size={20} color="#fff" />
          <Text style={styles.buttonText}>E-mail</Text>
        </RectButton>
      </View>
    </SafeAreaView>
  );
};

/**
 * Cria a folha de estilos da tela.
 */
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 32,
    paddingTop: 20 + Constants.statusBarHeight,
  },

  pointImage: {
    width: '100%',
    height: 120,
    resizeMode: 'cover',
    borderRadius: 10,
    marginTop: 32,
  },

  pointName: {
    color: '#322153',
    fontSize: 28,
    fontFamily: 'Ubuntu_700Bold',
    marginTop: 24,
  },

  pointItems: {
    fontFamily: 'Roboto_400Regular',
    fontSize: 16,
    lineHeight: 24,
    marginTop: 8,
    color: '#6C6C80'
  },

  address: {
    marginTop: 32,
  },
  
  addressTitle: {
    color: '#322153',
    fontFamily: 'Roboto_500Medium',
    fontSize: 16,
  },

  addressContent: {
    fontFamily: 'Roboto_400Regular',
    lineHeight: 24,
    marginTop: 8,
    color: '#6C6C80'
  },

  footer: {
    borderTopWidth: StyleSheet.hairlineWidth,
    borderColor: '#999',
    paddingVertical: 20,
    paddingHorizontal: 32,
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  
  button: {
    width: '48%',
    backgroundColor: '#34CB79',
    borderRadius: 10,
    height: 50,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  },

  buttonText: {
    marginLeft: 8,
    color: '#FFF',
    fontSize: 16,
    fontFamily: 'Roboto_500Medium',
  },
});

/**
 * Exporta o componente Detail.
 */
export default Detail;