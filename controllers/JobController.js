const { dateTime } = require("../helpers");
const logger = require("../logger");

async function create(req, res) {
    let status = 500
    let message = "Oops something went wrong!"
    let inputs = req.body;

    try {
        if (req.user_data.role < 4 || req.user_data.role == 6) {
            inputs["created_by"] = req.user_data.id;
            inputs["created_date"] = dateTime();

            if (req.user_data.role < 3){
                inputs["is_admin"] = 1
            }else if (req.user_data.role == 3 || req.user_data.role == 6){
                inputs["is_admin"] = 2
            }

            if (req.files && req.files.length > 0) {
                for (let i = 0; i < req.files.length; i++) {
                    if (req.files[i].fieldname == "attachement") {
                        inputs["attachement"] = "uploads/" + req.files[i].filename
                    } else {
                        inputs["cover_picture"] = "uploads/" + req.files[i].filename
                    }
                }
            }

            await knex("jobs").insert(inputs)

            status = 200
            message = "Job Created successfully!"
        } else {
            status = 300
            message = "You are not authorized to perform this action"
        }
    } catch (error) {
        status = 500
        message = error.message
        logger.error(error)
    }

    return res.json({ status, message })
}

async function getAllJobs(req, res) {
    let status = 500
    let message = "Oops something went wrong!"
    let list = []
    try {
        let query = 'select * from jobs';
        if (req.user_data.role == 3 || req.user_data.role == 6) {
            if (req.query.status) {
                query = query + ` where status = ${req.query.status} and created_by = ${req.user_data.id}`
            }else{
                query = query + ` where created_by = ${req.user_data.id}`
            }
        } else if (req.user_data.role < 3) {
            if (req.query.status) {
                query = query + ` where status = ${req.query.status}`
            }
        }else{
            return res.json({status : 300,message : 'You are not authorized',list : []})
        }

        await knex.raw(query + ` order by id desc`).then(response => {
            if (response[0].length > 0) {
                list = response[0]
            }
        })

        status = 200
        message = "data fetched successfully!"
    } catch (error) {
        status = 500
        message = error.message
        logger.error(error)
    }

    return res.json({ status, message, list })
}

async function getDetail(req, res) {
    let status = 500
    let message = "Oops something went wrong!"
    let detail = {};

    try {
        await knex("jobs").where("id", req.params.id).then(response => {
            if (response.length > 0) {
                detail = response[0];
                status = 200
                message = "Data fetched successfully!"
            } else {
                status = 300
                message = "No record found"
            }
        })
    } catch (error) {
        status = 500
        message = error.message
        logger.error(error)
    }

    return res.json({ status, message, detail })

}


async function update(req, res) {
    let status = 500
    let message = "Oops something went wrong!"
    let inputs = req.body;

    try {
        if (req.user_data.role < 4 || req.user_data.role == 6) {
            inputs["created_by"] = req.user_data.id;
            inputs["created_date"] = dateTime();

            if (req.files && req.files.length > 0) {
                for (let i = 0; i < req.files.length; i++) {
                    if (req.files[i].fieldname == "attachement") {
                        inputs["attachement"] = "uploads/" + req.files[i].filename
                    } else {
                        inputs["cover_picture"] = "uploads/" + req.files[i].filename
                    }
                }
            }

            await knex("jobs").where("id", req.params.id).update(inputs)

            status = 200
            message = "Job updated successfully!"
        } else {
            status = 300
            message = "You are not authorized to perform this action"
        }
    } catch (error) {
        status = 500
        message = error.message
        logger.error(error)
    }

    return res.json({ status, message })
}

async function changeStatus(req, res) {
    let status = 500
    let message = "Oops something went wrong!"

    try {
        if (req.user_data.role < 3) {
            await knex("jobs").where("id", req.params.id).update({
                status: req.params.status,
                updated_by: req.user_data.id,
                updated_date: dateTime()
            })

            status = 200
            message = "Job status changed successfully!"
        } else {
            status = 300
            message = "You are not authorized to perform this action"
        }
    } catch (error) {
        status = 500
        message = error.message
        logger.error(error)
    }

    return res.json({ status, message })
}

async function JobApplicantList(req,res){
    let status = 500
    let message = "Oops something went wrong!"
    let list = [];

    try {
        if (req.user_data.role < 2){
            let query = `select users.name,users.email,users.country_code,users.country_name,users.whatsapp_number,users.id as user_id,jobApplications.resume,jobApplications.apply_date from jobApplications inner join users on users.id = jobApplications.user_id where jobApplications.job_id = ${req.params.id} order by jobApplications.id desc`
            await knex.raw(query).then(response => {
                if (response[0].length > 0){
                    list = response[0]
                }
            })

            status = 200
            message = "List fetched successfully!"
        }else if (req.user_data.role == 3 || req.user_data.role == 6){
            let query = `select users.name,users.email,users.country_code,users.country_name,users.whatsapp_number,users.id as user_id,jobApplications.resume,jobApplications.apply_date from jobApplications inner join jobs on jobs.id= jobApplications.job_id inner join users on users.id = jobApplications.user_id where jobApplications.job_id = ${req.params.id} and jobs.created_by = '${req.user_data.id}' order by jobApplications.id desc`
            await knex.raw(query).then(response => {
                if (response[0].length > 0){
                    list = response[0]
                }
            })

            status = 200
            message = "List fetched successfully!"
        }else{
            status = 300
            message = "You are not authorized to perform this action"
        } 
    } catch (error) {
        status = 500
        message = error.message
        logger.error(error)
    }

    return res.json({status,message,list})
}

async function getStateByCountry(req,res){
    let status = 500
    let message = "Oops something went wrong!"
    let list = []

    try {
        await knex("states").where("country_id",req.params.country_id).then(response => list = response)
        status = 200
        message = "States fetched successfully!"
    } catch (error) {
        status = 500
        message = error.message
        logger.error(error)
    }

    return res.json({status,message,list})
}

async function getCityByState(req,res){
    let status = 500
    let message = "Oops something went wrong!"
    let list = []

    try {
        await knex("cities").where("state_id",req.params.state_id).then(response => list = response)

        status = 200
        message = "Cities fetched successfully!"
    } catch (error) {
        status = 500
        message = error.message
        logger.error(error)
    }

    return res.json({status,message,list})
}

async function deleteJobDtata(req, res){
    let status = 500
    let message = "Oops Something Went Wrong"
    let {id} = req.params

    try{
        let findQuery = await knex("jobs").where("id", id).then(async (response) => {
            if(response.length > 0){
                let deleteJobApplicant = await knex("jobApplications").where("job_id", id).del()
                let deleteJob = await knex("jobs").where("id", id).del()
                status = 200
                message = "Job delted Successfully"
            }else{
                status = 300
                message = "You Have Enter The Wrong ID"
            }
        })
    }catch(error){
        status = 500
        message = error.message
        logger.error(error)
    }
    res.json({status, message})
}

module.exports = {
    create,
    getAllJobs,
    getDetail,
    update,
    changeStatus,
    JobApplicantList,
    getStateByCountry,
    getCityByState,
    deleteJobDtata
}