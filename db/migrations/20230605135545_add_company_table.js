/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
   return knex.schema.createTable("companies", function (table) {
      table.bigIncrements("id");
      table.string("name");
      table.string("email");
      table.string("number");
      table.string("country_id");
      table.string("country_code");
      table.string("country_name");
      table.string("logo");
      table.string("office_location");
      table.string("since");
      table.integer("email_verified").defaultTo(2).comment("1=yes,2=no");
      table.string("email_code").defaultTo("");
      table.string("password");
      table.integer("from_usa").defaultTo(2).comment("1=yes,2=No");
      table.text("description");
      table
         .integer("role")
         .defaultTo("6")
         .comment("1=admin,2=volunteer,3=sponsor,4=refugee,5=company");
      table.integer("status").defaultTo(1).comment("1=active,2=not active");
      table.integer("created_by");
      table.integer("created_date");
      table.integer("updated_by");
      table.integer("updated_date");
   });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
   return knex.schema.dropTableIfExists("companies");
};
