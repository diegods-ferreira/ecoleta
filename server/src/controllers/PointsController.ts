/**
 * Imports de dependências do script.
 */
import { Request, Response } from 'express';
import knex from '../database/connection';

/**
 * Controlador dos Pontos de Coleta
 */
class PointsController {
  /**
   * Listar todos os Pontos de Coleta.
   * @param request 
   * @param response 
   */
  async index(request: Request, response: Response) {
    const { city, uf, items } = request.query;    // Recupera os query params.
    const parsedItems = String(items)   // Converte os items para string.
      .split(',')   // Separa-os em um array.
      .map(item => Number(item.trim()));    // Retira qualquer espaço que possa haver nos items e os converte para número.

    /**
     * SELECT DISTINCT points.*
     * FROM points
     * JOIN point_items ON points.id = point_items.point_id
     * WHERE (point_items.item_id IN (:parsedItems) OR (city = :city) OR (uf = :uf)
     */
    const points = await knex('points')
      .join('point_items', 'points.id', '=', 'point_items.point_id')
      .whereIn('point_items.item_id', parsedItems)
      .where('city', String(city))
      .where('uf', String(uf))
      .distinct()
      .select('points.*');

      const serializedPoints = points.map(point => {
        return {
          ...point,
          image_url: `http://192.168.1.166:3333/uploads/${point.image}`
        }
      });

    return response.json(serializedPoints);
  }

  /**
   * Retorna apenas um registro de Ponto de Coleta.
   * @param request 
   * @param response 
   */
  async show(request: Request, response: Response) {
    const { id } = request.params;    // Recupera os parâmetros passados.

    /**
     * SELECT * FROM points WHERE id = :id LIMIT 1
     */
    const point = await knex('points').where('id', id).first();

    if (!point)
      return response.status(400).json({ message: 'Point not found.' });

    const serializedPoint = {
      ...point,
      image_url: `http://192.168.1.166:3333/uploads/${point.image}`
    };

    /**
     * SELECT items.title
     * FROM items
     *   JOIN point_items ON items.id = point_items.item_id
     * WHERE point_items.point_id = :id
     */
    const items = await knex('items')
      .join('point_items', 'items.id', '=', 'point_items.item_id')
      .where('point_items.point_id', id)
      .select('items.title');
    
    return response.json({ point: serializedPoint, items });
  }

  /**
   * Criação de Pontos
   * @param request 
   * @param response 
   */
  async create(request: Request, response: Response) {
    // Recupera os parâmetros passados no corpo da requisição.
    const { name, email, whatsapp, latitude, longitude, city, uf, items } = request.body;

    // Inicia uma transação.
    const trx = await knex.transaction();

    // Constroi o Ponto de Coleta a ser criado.
    const point = { image: request.file.filename, name, email, whatsapp, latitude, longitude, city, uf };

    // Insere o Ponto de Coleta no banco de dados.
    const insertedPoint = await trx('points').insert(point);

    // Pega o id do Ponto de Coleta.
    const point_id = insertedPoint[0];

    // Constroi um array de items coletados pelo ponto.
    const pointItems = items
      .split(',')
      .map((item: string) => item.trim())
      .map((item_id: number) => { return { item_id, point_id } });

    // Insere os items na POINT_ITEMS.
    await trx('point_items').insert(pointItems);

    // Faz o commit da transação. (Em caso de erro, dará um rollback automático).
    await trx.commit();

    // Retorna os dados do ponto recebidos na requisição, juntamente com seu id.
    return response.json({ id: point_id, ...point });
  }
}

/**
 * Exporta a classe PointsController.
 */
export default PointsController;