const moment = require('moment-timezone');
const nodemailer = require('nodemailer');
const HBS = require('nodemailer-express-handlebars');
const MailConfig = require('./configs/MailConfig');

let transporter = nodemailer.createTransport({
    host: MailConfig.hostName,
    port: MailConfig.port,
    auth: {
        user: MailConfig.username,
        // pass: process.env.password
        pass: MailConfig.password
    },
    tls: {
        rejectUnauthorized: false
    }
})

let options = {
    viewEngine: {
        extName: ".hbs",
        partialsDir: './views/emails',
        layoutsDir: './views/emails',
        defaultLayout: 'layout.hbs',
    },
    viewPath: './views/emails',
    extName: '.hbs'
}

async function sendMail(to, template, myContext, subject) {
    return new Promise(async function (resolve, reject) {
        try {
            transporter.use("compile", HBS(options));
            let info = await transporter.sendMail({
                from: MailConfig.username,
                to: to,
                subject: subject,
                template: template,
                context: myContext,
            })
            resolve()
        } catch (error) {
            reject(error)
        }
    })
}

function current_date() {
    return moment().tz(process.env.TIME_ZONE).format('YYYY-MM-DD')
}
function dateTime() {
    return moment().tz(process.env.TIME_ZONE).format('YYYY-MM-DD HH:mm:ss');
}

module.exports = {
    current_date,
    dateTime,
    sendMail
}