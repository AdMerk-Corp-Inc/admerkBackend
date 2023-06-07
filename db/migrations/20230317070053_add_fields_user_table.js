/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
   return knex.schema.table("users", function (table) {
      table.string("passport").defaultTo("");
      table.string("travelby").defaultTo("");
      table.string("sponsorcategory").defaultTo("");
      table.string("maritialStatus").defaultTo("");
   });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {};
