require('./console.js');
var config = require('../config/mainConfig').config;
var request = require('request');
var async = require('async');

/**
 * Отправка сообщения
 * @params callback
 */
module.exports.checkUser = function (params, callback) {
    async.waterfall([
        function (callback) {
        /**Проверяем наличие токена для данного пользователя*/
            let url = config.MODULE_AUTH.HOST + ':' + config.MODULE_AUTH.PORT + '/api/checkToken/' + params.userId;
            send(null, 'GET', url, function (err, data) {
                console.log(err, data);
                if (err) {
                    return callback(err);
                }
                if (!data.result){
                    return callback(data.note);
                }
                return callback(null);
            })
        },
        function (callback) {
            /**Проверяем баланс пользователя*/
            let url = config.MODULE_USERS.HOST + ':' + config.MODULE_USERS.PORT + '/api/checkBalance/' + params.userId;
            send(null, 'GET', url, function (err, data) {
                console.log(err, data);
                if (err) {
                    return callback(err);
                }
                if (!data.result){
                    return callback(data.note);
                }
                if (data.data < 100){
                    return callback('Недостаточно средств на счету');
                }
                return callback(null);
            })
        }
    ], function (err) {
        if (err) {
            return callback(err);
        }
        return callback(null);
    });
};

/**
 * Списать деньги за отправленное сообщение
 * @params callback
 */
module.exports.writeOffMoney = function (params, callback) {
    let url = config.MODULE_USERS.HOST + ':' + config.MODULE_USERS.PORT + '/api/writeOffMoney';
    send(params, 'PUT', url, function (err, data) {
        console.log(err, data);
        if (err) {
            return callback(err);
        }
        if (!data.result){
            return callback(data.note);
        }
        return callback(null, data);
    })
};

function send (params, method, url, callback) {
    console.log(params);
    var reqParams = {
        method: method,
        url: url,
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