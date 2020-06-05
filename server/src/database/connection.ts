/**
 * Imports de dependências do script.
 */
import knex from 'knex';
import path from 'path';

/**
 * Configuração da conexão com o banco de dados.
 */
const connection = knex({
  client: 'sqlite3',
  connection: {
    filename: path.resolve(__dirname, 'database.sqlite')
  },
  useNullAsDefault: true
});

/**
 * Exporta a conexão com o banco de dados.
 */
export default connection;