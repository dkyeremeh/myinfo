/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function up(knex) {
  await knex.schema.createTable('users', (table) => {
    table.integer('id').primary();
    table.integer('name').index().notNullable();
    table.string('email').notNullable().unique();
  });

  await knex.schema.createTable('user_images', (table) => {
    table.increments('id').primary();
    table.integer('user').index().notNullable().references('users.id');
    table.string('image').notNullable();
  });
}

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function down(knex) {
  await knex.schema.dropTable('user_images');
  await knex.schema.dropTable('users');
}
