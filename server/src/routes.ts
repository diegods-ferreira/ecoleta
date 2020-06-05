/**
 * Imports de dependências do script.
 */
import express from 'express';
import { celebrate, Joi } from 'celebrate';
import multer from 'multer';

import multerConfig from './config/multer';


/**
 * Imports dos controladores das entidades.
 */
import PointsController from './controllers/PointsController';
import ItemsController from './controllers/ItemsController';

import pointCreationValidation from './validations/pointCreationValidation';


/**
 * Instância dos objetos que serão utilizados.
 */
const routes = express.Router();
const upload = multer(multerConfig);

const pointsController = new PointsController();
const itemsController = new ItemsController();


/**
 * Definição das rotas.
 */
routes.get('/items', itemsController.index);
routes.get('/points', pointsController.index);
routes.get('/points/:id', pointsController.show);
routes.post('/points', upload.single('image'), pointCreationValidation, pointsController.create);


/**
 * Exporta as rotas para serem usadas.
 */
export default routes;