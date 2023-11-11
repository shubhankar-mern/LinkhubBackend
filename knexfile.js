// Update with your config settings.

/**
 * @type { Object.<string, import("knex").Knex.Config> }
 */
module.exports = {

  development: {
    client: 'pg',
    connection: {
      host: 'localhost', // replace with your PostgreSQL host
      port: '5432', // replace with your PostgreSQL port
      user: 'postgres', // replace with your PostgreSQL username
      password: 'Qwerty123', // replace with your PostgreSQL password
      database: 'linkhub', // replace with your PostgreSQL database name
    },

    migrations: {
      directory: './migrations', // Update this path
    },
  },
  
};
