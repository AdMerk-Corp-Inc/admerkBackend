/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
  return knex.schema.createTable("jobs",function(table){
    table.bigIncrements("id")
    table.string("title")
    table.integer("status").defaultTo(1).comment("1=active,2=unactive")
    table.string("cover_picture")
    table.string("created_date")
    table.string("created_by")
    table.string("updated_date")
    table.string("updated_by")
  })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  return knex.schema.dropTable("jobs")
};
