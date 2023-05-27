const logger = require("../../logger");
const MD5 = require("MD5");
const jwt = require("jsonwebtoken");
const HELPERS = require("../../helpers");
var random = require("random-string-alphanumeric-generator");

module.exports = {
  login: async (req, res) => {
  let status = 500;
  let message = "Oops something went wrong!";
  let inputs = req.body;
  let user_data = {};
  try {
    await knex("users").where("email", inputs.email).where("password", MD5(inputs.password))
      .then((response) => {
        if (response.length > 0) {
          user_data = response[0];
          let flag_to_go = 0;
          if (user_data.role > 2) {
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
          } else if (user_data.role == 2) {
            if (user_data.status != 1) {
              status = 300;
              message = "Account is not active";
              flag_to_go = 1;
            }
          } else if (user_data.role == 1) {
            flag_to_go = 0;
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

};
