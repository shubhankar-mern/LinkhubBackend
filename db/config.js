import knex from 'knex';
import { v4 as uuidv4 } from 'uuid';

const db = knex({
    client: 'pg',
    connection: {
      host: 'localhost', // replace with your PostgreSQL host
      port: '5432', // replace with your PostgreSQL port
      user: 'postgres', // replace with your PostgreSQL username
      password: 'Qwerty123', // replace with your PostgreSQL password
      database: 'linkhub', // replace with your PostgreSQL database name
    },
  });

export default db;