const { dateTime } = require("../helpers")
const logger = require("../logger")

async function apply(req,res){
    let status = 500
    let message = "Oops something went wrong!"

    try {
        await knex('jobApplications').where("job_id",req.params.id).where("user_id",req.user_data.id).then(async response => {
            if (response.length > 0){
                status = 300
                message = "You have already applied on job"
            }else{
                let create_obj = {
                    job_id : req.params.id,
                    user_id : req.user_data.id,
                    apply_date : dateTime(),
                }

                if (req.files && req.files.length > 0){
                    create_obj["resume"] = "uploads/" + req.files[0].filename
                }

                await knex("jobApplications").insert(create_obj).then(async create_response => {
                    if (create_response){
                        await knex("jobs").where("id",req.params.id).then(async job_response => {
                            if (job_response.length > 0){
                                await knex("jobs").where("id",req.params.id).update({
                                    applied_count : parseInt(job_response[0].applied_count) + 1
                                })
                            }
                        })
                    }
                })

                status = 200
                message = "Applied successfully!"
            }
        })
    } catch (error) {
        status = 500
        message = error?.message
        logger.error(error)
    }

    return res.json({status,message})
}

module.exports = {
    apply
}