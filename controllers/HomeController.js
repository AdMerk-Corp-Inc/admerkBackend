const logger = require("../logger")

async function HomeFeed(req,res){
    let status = 500
    let message = "Oops something went wrong!"
    let inputs = req.body;
    let list = []
    try {
        let query = `select * from users`
        let where_query = ` where (users.role = 4)`
        let offset = (inputs.page - 1) * 20

        if (inputs.skill){
            where_query = where_query + ` and find_in_set('${inputs.skill}',users.skills)`
        }

        if (inputs.hobby){
            where_query = where_query + ` and find_in_set('${inputs.hobby}',users.hobby)`
        }

        if (inputs.gender){
            where_query = where_query + ` and users.gender = '${inputs.gender}'`
        }

        if (inputs.country){
            where_query = where_query + ` and users.country_id = '${inputs.country_id}'`
        }

        if (inputs.search){
            where_query = where_query + ` and (users.name LIKE '%${inputs.search}%')`
        }


        await knex.raw(query + where_query + `order by RAND() LIMIT 20 offset ${offset}` ).then(response => {
            if (response[0].length > 0){
                list = response[0]
            }
        })

        status = 200
        message = "Data fetched successfully!"

    } catch (error) {
        status = 500
        message = error?.message
        logger.error(error)
    }

    return res.json({status,message,list})
}

module.exports = {
    HomeFeed
}