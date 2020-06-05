/**
 * Imports de dependências do script.
 */
import { Request, Response } from 'express';
import knex from '../database/connection';

/**
 * Controlador dos Itens
 */
class ItemsController {
  /**
   * Listagem dos itens.
   * @param request 
   * @param response 
   */
  async index(request: Request, response: Response) {
    const items = await knex('items').select('*');
    const serializedItems = items.map(item => {
      return {
        id: item.id,
        title: item.title,
        image_url: `http://192.168.1.166:3333/uploads/${item.image}`
      };
    });
    return response.json(serializedItems);
  }
}

/**
 * Exporta a classe ItemsController.
 */
export default ItemsController;