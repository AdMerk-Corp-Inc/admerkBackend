const { dateTime } = require("../helpers");
const logger = require("../logger");

async function create(req, res) {
    let status = 500
    let message = "Oops something went wrong!"
    let inputs = req.body;

    try {
        if (req.user_data.role < 3) {
            inputs["created_by"] = req.user_data.id;
            inputs["created_date"] = dateTime();

            if (req.files && req.files.length > 0) {
                for (let i = 0; i < req.files.length; i++) {
                    if (req.files[i].fieldname == "attachement") {
                        inputs["attachement"] = "uploads/" + req.files[0].filename
                    } else {
                        inputs["cover_picture"] = "uploads/" + req.files[0].filename
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
        if (req.user_data.role > 2) {
            query = query + ` where status = 1`
        } else {
            if (req.query.status) {
                query = query + ` where status = ${req.query.status}`
            }
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
        if (req.user_data.role < 3) {
            inputs["created_by"] = req.user_data.id;
            inputs["created_date"] = dateTime();

            if (req.files && req.files.length > 0) {
                for (let i = 0; i < req.files.length; i++) {
                    if (req.files[i].fieldname == "attachement") {
                        inputs["attachement"] = "uploads/" + req.files[0].filename
                    } else {
                        inputs["cover_picture"] = "uploads/" + req.files[0].filename
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


module.exports = {
    create,
    getAllJobs,
    getDetail,
    update,
    changeStatus,
    JobApplicantList
}