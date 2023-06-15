const logger = require("../logger");
const MD5 = require("MD5");
const jwt = require("jsonwebtoken");
const HELPERS = require("../helpers");
var random = require("random-string-alphanumeric-generator");

async function register(req, res) {
   let status = 500;
   let message = "Oops something went wrong!";
   let inputs = req.body;
   let user_data = {};
   try {
      inputs.password = MD5(inputs.password);
      await knex("companies")
         .where("email", inputs.email)
         .where("password", inputs.password)
         .then(async (response) => {
            if (response.length > 0) {
               status = 300;
               message = "Company with this email already exist";
            } else {
               inputs["created_date"] = HELPERS.dateTime();

               if (req.files.length > 0) {
                  if (req.files[0].fieldname === "logo") {
                     inputs["logo"] = "uploads/" + req.files[0].filename;
                  }
               }

               await knex("companies")
                  .insert(inputs, "id")
                  .then(async (user_response) => {
                     if (user_response[0]) {
                        let new_password = random.randomAlphanumeric(
                           6,
                           "lowercase"
                        );
                        new_password = new_password + ":" + user_response[0];
                        console.log("password:" + new_password);
                        console.log(
                           "sindinng mail. user is: " +
                              JSON.stringify(user_response)
                        );
                        await knex("companies")
                           .where("id", user_response[0])
                           .update({
                              email_code: new_password,
                           })
                           .then(async (response) => {
                              await HELPERS.sendMail(
                                 inputs.email,
                                 "verifyemail",
                                 {
                                    username: inputs.name,
                                    verifyLink:
                                       HELPERS.react_url +
                                       `verifyemail?token=${new_password}`,
                                 },
                                 "Verify Your Account"
                              );
                           });
                     }
                  });

               status = 200;
               message =
                  "We have sent an email to verify your account. Check your email to verify!";
            }
         });
   } catch (error) {
      status = 500;
      message = error.message;
      logger.error(error);
   }

   return res.json({ status, message, user_data });
}

async function verifyEmail(req, res) {
   let status = 500;
   let message = "Oops something went wrong!";
   let user_data = {};

   try {
      let forgot_password_token = req.params.token.split(":");

      await knex("companies")
         .where("id", forgot_password_token[1])
         .where("email_code", req.params.token)
         .then(async (response) => {
            if (response.length > 0) {
               await knex("companies").where("id", response[0].id).update({
                  email_verified: 1,
                  email_code: "",
               });

               status = 200;
               message = "Your account is verified please log in now";
            } else {
               status = 300;
               message = "Unable to verify email";
            }
         });
   } catch (error) {
      status = 500;
      message = error.message;
      logger.error(error);
   }

   return res.json({ status, message, user_data });
}

async function login(req, res) {
   let status = 500;
   let message = "Oops something went wrong!";
   let inputs = req.body;
   let user_data = {};
   try {
      await knex("companies")
         .where("email", inputs.email)
         .where("password", MD5(inputs.password))
         .then((response) => {
            if (response.length > 0) {
               user_data = response[0];
               let flag_to_go = 0;
               if (user_data.status != 1) {
                  status = 300;
                  message = "Account is not active";
                  flag_to_go = 1;
               }

               if (user_data.email_verified != 1) {
                  status = 301;
                  message = "Account is not verified yet";
                  flag_to_go = 1;
               }

               if (flag_to_go == 0) {
                  user_data["token"] = jwt.sign(
                     { user_data: user_data },
                     process.env.SECRET_KEY
                  );

                  status = 200;
                  message = "User logged in successfully!";
               }
            } else {
               status = 300;
               message = "Incorrect Email & Password";
            }
         });
   } catch (error) {
      status = 500;
      message = error.message;
      logger.error(error);
   }

   return res.json({ status, message, user_data });
}

async function changePassword(req, res) {
   let status = 500;
   let message = "Oops something went wrong!";
   console.log("here");
   try {
      await knex("companies")
         .where("id", req.user_data.id)
         .update({
            password: MD5(req.body.password),
         });

      status = 200;
      message = "Password updated successfully!";
   } catch (error) {
      status = 500;
      message = error.message;
      logger.error(error);
   }

   return res.json({ status, message });
}

async function changeStatus(req, res) {
   let status = 500;
   let message = "Oops something went wrong!";

   try {
      if (req.user_data.role == 1) {
         await knex("companies").where("id", req.params.id).update({
            status: req.params.status,
            updated_by: req.user_data.id,
            updated_date: HELPERS.dateTime(),
         });

         status = 200;
         message = "Data updated successfully!";
      } else {
         status = 300;
         message = "You are not authorized to perform this action";
      }
   } catch (error) {
      status = 500;
      message = error.message;
      logger.error(error);
   }

   return res.json({ status, message });
}

// async function editCompnay(req, res) {
//    let status = 500;
//    let message = "Oops something went wrong!";

//    try {
//       await knex("companies")
//          .where("id", req.user_data.id)
//          .update({

//          });

//       status = 200;
//       message = "Password updated successfully!";
//    } catch (error) {
//       status = 500;
//       message = error.message;
//       logger.error(error);
//    }

//    return res.json({ status, message });
// }

module.exports = {
   register,
   login,
   verifyEmail,
   changePassword,
   changeStatus,
};
