/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
  return knex.schema.createTable('tickets',function(table){
    table.bigIncrements("id")
    table.string("title")
    table.text("description")
    table.integer("status").defaultTo(1).comment("1=open,2=closed")
    table.string("created_by")
    table.string("created_date")
    table.string("updated_by")
    table.string("updated_date")
  })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  return knex.schema.dropTable("tickets")
};
