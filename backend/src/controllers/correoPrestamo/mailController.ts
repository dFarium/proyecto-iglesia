import {Response} from "express";

const nodemailer = require('nodemailer');
const dotenv = require('dotenv');
dotenv.config();

const sendMail = (from: string, asunto: string, correo: string, contenido: string) => {
    let directory = []
    //const { from, asunto } = req.body
    const token = process.env.PW
    if (!token) {
        console.log("No se ha entregado la contraseña de aplicación para el correo");
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
      to: `${correo}`,
      subject: `${asunto}`,
      text: `${contenido}`,
      html: `${contenido}`
  }
    transporter.sendMail(mailOptions, (err: any, info: any) => {
        if (err) {
            console.log(err);
        }
        console.log("Correo enviado");
    });

    transporter.verify().then(() => {
        console.log('Servidor de correos habilitado');
    }).catch((err: any) => {
        console.log('Error al utilizar servidor de correos:', err);
    });
}

export{ sendMail };