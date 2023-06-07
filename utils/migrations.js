const knexx = require("knex");
const config = require("../knexfile");
const db = knexx(config[process.env.NODE_ENV]);

async function runMigrations() {
   try {
      await db.migrate.latest();
      console.log("Migrations ran successfully");
   } catch (error) {
      console.error("Error running migrations:", error);
   } finally {
      await db.destroy();
   }
}

exports.runMigrations = runMigrations;
