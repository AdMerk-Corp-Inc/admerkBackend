const logger = require("../logger")

async function create(req,res){
    let status = 500
    let message = "Oops something went wrong!"
    let inputs = req.body;

    try {
        await knex("skills").where("name",inputs.name).then(async response => {
            if (response.length > 0){
                status = 300
                message = "Skill already exist"
            }else{
                await knex("skills").insert(inputs).then(response1 => {
                    if (response1){
                        status = 200
                        message = "Skill created successfully!"
                    }
                })
            }
        })
    } catch (error) {
        status = 500
        message = error.message
        logger.error(error)
    }

    return res.json({status,message})
}

async function getList(req,res){
    let status = 500
    let message = "Oops something went wrong!"
    let list = []

    try {
        await knex("skills").orderBy("id","desc").then(response => list = response)

        status = 200
        message = "Skill fetched successfully!"
    } catch (error) {
        status = 500
        message = error.message
        logger.error(error)
    }

    return res.json({status,message,list})
}

async function getDetail(req,res){
    let status = 500
    let message = "Oops something went wrong!"
    let detail = {}

    try {
        await knex("skills").where("id",req.params.id).then(response => {
            if (response.length > 0){
                detail = response[0]
            }else{
                status = 300
                message = "No record found successfully!"
            }
        })

        status = 200
        message = "Skill fetched successfully!"
    } catch (error) {
        status = 500
        message = error.message
        logger.error(error)
    }

    return res.json({status,message,detail})
}

async function update(req,res){
    let status = 500
    let message = "Oops something went wrong!"
    let inputs = req.body;

    try {
        await knex("skills").where("id","!=",req.params.id).where("name",inputs.name).then(async response => {
            if (response.length > 0){
                status = 300
                message = "Skill already exist"
            }else{
                await knex("skills").where("id",req.params.id).update(inputs).then(response1 => {
                    if (response1){
                        status = 200
                        message = "Skill updated successfully!"
                    }
                })
            }
        })
    } catch (error) {
        status = 500
        message = error.message
        logger.error(error)
    }

    return res.json({status,message})
}

async function deleteData(req,res){
    let status = 500
    let message = "Oops something went wrong!"

    try {
        await knex("skills").where("id",req.params.id).del()

        status = 200
        message = "Skill deleted successfully!"
    } catch (error) {
        status = 500
        message = error.message
        logger.error(error)
    }

    return res.json({status,message})
}

module.exports = {
    create,
    getList,
    getDetail,
    update,
    deleteData
}