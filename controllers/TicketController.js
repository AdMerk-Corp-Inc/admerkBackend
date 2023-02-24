const { dateTime } = require("../helpers");
const logger = require("../logger")

async function create(req,res){
    let status = 500
    let message = "Oops something went wrong!"
    let inputs = req.body

    try {
        inputs["created_by"] = req.user_data.id;
        inputs["created_date"] = dateTime()

        await knex("tickets").insert(inputs)

        status = 200
        message = "Ticket created successfully!"
    } catch (error) {
        status = 500
        message = error.message
        logger.error(error)
    }

    return res.json({status,message})
}

async function getAll(req,res){
    let status = 500
    let message = "Oops something went wrong!"
    let list = []

    try {
        let query = ''
        if (req.query.status){
            query = `select tickets.status,tickets.created_date,tickets.title,tickets.id,users.name,users.email,users.country_code,users.whatsapp_number,users.id as user_id from tickets inner join users on users.id=tickets.created_by where tickets.status = ${req.query.status}`

            if (req.user_data.role > 2 ){
                query = query + ` and tickets.created_by = '${req.user_data.id}'`
            }
        }else{
            query = `select tickets.status,tickets.created_date,tickets.title,tickets.id,users.name,users.email,users.country_code,users.whatsapp_number,users.id as user_id from tickets inner join users on users.id=tickets.created_by`

            if (req.user_data.role > 2 ){
                query = query + ` where tickets.created_by = '${req.user_data.id}'`
            }
        }

        console.log(query)

        await knex.raw(query + ' order by tickets.id desc').then(response => {
            if (response[0].length > 0){
                list = response[0]
            }
        })

        status = 200
        message = "ticket fetched successfully!"
    } catch (error) {
        status = 500
        message = error.message
        logger.error(error)
    }

    return res.json({status,message,list})
}

async function detail(req,res){
    let status = 500
    let message = "Oops something went wrong!"
    let detail = {}

    try {
        if (req.user_data.role > 2){
            await knex("tickets").where("id",req.params.id).where("created_by",req.user_data.id).then(response => {
                if (response.length > 0){
                    detail = response[0]
                }
            })
        }else{
            await knex("tickets").where("id",req.params.id).then(response => {
                if (response.length > 0){
                    detail = response[0]
                }
            })
        }
        status = 200
        message = "Data fetched"
    } catch (error) {
        status = 500
        message = error.message
        logger.error(error)        
    }

    return res.json({status,message,detail})
}

async function changeStatus(req,res){
    let status = 500
    let message = "Oops something went wrong!"
    
    try {
        if (req.user_data.role > 2){
            await knex("tickets").where("id",req.params.id).where("created_by",req.user_data.id).update({
                'status' : req.params.status,
                updated_by : req.user_data.id,
                updated_date : dateTime()
            }).then(response => {
                if (response.length > 0){
                    detail = response[0]
                }
            })
        }else{
            await knex("tickets").where("id",req.params.id).update({
                'status' : req.params.status,
                updated_by : req.user_data.id,
                updated_date : dateTime()
            }).then(response => {
                if (response.length > 0){
                    detail = response[0]
                }
            })
        }

        status = 200
        message = "Status updated successfully!"
    } catch (error) {
        status = 500
        message = error.message
        logger.error(error)        
    }

    return res.json({status,message,detail})

}

module.exports = {
    create,
    getAll,
    detail,
    changeStatus
}