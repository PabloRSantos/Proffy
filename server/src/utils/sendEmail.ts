import nodemailer from 'nodemailer'
import path from 'path'
import hbs from 'nodemailer-express-handlebars'

    const transporte = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 587,
        auth: {
          user: 'pablorsantos15@gmail.com',
          pass:  'prs100502'// generated ethereal password
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

