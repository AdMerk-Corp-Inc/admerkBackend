/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
  return knex.schema.createTable("users",function(table){
    table.bigIncrements("id")
    table.string("name")
    table.string("email")
    table.string("country_id")
    table.string("country_code")
    table.string("country_name")
    table.string("dob")
    table.string("whatsapp_number")
    table.string("graduation")
    table.string("education")
    table.string("lastjob")
    table.string("skills")
    table.string("technicalskills")
    table.string("hobby")
    table.string("profile_photo")
    table.string("gender")
    table.integer("from_usa").defaultTo(2).comment("1=yes,2=No")
    table.text("description")
    table.integer("role").defaultTo("4").comment("1=admin,2=volunteer,3=sponsor,4=refugee")
    table.integer("status").defaultTo(1).comment("1=active,2=not active")
    table.integer("created_by")
    table.integer("created_date")
    table.integer("yearsofexperience")
    table.integer("updated_by")
    table.integer("updated_date")
  })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema.dropTable("users")
};
