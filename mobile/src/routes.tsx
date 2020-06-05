/**
 * Imports de pacotes necessários.
 */
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
/**
 * Imports de arquivos necessários.
 */
import Home from './pages/Home';
import Points from './pages/Points';
import Detail from './pages/Detail';

// O AppStack funcionado como o roteamento da aplicação.
const AppStack = createStackNavigator();

/**
 * Cria e configura as rotas da aplicação.
 */
const Routes = () => {
  return (
    <NavigationContainer>
      <AppStack.Navigator headerMode="none" screenOptions={{cardStyle: {backgroundColor: '#f0f0f5'}}}>
        <AppStack.Screen name="Home" component={Home} />
        <AppStack.Screen name="Points" component={Points} />
        <AppStack.Screen name="Detail" component={Detail} />
      </AppStack.Navigator>
    </NavigationContainer>
  );
};

/**
 * Exporta o componente de rotas.
 */
export default Routes;