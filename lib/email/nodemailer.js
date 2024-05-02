import nodemailer from 'nodemailer';
import emailConfirmationTemplate from './templates/email_confirmation';
require('dotenv').config()

const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: 587,
    secure: false,
    auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS
    },
    tls: {
        // do not fail on invalid certs
        rejectUnauthorized: false,
    },
});

export function sendEmail(from = 'test@flate.pro', to = 'test@flate.pro', subject = "Sending Email using Node.js", template, data = {}) {
    try {

        const emailTemplateObject = emailTemplate(template, to, data)

        let resFields = { from: from, to: to, subject: subject }

        if (!emailTemplate.error) {
            resFields = { ...resFields, ...emailTemplateObject }
            
            const emailResult = transporter.sendMail(resFields, function (error, info) {
                if (error) {
                    return({ result: false, info: error });
                } else {
                    return({ result: true, info: info });
                }
            });
            // console.log('emailResult', emailResult)
            return emailResult
        } else {
            return { error: emailTemplate.error }
        }
    } catch (error) {
        console.error({ error })
    }
}

function emailTemplate(template = 'default', to, data = {}) {
    let result = {}

    if (template == 'default') {
        result.text = data.text //  Никаких действий с текстом
    }else if (template == 'email_confirmation'){
        // console.log('data', data)
        const text = emailConfirmationTemplate(data.code)
        // // console.log(text)
        result.html = text
    }

    if (!result) {
        return { error: 'No text accepted' }
    } else {
        return {...result}
    }
}