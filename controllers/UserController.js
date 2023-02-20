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
        await knex("users").where("email", inputs.email).where("password", inputs.password).then(async response => {
            if (response.length > 0) {
                status = 300
                message = "User with this email already exist"
            } else {
                inputs["created_date"] = HELPERS.dateTime()

                if (req.files && req.files.length > 0) {
                    inputs["profile_photo"] = "uploads/" + req.files[0].filename
                }

                await knex("users").insert(inputs, "id").then(async user_response => {
                    if (user_response[0]) {
                        await knex("users").where("id", user_response[0]).then(user_output => {
                            if (user_output.length > 0) {
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
            } else {
                where_query = where_query + `where users.role = ${role} `
            }

            await knex.raw(query + where_query + `order by id desc LIMIT ${page} offset ${offset}`).then(response => {
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

    return res.json({ status, message,list })
}

async function detail(req,res){
    let status = 500
    let message = "Oops something went wrong!"
    let detail = {}

    try {
        await knex('users').where("id",req.params.id).then(response => {
            if (response.length > 0){
                detail = response[0]
                status = 200
                message = "Data fetched successfully!"
            }else{
                status = 300
                message = "User data found"
            }
        })
    } catch (error) {
        status = 500
        message = error?.message
        logger.error(error)
    }

    return res.json({status,message,detail})
}

module.exports = {
    login,
    register,
    getAllUsers,
    detail
}