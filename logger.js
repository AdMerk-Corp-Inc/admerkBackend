const {createLogger,format,transports} = require('winston');

const customFormat = format.combine(format.timestamp(),format.printf((info)=>{
    return `${info.timestamp}  [${info.level.toUpperCase().padEnd(7)}] - ${info.message}`
}))

const logger = createLogger({
    format : customFormat,
    transports : [
        new transports.Console(),
        new transports.File({
            dirname : 'logs',
            filename : `${new Date().toLocaleDateString().replace("/","-").replace("/","-")}.log`
        })
    ]
});

module.exports = logger;