/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
   return knex.schema.createTable("bootcamp", function (table) {
      table.bigIncrements("id").primary();
      table.integer("created_by");
      table.string("created_date");
      table.string("document");
      table.string("company_name");
      table.string("urls");
      table.string("topic");
   });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
   return knex.schema.dropTable("bootcamp");
};
