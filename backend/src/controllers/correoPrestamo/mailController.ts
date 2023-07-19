const nodemailer = require('nodemailer');
const dotenv = require('dotenv');
dotenv.config();

const sendMail = (req, res) => {
    let directory = []
    const { from, asunto } = req.body
    const token = process.env.PW
    if (!token) {
        return res.status(400).send({ message: "No se ha entregado la contraseña de aplicación para el correo" })
    }
    const transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 465,
        secure: true,
        auth: {
            user: 'correos.tgf@gmail.com',
            pass: token
        }
    })


    const mailOptions = {
      from: `Enviado por ${from}`,
      to: `minelyne@gmail.com`,
      subject: `${asunto}`,
      text: 'TEST',
      html: `hola`
  }
  transporter.sendMail(mailOptions, (err, info) => {
      if (err) {
        console.log(err)
          return res.status(400).send({ message: 'Error al enviar el correo' })
      }
      return res.status(200).send({ message: 'Mensaje enviado' })
  })

    transporter.verify().then(() => {
        console.log('Servidor de correos habilitado')
    }).catch(err => {
        console.log('Error al utilizar servidor de correos')
    })
}

export{ sendMail };