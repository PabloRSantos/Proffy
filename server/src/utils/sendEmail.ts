import nodemailer from 'nodemailer'
import path from 'path'
import hbs from 'nodemailer-express-handlebars'

    const transporte = nodemailer.createTransport({
        host: process.env.HOST_EMAIL,
        port: 587,
        auth: {
          user: process.env.USER_EMAIL,
          pass: process.env.PASSWORD_EMAIL
        },
    })

    transporte.use('compile', hbs({
        viewEngine: {
            defaultLayout: undefined,
            partialsDir: path.resolve(__dirname, 'emailTemplates')
        },
        viewPath: path.resolve(__dirname, 'emailTemplates'),
        extName: '.hbs'
    }))

   

export default transporte

