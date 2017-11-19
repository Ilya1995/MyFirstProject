require('./console.js');
var config = require('../config/mainConfig').config;
var request = require('request');

/**
 * Отправка сообщения
 * @params callback
 */
module.exports.sendMessage = function (params, callback) {
    console.log(params);
    send(params,'sendMessage', 'POST', function (err, data) {
        if (err) {
            return callback(err);
        }
        return callback(null, data);
    });
};

/**
 * Получение отчёта по сообщениям
 * @params callback
 */
module.exports.getMessages = function (params, callback) {
    console.log(params);
    send(null,'getMessages/' + params.id, 'GET', function (err, data) {
        if (err) {
            return callback(err);
        }
        return callback(null, data);
    });
};

function send (params, funk, method, callback) {
    console.log(params);
    let reqParams = {
        method: method,
        url: config.MODULE_SENDER.HOST + ':' + config.MODULE_SENDER.PORT + '/api/' + funk,
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