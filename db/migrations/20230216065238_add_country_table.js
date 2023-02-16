/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
  return knex.schema.createTable("countries",function(table){
    table.bigIncrements("id")
    table.string("isoCode")
    table.string("name")
    table.string("phoneCode")
    table.string("currency")
  })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  return knex.schema.dropTable("countries")
};
