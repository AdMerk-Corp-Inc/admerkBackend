const { dateTime } = require("../helpers");
const logger = require("../logger");
const fs = require("fs");

class BootCampController {
   static async create(req, res) {
      let status = 500;
      let message = "Oops something went wrong!";

      try {
         if (req.user_data.role === 3 || req.user_data.role === 6) {
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

   static async searchBoot(req, res) {
      let status = 500;
      let message = "Oops something went wrong !";
      let bootcamps = [];

      try {
         status = 200;
         message = "data fetched successsfully";

         bootcamps = await knex
            .select("*")
            .from("bootcamp")
            .where("topic", "like", `%${req.params.search_key}%`);
      } catch (error) {
         status = 500;
         message = error.message;
         logger.error(error);
      }

      return res.json({ status, message, bootcamps });
   }

   static async getMineBoots(req, res) {
      let status = 500;
      let message = "Oops something went wrong !";
      let bootcamps = [];

      try {
         status = 200;
         message = "data fetched successsfully";

         if (req.user_data.role === 3) {
            bootcamps = await knex
               .select("*")
               .from("bootcamp")
               .where("created_by", "=", req.user_data.id)
               .andWhere("sponser_name", "=", req.user_data.name);
         } else if (req.user_data.role === 6) {
            bootcamps = await knex
               .select("*")
               .from("bootcamp")
               .where("created_by", "=", req.user_data.id)
               .andWhere("company_name", "=", req.user_data.name);
         } else {
            status = 403;
            message = "bootcamps not found!";
         }
      } catch (error) {
         status = 500;
         message = error.message;
         logger.error(error);
      }

      return res.json({ status, message, bootcamps });
   }

   static async updateBoot(req, res) {
      let status = 500;
      let message = "Oops something went wrong !";
      let document = null;

      try {
         await knex("bootcamp")
            .where("id", req.params.id)
            .then(async (response) => {
               let { status, urls, topic, description, free, priceInDollars } =
                  req.body;
               if (req.files && req.files.length > 0) {
                  for (let i = 0; i < req.files.length; i++) {
                     if (req.files[i].fieldname == "document") {
                        if (response[0].document !== null) {
                           // fs.unlink(
                           //    __dirname + response[0].document,
                           //    (err) => {
                           //       status = 500;
                           //       message = "error unlinking " + err.message;
                           //       return res.json({ status, message });
                           //    }
                           // );
                        }
                        document = "uploads/" + req.files[i].filename;
                     }
                  }
               }

               if (response.length > 0) {
                  if (req.user_data.role == 3) {
                     if (response[0].sponser_name === req.user_data.name) {
                        await knex("bootcamp")
                           .where("id", req.params.id)
                           .update({
                              status: status,
                              urls: urls,
                              topic: topic,
                              description: description,
                              free: free,
                              priceInDollars: priceInDollars,
                              document: document,
                           });
                        message = "bootcamp updated sucessfully";
                        status = 200;
                     } else {
                        status = 403;
                        message = "not your bootcamp to update";
                     }
                  } else if (req.user_data.role == 6) {
                     if (response[0].company_name === req.user_data.name) {
                        await knex("bootcamp")
                           .where("id", req.params.id)
                           .update({
                              status: status,
                              urls: urls,
                              topic: topic,
                              description: description,
                              free: free,
                              priceInDollars: priceInDollars,
                              document: document,
                           });
                        message = "your bootcamp is updated sucessfully";
                        status = 200;
                     } else {
                        status = 403;
                        message = "not your bootcamp to update";
                     }
                  } else {
                     status = 403;
                     message = "bootcamps not found!";
                  }
               } else {
                  message = "boot camp not found!";
                  status = 404;
               }
            });
      } catch (error) {
         status = 500;
         message = error.message;
         logger.error(error);
      }

      return res.json({ status, message });
   }

   static async deleteBoot(req, res) {
      let status = 500;
      let message = "Oops something went wrong !";
      let bootcamps = [];

      try {
         await knex("bootcamp")
            .where("id", req.params.id)
            .then(async (response) => {
               if (response.length > 0) {
                  if (req.user_data.role === 3) {
                     if (response[0].sponser_name === req.user_data.name) {
                        //delete camo
                        await knex("bootcamp")
                           .where("id", req.params.id)
                           .del()
                           .then(async (response) => {
                              status = 200;
                              message = "bootcamp deleted sucessfully";
                           });
                     } else {
                        status = 301;
                        message = "not your bootcamp to delete";
                     }
                  } else if (req.user_data.role === 6) {
                     if (response[0].company_name === req.user_data.name) {
                        //delete camo
                        await knex("bootcamp")
                           .where("id", req.params.id)
                           .del()
                           .then(async (response) => {
                              status = 200;
                              message = "bootcamp deleted sucessfully";
                           });
                     } else {
                        status = 301;
                        message = "not your bootcamp to delete";
                     }
                  }
               } else {
                  message = "bootcamp not found";
                  status = 404;
               }
            });
      } catch (error) {
         status = 500;
         message = error.message;
         logger.error(error);
      }

      return res.json({ status, message, bootcamps });
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
