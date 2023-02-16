const logger = require("../logger");

async function register(req,res){
    let status = 500
    let message = "Oops something went wrong!"
    let inputs = req.body;
    let user_data = {}
    try {
        
    } catch (error) {
        status = 500
        message = error.message
        logger(error)
    }

    return res.json({status,message,user_data})

}