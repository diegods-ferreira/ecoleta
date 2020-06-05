/**
 * Imports de dependências do script.
 */
import express from 'express';


/**
 * Imports dos controladores das entidades.
 */
import PointsController from './controllers/PointsController';
import ItemsController from './controllers/ItemsController';


/**
 * Instância dos objetos que serão utilizados.
 */
const routes = express.Router();
const pointsController = new PointsController();
const itemsController = new ItemsController();


/**
 * Definição das rotas.
 */
routes.get('/items', itemsController.index);
routes.get('/points', pointsController.index);
routes.get('/points/:id', pointsController.show);
routes.post('/points', pointsController.create);


/**
 * Exporta as rotas para serem usadas.
 */
export default routes;