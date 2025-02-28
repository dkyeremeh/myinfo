import knex from 'knex';
// @ts-ignore
import config from '../knexfile';

export const db = knex(config);
