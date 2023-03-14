/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.table('jobs', table => {
        table.string("state_id")
        table.string("state_name")
        table.string("city_id")
        table.string("city_name")
    })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema.table('jobs', table => {
        table.dropColumn('state_id');
        table.dropColumn('state_name');
        table.dropColumn('city_id');
        table.dropColumn('city_name');
      })
};
