const logger = require("../logger");
const MD5 = require('MD5')
const jwt = require("jsonwebtoken");
const HELPERS = require('../helpers')

async function register(req, res) {
    let status = 500
    let message = "Oops something went wrong!"
    let inputs = req.body;
    let user_data = {}
    try {
        inputs.password = MD5(inputs.password)
        await knex("users").where("email",inputs.email).where("password",inputs.password).then(async response => {
            if (response.length > 0){
                status = 300
                message = "User with this email already exist"
            }else{
                inputs["created_date"] = HELPERS.dateTime()

                if (req.files && req.files.length > 0){
                    inputs["profile_photo"] = "uploads/" + req.files[0].filename
                }

                await knex("users").insert(inputs,"id").then(async user_response => {
                    if (user_response[0]){
                        await knex("users").where("id",user_response[0]).then(user_output => {
                            if (user_output.length > 0){
                                user_data = user_output[0]
                                user_data["token"] = jwt.sign(
                                    { user_data: user_data },
                                    process.env.SECRET_KEY
                                );
                            }
                        })
                    }
                })

                status = 200
                message = "User created successfully!"
            }
        })
    } catch (error) {
        status = 500
        message = error.message
        logger.error(error)
    }

    return res.json({ status, message, user_data })

}

async function login(req, res) {
    let status = 500
    let message = "Oops something went wrong!"
    let inputs = req.body;
    let user_data = {}
    try {
        await knex('users').where('email', inputs.email).where('password', MD5(inputs.password)).then(response => {
            if (response.length > 0) {
                user_data = response[0];
                if (user_data.status == 1) {
                    user_data["token"] = jwt.sign(
                        { user_data: user_data },
                        process.env.SECRET_KEY
                    );

                    status = 200
                    message = "User logged in successfully!"
                } else {
                    status = 300
                    message = "Account is not active"
                }
            } else {
                status = 300
                message = "Incorrect Email & Password"
            }
        })
    } catch (error) {
        status = 500
        message = error.message
        logger.error(error)
    }

    return res.json({ status, message, user_data })
}

module.exports = {
    login,
    register
}