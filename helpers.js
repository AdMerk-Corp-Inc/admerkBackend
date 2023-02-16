const moment = require('moment-timezone');

function current_date(){
    return moment().tz(process.env.TIME_ZONE).format('YYYY-MM-DD')
}
function dateTime(){
    return moment().tz(process.env.TIME_ZONE).format('YYYY-MM-DD HH:mm:ss');
}

module.exports = {
    current_date,
    dateTime
}