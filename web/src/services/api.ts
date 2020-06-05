/**
 * Imports de pacotes necessários.
 */
import axios from 'axios';

/**
 * Definindo o caminho para a API.
 */
const api = axios.create({
  baseURL: 'http://localhost:3333'
});

/**
 * Exporta a API.
 */
export default api;