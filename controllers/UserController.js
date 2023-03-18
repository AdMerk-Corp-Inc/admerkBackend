const logger = require("../logger");
const MD5 = require('MD5')
const jwt = require("jsonwebtoken");
const HELPERS = require('../helpers')
var random = require('random-string-alphanumeric-generator');

async function register(req, res) {
    let status = 500
    let message = "Oops something went wrong!"
    let inputs = req.body;
    let user_data = {}
    try {
        inputs.password = MD5(inputs.password)
        await knex("users").where("email", inputs.email).where("password", inputs.password).then(async response => {
            if (response.length > 0) {
                status = 300
                message = "User with this email already exist"
            } else {
                inputs["created_date"] = HELPERS.dateTime()

                if (req.files && req.files.length > 0) {
                    for (let i=0;i<req.files.length;i++){
                        if (req.files[i].fieldname == 'image'){
                            inputs["profile_photo"] = "uploads/" + req.files[0].filename
                        }else if (req.files[i].fieldname == 'passport'){
                            inputs["passport"] = "uploads/" + req.files[0].filename
                        }
                    }
                }

                await knex("users").insert(inputs, "id").then(async user_response => {
                    if (user_response[0]) {
                        let new_password = random.randomAlphanumeric(6, "lowercase")
                        new_password = new_password + ":" + user_response[0]
                        await knex("users").where("id", user_response[0]).update({
                            email_code: new_password
                        }).then(async response => {
                            await HELPERS.sendMail(inputs.email, 'verifyemail', {
                                username: inputs.name,
                                verifyLink: HELPERS.react_url + `verifyemail?token=${new_password}`
                            }, "Verify Your Account")
                        })
                    }
                })

                status = 200
                message = "We have sent an email to verify your account. Check your email to verify!"
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
                let flag_to_go = 0
                if (user_data.role > 2) {
                    if (user_data.status != 1) {
                        status = 300
                        message = "Account is not active"
                        flag_to_go = 1
                    }

                    if (user_data.email_verified != 1) {
                        status = 301
                        message = "Account is not verified yet"
                        flag_to_go = 1
                    }
                } else if (user_data.role == 2) {
                    if (user_data.status != 1) {
                        status = 300
                        message = "Account is not active"
                        flag_to_go = 1
                    }
                } else if (user_data.role == 1) {
                    flag_to_go = 0;
                }

                if (flag_to_go == 0) {
                    user_data["token"] = jwt.sign(
                        { user_data: user_data },
                        process.env.SECRET_KEY
                    );

                    status = 200
                    message = "User logged in successfully!"
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

async function getAllUsers(req, res) {
    let status = 500
    let message = "Oops something went wrong!"
    let list = []
    let { search, page, role } = req.query;
    let offset = (page - 1) * 10;
    try {
        if (req.user_data.role < 3) {
            let query = `select * from users`
            let where_query = ''
            if (search) {
                where_query = ` where (users.name like '%${search}%' or users.email like '%${search}%' or users.whatsapp_number like '%${search}%') `

                if (role) {
                    where_query = where_query + ` and users.role = ${role} `
                }
            } else if (role) {
                where_query = where_query + ` where users.role = ${role} `
            }

            await knex.raw(query + where_query + ` order by id desc LIMIT 10 offset ${offset}`).then(response => {
                if (response[0].length > 0) {
                    list = response[0]
                }
            })

            status = 200
            message = "data fetched successfully!"
        } else {
            status = 300
            message = "You don't have permission"
        }
    } catch (error) {
        status = 500
        message = error?.message
        logger.error(error)
    }

    return res.json({ status, message, list })
}

async function detail(req, res) {
    let status = 500
    let message = "Oops something went wrong!"
    let detail = {}

    try {
        await knex('users').where("id", req.params.id).then(response => {
            if (response.length > 0) {
                detail = response[0]
                status = 200
                message = "Data fetched successfully!"
            } else {
                status = 300
                message = "User data found"
            }
        })
    } catch (error) {
        status = 500
        message = error?.message
        logger.error(error)
    }

    return res.json({ status, message, detail })
}

async function resetPassword(req, res) {
    let status = 500
    let message = "Oops something went wrong!"
    let inputs = req.body;

    try {
        let new_password = random.randomAlphanumeric(6, "lowercase")

        await knex('users').where("email", inputs.email).update({
            password: MD5(new_password)
        }).then(async response => {
            await HELPERS.sendMail(inputs.email, "ForgotPassword", {
                username: inputs.email,
                password: new_password,
                url: HELPERS.react_url + "login"
            })
        })

        status = 200
        message = "Password reset link sent successfully!"

    } catch (error) {
        status = 500
        message = error.message
        logger.error(error)
    }

    return res.json({ status, message })
}

async function changePassword(req, res) {
    let status = 500
    let message = "Oops something went wrong!"

    try {
        await knex('users').where('id', req.user_data.id).update({
            password: MD5(req.body.password)
        })

        status = 200
        message = "Password updated successfully!"
    } catch (error) {
        status = 500
        message = error.message
        logger.error(error)
    }

    return res.json({ status, message })
}

async function verifyEmail(req, res) {
    let status = 500
    let message = "Oops something went wrong!"
    let user_data = {};

    try {
        let forgot_password_token = req.params.token.split(":")

        await knex('users').where("id", forgot_password_token[1]).where("email_code", req.params.token).then(async response => {
            if (response.length > 0) {
                await knex('users').where("id", response[0].id).update({
                    email_verified: 1,
                    email_code: ''
                })

                status = 200
                message = "Your account is verified please log in now"
            } else {
                status = 300
                message = "Unable to verify email"
            }
        })
    } catch (error) {
        status = 500
        message = error.message
        logger.error(error)
    }

    return res.json({ status, message, user_data })
}

async function resendVerification(req, res) {
    let status = 500
    let message = "Oops something went wrong!"

    try {
        await knex('users').where('email', req.params.email).then(async email_response => {
            if (email_response.length > 0) {
                let new_password = random.randomAlphanumeric(6, "lowercase")
                new_password = new_password + ":" + email_response[0].id
                await knex("users").where("id", email_response[0].id).update({
                    email_code: new_password,
                    email_verified : 2
                }).then(async response => {
                    await HELPERS.sendMail(req.params.email, 'verifyemail', {
                        username: email_response[0].name,
                        verifyLink: HELPERS.react_url + `verifyemail?token=${new_password}`
                    }, "Verify Your Account")
                })

                status = 200
                message = "Email verification has been sent"
            } else {
                status = 300
                message = "No email found"
            }
        })
    } catch (error) {
        status = 500
        message = error.message
        logger.error(error)
    }

    return res.json({ status, message })
}

async function changeStatus(req,res){
    let status = 500
    let message = "Oops something went wrong!"
    
    try {
        if (req.user_data.role < 3){
            await knex('users').where('id',req.params.id).update({
                status : req.params.status,
                updated_by : req.user_data.id,
                updated_date : HELPERS.dateTime()
            })

            status = 200
            message = "Data updated successfully!"
        }else{
            status = 300
            message = "You are not authorized to perform this action"
        }
    } catch (error) {
        status = 500
        message = error.message;
        logger.error(error)
    }

    return res.json({status,message})
}

module.exports = {
    login,
    register,
    getAllUsers,
    detail,
    resetPassword,
    changePassword,
    verifyEmail,
    resendVerification,
    changeStatus
}