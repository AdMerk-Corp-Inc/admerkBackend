/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
   return knex.schema.table("bootcamp", function (table) {
      table.string("Sponser_name").after("company_name");
      table.string("descryption").after("topic");
      table.boolean("free");
      table.bigint("priceInDollars");
   });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
   return knex.schema.alterTable("bootcamp", function (table) {
      table.dropColumn("Sponser_name");
      table.dropColumn("descryption");
      table.dropColumn("free");
      table.dropColumn("priceInDollars");
   });
};
