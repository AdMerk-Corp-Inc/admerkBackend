/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
   return knex.schema.table("users", (table) => {
      table.string("user_type");
      table.string("state_id");
      table.string("state_name");
      table.string("city_id");
      table.string("city_name");
      table.string("zip_code");
      table.string("18+");
      table.string("citizenship");
      table.string("sponsor_cartegory");
      table.string("sponsor_group");
   });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
   return knex.schema.table("users", (table) => {
      table.dropColumn("user_type");
      table.string("state_id");
      table.string("state_name");
      table.string("city_id");
      table.string("city_name");
      table.dropColumn("zip_code");
      table.dropColumn("18+");
      table.dropColumn("citizenship");
      table.dropColumn("sponsor_cartegory");
      table.dropColumn("sponsor_group");
   });
};
