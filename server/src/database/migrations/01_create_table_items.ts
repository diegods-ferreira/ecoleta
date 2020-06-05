/**
 * Imports de dependências do script.
 */
import Knex from "knex";

/**
 * Método chamado ao executar a migrations.
 */
export async function up(knex: Knex) {
  return knex.schema.createTable('items', table => {
    table.increments('id').primary();
    table.string('image').notNullable();
    table.string('title').notNullable();
  });
}

/**
 * Método executado ao realizar um rollback das migrations.
 */
export async function down(knex: Knex) {
  return knex.schema.dropTable('items');
}