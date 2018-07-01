const config = require('../config/mainConfig').config;
const mysql = require('mysql');
const nodemailer = require('nodemailer');
const moment = require('moment');

/**
 * Отправка сообщения
 * @params params.textMess - текст сообщения
 * @params params.emailMess - мыло получателя
 * @params params.subjectMess - тема сообщения
 */
function sendEmail(params, callback) {
    console.log(params);
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
        to: params.emailMess,
        subject: params.subjectMess,
        text: params.textMess
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.log(error);
            return callback({result: false, note: 'Произошла ошибка доставке сообщения'});
        } else {
            console.log(info);
            return callback({result: true, note: 'Сообщение доставлено'});
        }
    });
}

/**
 * Отправка сообщения
 * @params req.body.textMess - текст сообщения
 * @params req.body.phoneMess - номер телефона получателя
 * @params callback
 *
 * 10 <= random < 55
 * random < 15   -   Сообщение отправлено
 * random >= 15   -   Произошла ошибка при отправке
 */
function sendSMS(params, callback) {
    console.log(params.body);
    let max = 17, min = 5, random = Math.floor(Math.random() * (max - min) + min);
    console.log(random);
    if (params.phoneMess.length === 11) {
        if (random < 15) {
            return callback({result: true, note: 'Сообщение доставлено'});
        } else {
            return callback({result: false, note: 'Произошла ошибка при отпраке'});
        }
    } else {
        return callback({result: false, note: 'Номер телефона некорректный'});
    }
}

/**
 * Отправка сообщения
 * @params callback
 */
module.exports.sendMessage = function (params, callback) {
    console.log(params);
    params.phoneMess ? sendSMS(params, callback) : sendEmail(params, callback);
};

/**
 * Добавить отчёт о доставке сообщения в БД
 * @params params.userId - id клиента
 * @params params.textMess - текст сообщения
 * @params params.phoneMess - номер телефона получателя
 * @params params.emailMess - мыло получателя
 * @params params.subjectMess - тема сообщения
 * @params callback
 */
module.exports.writeToTheDatabase = function (params, status, callback) {
    console.log(params);
    console.log(status);
    console.log(new moment().format('YYYY-MM-DD hh:mm:ss'));
    let connection = mysql.createConnection(config.database.connection);
    let sql, sqlParams;
    if (params.phoneMess) {
        sql = "INSERT INTO messeges (`clients_id`, `type_messages_id`, `subject`, `text`, " +
            "`to`, `dispatch_time`, `status`) values(?, 2, null, ?, ?, ?, ?)";
        sqlParams = [params.userId, params.textMess, params.phoneMess, new moment().format('YYYY-MM-DD hh:mm:ss'), status.result ? 1 : 0];
    } else {
        sql = "INSERT INTO messeges (`clients_id`, `type_messages_id`, `subject`, `text`, " +
            "`to`, `dispatch_time`, `status`) values(?, 1, ?, ?, ?, ?, ?)";
        sqlParams = [params.userId, params.subjectMess, params.textMess, params.emailMess,
            new moment().format('YYYY-MM-DD hh:mm:ss'), status.result ? 1 : 0];
    }
    connection.query(sql, sqlParams, function (err) {
        connection.destroy();
        if (err) {
            console.error(err);
            return callback('Ошибка записи в БД');
        }
        return callback(null);
    });
};

/**
 * Получение отчёта по сообщениям
 * @params params.id - id клиента
 * @params callback
 */
module.exports.getMessages = function (params, callback) {
    let connection = mysql.createConnection(config.database.connection);
    let sql = "select DATE_FORMAT(dispatch_time, \"%d-%m-%Y\") as dispatch_time, `to`, status from messeges " +
        "where clients_id = ?";
    connection.query(sql, [params.id],function (err, rows) {
        connection.destroy();
        console.log(rows);
        if (err) {
            console.error(err);
            return callback('Ошибка получения сообщений');
        }
        return callback(null, rows);
    });
};