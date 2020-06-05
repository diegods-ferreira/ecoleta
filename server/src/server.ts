/**
 * Imports de dependências do script.
 */
import express from 'express';
import cors from 'cors';
import path from 'path';
import routes from './routes';
import { errors } from 'celebrate';


/**
 * Criação da aplicação.
 */
const app = express();
app.use(cors());    // Módulo de segurança para determinar quais URLs externas podem acessar nossa API.
app.use(express.json());    // Faz a aplicação entender as requisições JSON.
app.use(routes);    // Registra as rotas da aplicação.
app.use('/uploads', express.static(path.resolve(__dirname, '..', 'uploads')));    // Permite que a aplicação sirva as imagens.
app.use(errors());    // Ajuda a retornar os erros automaticamente para o front-end.


/**
 * Definindo a qual porta a aplicação vai "ouvir".
 */
app.listen(3333);