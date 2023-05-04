const { dateTime } = require("../helpers");
const logger = require("../logger");

class BidController {
    static async createBid(req, res){
        let status = 500
        let message = "Oops something went wrong!"
        
        try {
            const {post_id} =req.params
            let data = {
                user_id:  req.user_data.id,
                post_id: post_id,
                created_date: dateTime(),
            }
            
            status = 200;
            message = "bid Created successfully!"
          

            await knex("bid").insert(data)
        } catch (error) {
            status = 500,
            message = error.message
            logger.error(error)
        }

        return res.json({ status, message })
    }

    static async myBids(req, res){
        let status = 500
        let message = "Oops something went wrong!"
        let list = []
        try {
            await knex("bid").where("id",req.params.id).then(response => list = response)

            status = 200
            message = "bids fetched successfully!"
        } catch (error) {
            status = 500
            message = error.message
            logger.error(error)
        }
        return res.json({status,message,list})
    }

}
module.exports = BidController