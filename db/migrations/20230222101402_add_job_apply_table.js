/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
  return knex.schema.createTable('jobApplications',function(table){
    table.bigIncrements("id")
    table.string("job_id")
    table.string("user_id")
    table.string("resume")
    table.string("apply_date")
  })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  return knex.schema.dropTable('jobApplications')
};
