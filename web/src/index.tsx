/**
 * Imports de pacotes necessários.
 */
import React from 'react';
import ReactDOM from 'react-dom';
/**
 * Imports de arquivos necessários.
 */
import App from './App';

/**
 * Renderiza os elementos na DOM da página (dentro da div#root).
 */
ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);