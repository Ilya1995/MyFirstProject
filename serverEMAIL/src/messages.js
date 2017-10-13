require('./console.js');
const nodemailer = require('nodemailer');
const config = require('../config/mainConfig').config;


/**
 * Отправка сообщения
 * @params params.textMess - текст сообщения
 * @params params.emailMess - мыло получателя
 * @params params.subjectMess - тема сообщения
 */
module.exports.sendMessage = function (req, res) {
    console.log(req.body);
    let configEmail = config.sendEmail;
    let transporter = nodemailer.createTransport({
        host: configEmail.host,
        port: configEmail.port,
        secure: configEmail.secure,
        auth: {
            user: configEmail.user,
            pass: configEmail.pass
        }
    });
    let mailOptions = {
        from: configEmail.user,
        to: req.body.emailMess,
        subject: req.body.subjectMess,
        text: req.body.textMess
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.log(error);
            res.send({result: false, note: 'Произошла ошибка доставке сообщения'});
        } else {
            console.log(info);
            res.send({result: true, note: 'Сообщение доставлено'});
        }
    });
};