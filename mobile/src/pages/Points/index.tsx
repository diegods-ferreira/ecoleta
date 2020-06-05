/**
 * Imports de pacotes necessários.
 */
import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, Image, ScrollView, Alert, StyleSheet } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { Feather as Icon } from '@expo/vector-icons';
import Constants from 'expo-constants';
import MapView, { Marker } from 'react-native-maps';
import { SvgUri } from 'react-native-svg';
import * as Location from 'expo-location';

import api from '../../services/api';

/**
 * Interface para indicar que essa tela receberá obrigatoriamente um parâmetro point_id:number.
 */
interface Params {
  uf: string;
  city: string;
}

/**
 * Interface para definição de tipos das propriedades dos Items.
 */
interface Item {
  id: number;
  title: string;
  image_url: string;
}

/**
 * Interface para definição de tipos das propriedades dos Points.
 */
interface Point {
  id: number;
  name: string;
  image: string;
  image_url: string;
  latitude: number;
  longitude: number;
}

/**
 * Definindo o componente Points em forma de função.
 */
const Points = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const routeParams = route.params as Params;

  /**
   * Definição de estados.
   */
  const [items, setItems] = useState<Item[]>([]);
  const [points, setPoints] = useState<Point[]>([]);
  const [selectedItems, setSelectedItems] = useState<number[]>([]);
  const [initialPosition, setInitialPosition] = useState<[number, number]>([0, 0]);

  /**
   * 
   */
  useEffect(() => {
    async function loadPosition() {
      // Pede a permissão do usuário para utilização de sua localização.
      const { status } = await Location.requestPermissionsAsync();

      if (status !== 'granted') {
        /* Verifica se o usuário não deu a permissão */
        Alert.alert('Ooooops', 'Precisamos da sua permissão para obter a localização.');
        return;
      }

      const location = await Location.getCurrentPositionAsync();    // Pega a localização atual do usuário.
      const { latitude, longitude } = location.coords;    // Grava a latitude e longitude.

      setInitialPosition([latitude, longitude]);
    }

    loadPosition();
  }, []);

  /**
   * Buscar os ítens de coleta da API.
   */
  useEffect(() => {
    api.get('/items').then(response => {
      setItems(response.data);
    });
  }, []);

  /**
   * Buscar os pontos de coleta da API.
   * Executa toda vez que o usuário marca ou desmarca um item de coleta.
   */
  useEffect(() => {
    api.get('/points', {
      params: {
        city: routeParams.city,
        uf: routeParams.uf,
        items: selectedItems
      }
    }).then(response => {
      setPoints(response.data);
    });
  }, [selectedItems]);

  /**
   * Navega o usuário para a tela anterior.
   */
  function handleNavigationBack() {
    navigation.goBack();
  }

  /**
   * Navega o usuário à tela Detail.
   */
  function handleNavigationtoDetail(id: number) {
    navigation.navigate('Detail', { point_id: id });
  }

  /**
   * Atualiza os ítens de coleta selecionados pelo usuário.
   */
  function handleSelectItem(id: number) {
    const alreadSelected = selectedItems.findIndex(item => item === id);

    if (alreadSelected >= 0) {
      const filteredItems = selectedItems.filter(item => item !== id);
      setSelectedItems(filteredItems);
    }
    else {
      setSelectedItems([ ...selectedItems, id ]);
    }
  }

  /**
   * Retorna a tela com seus componentes.
   */
  return (
    <>
      <View style={styles.container}>
        <TouchableOpacity onPress={handleNavigationBack}>
          <Icon name="arrow-left" size={20} color="#34cb79" />
        </TouchableOpacity>

        <Text style={styles.title}>Bem vindo.</Text>
        <Text style={styles.description}>Encontre no mapa um ponto de coleta.</Text>

        <View style={styles.mapContainer}>
          {initialPosition[0] !== 0 && (
            <MapView
              style={styles.map}
              initialRegion={{
                latitude: initialPosition[0],
                longitude: initialPosition[1],
                latitudeDelta: 0.014,
                longitudeDelta: 0.014
              }}
            >
              {points.map(point => (
                <Marker
                  key={point.id.toString()}
                  style={styles.mapMarker}
                  coordinate={{latitude: point.latitude, longitude: point.longitude}}
                  onPress={() => handleNavigationtoDetail(point.id)}
                >
                  <View style={styles.mapMarkerContainer}>
                    <Image style={styles.mapMarkerImage} source={{uri: point.image_url}} />
                    <Text style={styles.mapMarkerTitle}>{point.name}</Text>
                  </View>
                </Marker>
              ))}
            </MapView>
          )}
        </View>
      </View>
      <View style={styles.itemsContainer}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{paddingHorizontal: 20}}>
          {items.map(item => (
            <TouchableOpacity
              key={item.id.toString()}
              style={[
                styles.item,
                selectedItems.includes(item.id) ? styles.selectedItem : {}
              ]}
              onPress={() => handleSelectItem(item.id)}
              activeOpacity={0.6}
            >
              <SvgUri width={42} height={42} uri={item.image_url} />
              <Text style={styles.itemTitle}>{item.title}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>
    </>
  );
};

/**
 * Cria a folha de estilos da tela.
 */
const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 32,
    paddingTop: 20 + Constants.statusBarHeight,
  },

  title: {
    fontSize: 20,
    fontFamily: 'Ubuntu_700Bold',
    marginTop: 24,
  },

  description: {
    color: '#6C6C80',
    fontSize: 16,
    marginTop: 4,
    fontFamily: 'Roboto_400Regular',
  },

  mapContainer: {
    flex: 1,
    width: '100%',
    borderRadius: 10,
    overflow: 'hidden',
    marginTop: 16,
  },

  map: {
    width: '100%',
    height: '100%',
  },

  mapMarker: {
    width: 90,
    height: 80, 
  },

  mapMarkerContainer: {
    width: 90,
    height: 70,
    backgroundColor: '#34CB79',
    flexDirection: 'column',
    borderRadius: 8,
    overflow: 'hidden',
    alignItems: 'center'
  },

  mapMarkerImage: {
    width: 90,
    height: 45,
    resizeMode: 'cover',
  },

  mapMarkerTitle: {
    flex: 1,
    fontFamily: 'Roboto_400Regular',
    color: '#FFF',
    fontSize: 13,
    lineHeight: 23,
  },

  itemsContainer: {
    flexDirection: 'row',
    marginTop: 16,
    marginBottom: 32,
  },

  item: {
    backgroundColor: '#fff',
    borderWidth: 2,
    borderColor: '#eee',
    height: 120,
    width: 120,
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingTop: 20,
    paddingBottom: 16,
    marginRight: 8,
    alignItems: 'center',
    justifyContent: 'space-between',

    textAlign: 'center',
  },

  selectedItem: {
    borderColor: '#34CB79',
    borderWidth: 2,
  },

  itemTitle: {
    fontFamily: 'Roboto_400Regular',
    textAlign: 'center',
    fontSize: 13,
  },
});

/**
 * Exporta o componente Points.
 */
export default Points;