const { dashboard_count_schema } = require("../helpers")
const logger = require("../logger")

async function getCount(req, res) {
    let status = 500
    let message = "Oops something went wrong!"
    let counts = {
        refugee: 0,
        sponsor: 0,
        volunteer: 0,
        jobs: 0,
        open_jobs: 0,
        closed_jobs: 0,
        tickets: 0,
        open_tickets: 0,
        close_tickets: 0

    }

    let data_to_take = dashboard_count_schema

    try {
        for (let i=0;i<data_to_take.length;i++){
            let current_item = data_to_take[i];

            for (let j=0;j<current_item.actions.length;j++){
                let query = `select count(id) as total from ${current_item.table_name} where ${current_item.variable} = ${current_item.actions[j].taker}`;
                
                if (current_item.actions[j].taker == "all"){
                    query = `select count(id) as total from ${current_item.table_name}`;
                }

                await knex.raw(query).then(response => {
                    if (response[0].length > 0){
                        counts[current_item.actions[j].update_on] = response[0][0].total
                    }
                })
            }
            
        }

        status = 200
        message = 'Data fetched successfully!'
    } catch (error) {
        status = 500
        message = error.message
        logger.error(error)
    }

    return res.json({ status, message, counts })
}

module.exports = {
    getCount
}