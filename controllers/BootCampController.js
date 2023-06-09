const { dateTime } = require("../helpers");
const logger = require("../logger");

class BootCampController {
   static async create(req, res) {
      let status = 500;
      let message = "Oops something went wrong!";

      try {
         if (req.user_data.role === 4 || req.user_data.role === 6) {
            let inputs = req.body;
            inputs["created_by"] = req.user_data.id;
            inputs["created_date"] = dateTime();

            if (req.user_data.role === 6) {
               inputs["company_name"] = req.user_data.name;
            } else {
               inputs["sponser_name"] = req.user_data.name;
            }

            // check if file files exist as document
            if (req.files && req.files.length > 0) {
               for (let i = 0; i < req.files.length; i++) {
                  if (req.files[i].fieldname == "document") {
                     inputs["document"] = "uploads/" + req.files[i].filename;
                  }
               }
            }

            await knex("bootcamp").insert(inputs);

            status = 200;
            message = "boot camp Created successfully!";
         } else {
            status = 300;
            message = "you are not autherized to create a bootcamp!";
         }
      } catch (error) {
         (status = 500), (message = error.message);
         logger.error(error);
      }
      return res.json({ status, message });
   }

   static async submitTopic(req, res) {
      let status = 500;
      let message = "Oops something went wrong!";

      try {
         // input object
         let inputs = req.body;

         inputs["created_by"] = req.user_data.id;
         inputs["created_date"] = dateTime();

         // check if file files exist as document
         if (req.files && req.files.length > 0) {
            for (let i = 0; i < req.files.length; i++) {
               if (req.files[i].fieldname == "document") {
                  inputs["document"] = "uploads/" + req.files[i].filename;
               }
            }
         }

         await knex("bootcamp").insert(inputs);

         status = 200;
         message = "boot camp topic Created successfully!";
      } catch (error) {
         (status = 500), (message = error.message);
         logger.error(error);
      }
      return res.json({ status, message });
   }

   static async getList(_req, res) {
      let status = 500;
      let message = "Oops something went wrong!";
      let list = [];
      try {
         await knex("bootcamp")
            .orderBy("id", "desc")
            .then((response) => (list = response));

         status = 200;
         message = "boot camp topics fetched successfully!";
      } catch (error) {
         status = 500;
         message = error.message;
         logger.error(error);
      }
      return res.json({ status, message, list });
   }

   static async getDetail(req, res) {
      let status = 500;
      let message = "Oops something went wrong!";
      let detail = {};
      try {
         await knex("bootcamp")
            .where("id", req.params.id)
            .then((response) => {
               if (response.length > 0) {
                  detail = response[0];
               } else {
                  status = 300;
                  message = "No record found successfully!";
               }
            });

         status = 200;
         message = "boot camp topic fetched successfully!";
      } catch (error) {
         status = 500;
         message = error.message;
         logger.error(error);
      }
      return res.json({ status, message, detail });
   }
}

module.exports = BootCampController;
