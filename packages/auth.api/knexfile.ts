import { Knex } from 'knex';

const config: Knex.Config = {
  client: 'mysql2',
  connection: {
    host: process.env.AUTH_DB_HOST,
    user: process.env.AUTH_DB_USER,
    password: process.env.AUTH_DB_PASS,
    database: process.env.AUTH_DB_NAME,
  },
  migrations: {
    tableName: 'z_auth_migrations',
    directory: './migrations',
  },
};

export default config;
