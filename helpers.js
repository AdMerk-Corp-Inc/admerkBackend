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
                from: MailConfig.fromEmail,
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

const react_url = "http://localhost:3000/"

let dashboard_count_schema = [
    {
        variable: 'role',
        table_name: 'users',
        actions: [
            {
                taker: 4,
                update_on: 'refugee'
            },
            {
                taker: 5,
                update_on: 'job_seeker'
            },
            {
                taker: 6,
                update_on: 'company'
            },
            {
                taker: 3,
                update_on: 'sponsor'
            },
            {
                taker: 2,
                update_on: 'volunteer'
            }
        ]
    },
    {
        variable: 'status',
        table_name: 'jobs',
        actions: [
            {
                taker: 'all',
                update_on: 'jobs'
            },
            {
                taker: 1,
                update_on: 'open_jobs'
            },
            {
                taker: 2,
                update_on: 'closed_jobs'
            }
        ]
    },
    {
        variable: 'status',
        table_name: 'tickets',
        actions: [
            {
                taker: 'all',
                update_on: 'tickets'
            },
            {
                taker: 1,
                update_on: 'open_tickets'
            },
            {
                taker: 2,
                update_on: 'close_tickets'
            }
        ]
    }

]

module.exports = {
    current_date,
    dateTime,
    sendMail,
    react_url,
    dashboard_count_schema
}