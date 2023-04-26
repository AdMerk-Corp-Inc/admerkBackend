/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.createTable("bid",function(table){
        table.bigIncrements('id').primary();
        table.integer('user_id').unsigned().notNullable();
        table.integer('post_id').unsigned().notNullable();
        table.integer("created_date")
    })
  
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema.dropTable("bid")
};
