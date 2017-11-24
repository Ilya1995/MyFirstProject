require('./console.js');
const mysql = require('mysql');
const config = require('../config/mainConfig').config;
const request = require('request');
const moment = require('moment');
const serviceRegistry = require('../../common-utils/serviceRegistry');

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
 * Отправка сообщения
 * @params callback
 */
module.exports.sendMessage = function (params, callback) {
    console.log(params);

    var module;
    params.phoneMess ? module = config.MODULE_SMS : module = config.MODULE_EMAIL;

    console.log(serviceRegistry.servicesInfo);
    var primaryUrl, service;
    if (serviceRegistry.servicesInfo && serviceRegistry.servicesInfo[module.name]) {
        service = serviceRegistry.servicesInfo[module.name];
        if (service.status === 'critical') {
            return callback('Сервис недоступен');
        }
        primaryUrl = 'http://' + service.address + ':' + service.port;
    } else {
        primaryUrl = module.HOST + ':' + module.PORT;
    }

    var reqParams = {
        method: 'POST',
        url: primaryUrl + '/api/sendMessage',
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
        } catch (e) {
            return callback('Ошибка при парсинге ответа');
        }
        return callback(null, body);
    });
};