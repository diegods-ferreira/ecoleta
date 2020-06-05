/**
 * Imports de dependências do script.
 */
import Knex from "knex";

/**
 * Método chamado ao executar a migrations.
 */
export async function up(knex: Knex) {
  return knex.schema.createTable('point_items', table => {
    table.increments('id').primary();

    table.integer('point_id')
      .notNullable()
      .references('id')
      .inTable('points');

    table.string('item_id')
      .notNullable()
      .references('id')
      .inTable('items');
  });
}

/**
 * Método executado ao realizar um rollback das migrations.
 */
export async function down(knex: Knex) {
  return knex.schema.dropTable('point_items');
}