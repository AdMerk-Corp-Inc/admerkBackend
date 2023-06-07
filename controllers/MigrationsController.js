const logger = require("../logger");
const { runMigrations } = require("../utils/migrations");

async function applyMigrations(req, res) {
   let status = 500;
   let message = "Oops something went wrong!";
   let detail = {};

   try {
      runMigrations();
      status = 200;
      message = "Migrations Successfull!";
   } catch (error) {
      status = 500;
      message = error?.message;
      logger.error(error);
   }

   return res.json({ status, message, detail });
}

module.exports = {
   applyMigrations,
};
