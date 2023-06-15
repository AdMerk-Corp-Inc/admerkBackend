/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
   return knex.schema.table("bootcamp", function (table) {
      table.string("sponser_name").after("company_name");
      table.string("descryption").after("topic");
      table.integer("free").comment("free=1, paid=0");
      table.string("status");
      table.bigint("priceInDollars");
      table.bigint("result");
      table.string("result_grade");
   });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
   return knex.schema.alterTable("bootcamp", function (table) {
      table.dropColumn("sponser_name");
      table.dropColumn("descryption");
      table.dropColumn("free");
      table.dropColumn("status");
      table.dropColumn("priceInDollars");
      table.dropColumn("result");
      table.dropColumn("result_grade");
   });
};
