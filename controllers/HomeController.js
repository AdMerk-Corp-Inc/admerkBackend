const logger = require("../logger")

async function HomeFeed(req,res){
    let status = 500
    let message = "Oops something went wrong!"

    try {
        
    } catch (error) {
        status = 500
        message = error?.message
        logger.error(error)
    }
}

module.exports = {
    HomeFeed
}