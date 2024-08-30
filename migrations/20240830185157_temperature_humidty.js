/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable('readings_temperature', function (table) {
    table.increments('id').primary();
    table.decimal('temperature', 5, 2).notNullable();
    table.decimal('humidity', 5, 2).notNullable();
    table.timestamp('created_at').defaultTo(knex.fn.now()).notNullable();
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {};
