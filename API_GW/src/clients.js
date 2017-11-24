require('./console.js');
// var mysql = require('mysql');
// var async = require('async');
var config = require('../config/mainConfig').config;
const nodemailer = require('nodemailer');
var request = require('request');
const serviceRegistry = require('../../common-utils/serviceRegistry');

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

/**
 * Пополнение баланса клиенту
 * @params params.userId - логин
 * @params params.sum - пароль
 * @params callback
 */
module.exports.replenishBalance = function (params, callback) {
    console.log(params);
    send(params,'replenish', function (err, data) {
        if (err) {
            return callback(err);
        }
        return callback(null, data);
    });
};

function send (params, funk, callback) {
    console.log(params);

    console.log(serviceRegistry.servicesInfo);
    var primaryUrl, service;
    if (serviceRegistry.servicesInfo && serviceRegistry.servicesInfo[config.MODULE_USERS.name]) {
        service = serviceRegistry.servicesInfo[config.MODULE_USERS.name];
        if (service.status === 'critical') {
            return callback('Сервис ' + config.MODULE_USERS.name + ' недоступен');
        }
        primaryUrl = 'http://' + service.address + ':' + service.port;
    } else {
        primaryUrl = config.MODULE_USERS.HOST + ':' + config.MODULE_USERS.PORT;
    }
    var reqParams = {
        method: 'PUT',
        url: primaryUrl + '/api/' + funk,
        headers: {
            'Content-Type': 'application/json'
        }
    };
    params ? reqParams.body = JSON.stringify(params) : null;
    request(reqParams, function (err, res, body) {
        if (err) {
            return callback(err);
        }
        try {
            body = JSON.parse(body);
            console.log(body);
        } catch (e) {
            return callback('Ошибка при парсинге ответа');
        }
        return callback(null, body);
    });
}