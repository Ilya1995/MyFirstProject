require('./console.js');
var mysql = require('mysql');
var config = require('../config/mainConfig').config;
var request = require('request');
var moment = require('moment');


/**
 * Получение отчёта по сообщениям
 * @params callback
 */
module.exports.getMessages = function (callback) {
    let connection = mysql.createConnection(config.database.connection);
    let sql = "select DATE_FORMAT(dispatch_time, \"%d-%m-%Y\") as dispatch_time, `to`, status from messeges";
    connection.query(sql, function (err, rows) {
        connection.destroy();
        console.log(rows);
        if (err) {
            console.error(err);
            return callback('Ошибка получения сообщений');
        }
        return callback(null, rows);
    });
};

/**
 * Добавить отчёт о доставке сообщения в БД
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
            "`to`, `dispatch_time`, `status`) values(null, 2, null, ?, ?, ?, ?)";
        sqlParams = [params.textMess, params.phoneMess, new moment().format('YYYY-MM-DD hh:mm:ss'), status.result ? 1 : 0];
    } else {
        sql = "INSERT INTO messeges (`clients_id`, `type_messages_id`, `subject`, `text`, " +
            "`to`, `dispatch_time`, `status`) values(null, 1, ?, ?, ?, ?, ?)";
        sqlParams = [params.subjectMess, params.textMess, params.emailMess,
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
 * Отправка сообщения
 * @params callback
 */
module.exports.sendMessage = function (params, callback) {
    console.log(params);
    console.log(config.MODULE_SMS.HOST + ':' + config.MODULE_SMS.PORT + '/api/sendMessage');
    var reqParams = {
        method: 'POST',
        url: config.MODULE_SMS.HOST + ':' + config.MODULE_SMS.PORT + '/api/sendMessage',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(params)
    };
    request(reqParams, function (err, res, body) {
        if (err) {
            return callback(err);
        }
        try {
            body = JSON.parse(body);
            console.log(body);
            return callback(null, body);
        } catch (e) {
            return callback('Ошибка при парсинге ответа');
        }
    });
};