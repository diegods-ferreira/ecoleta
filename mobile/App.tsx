/**
 * Imports de pacotes necessários.
 */
import React from 'react';
import { StatusBar } from 'react-native';
import { AppLoading } from 'expo';
import { Roboto_400Regular, Roboto_500Medium } from '@expo-google-fonts/roboto';
import { Ubuntu_700Bold, useFonts } from '@expo-google-fonts/ubuntu';

/**
 * Imports de arquivos necessários.
 */
import Routes from './src/routes';

/**
 * Cria e exporta o componente App.
 */
export default function App() {
  // Guarda a informação de quando as fontes estão carregadas ou não.
  const [fontsLoaded] = useFonts({
    Roboto_400Regular,
    Roboto_500Medium,
    Ubuntu_700Bold
  });

  if (!fontsLoaded) {
    /* Caso as fontes ainda não tenham sido carregadas, retorna o <AppLoading/> */
    return <AppLoading />
  }
  
  return (
    <>
      <StatusBar barStyle="dark-content" backgroundColor="transparent" translucent />
      <Routes />
    </>
  );
}