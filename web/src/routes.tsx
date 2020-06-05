/**
 * Import de pacotes necessários.
 */
import React from 'react';
import { Route, BrowserRouter } from 'react-router-dom';
/**
 * Imports das páginas.
 */
import Home from './pages/Home';
import CreatePoint from './pages/CreatePoint';

/**
 * Componente de Rotas escrito em forma de função.
 */
const Routes = () => {
  return (
    <BrowserRouter>
      <Route component={Home} path="/" exact />
      <Route component={CreatePoint} path="/create-point" />
    </BrowserRouter>
  );
}

/**
 * Exporta o componente Rotas.
 */
export default Routes;