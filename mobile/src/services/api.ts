/**
 * Imports de pacotes necessários.
 */
import axios from 'axios';

const api = axios.create({
  baseURL: 'http://192.168.1.166:3333'
});

/**
 * Exporta a API.
 */
export default api;