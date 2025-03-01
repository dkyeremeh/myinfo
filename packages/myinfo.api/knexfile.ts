import { Knex } from 'knex';

const config: Knex.Config = {
  client: 'mysql2',
  connection: {
    host: process.env.MYINFO_DB_HOST,
    user: process.env.MYINFO_DB_USER,
    password: process.env.MYINFO_DB_PASS,
    database: process.env.MYINFO_DB_NAME,
  },
  migrations: {
    tableName: 'z_checker_migrations',
    directory: './migrations',
  },
};

export default config;
