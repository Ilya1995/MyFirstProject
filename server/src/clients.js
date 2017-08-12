require('./console.js');
// var mysql = require('mysql');
// var async = require('async');
var config = require('../config/mainConfig').config;
const nodemailer = require('nodemailer');


/**
 * Отправка регистрационных данных клиенту
 * @params params.login - логин
 * @params params.password - пароль
 * @params params.email - емэйл
 * @params callback
 */
module.exports.sendEmail = function (params, callback) {
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
        to: params.email,
        subject: 'Регистрация',
        text: 'Доброго времени суток! Ваши регистрационные данные с сайта ******, логин - ' + params.login + ', пароль - ' +
            params.password + '. Не сообщайте свои персональные данные никому. С уважением, администрация сайта. '
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return callback('Ошибка при доставке сообщения');
        }
        console.log(info);
        return callback(null, 'Сообщение доставленно');
    });
};