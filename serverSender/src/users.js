require('./console.js');
const config = require('../config/mainConfig').config;
const request = require('request');
const async = require('async');
const serviceRegistry = require('../../common-utils/serviceRegistry');

/**
 * Отправка сообщения
 * @params params.userId - id пользователя
 * @params params.token - токен авторизации
 * @params callback
 */
module.exports.checkUser = function (params, callback) {
    async.waterfall([
        function (callback) {
        /**Проверяем наличие токена для данного пользователя*/
            console.log(serviceRegistry.servicesInfo);
            var primaryUrl, service;
            // if (serviceRegistry.servicesInfo && serviceRegistry.servicesInfo[config.MODULE_AUTH.name]) {
            //     service = serviceRegistry.servicesInfo[config.MODULE_AUTH.name];
            //     if (service.status === 'critical') {
            //         return callback('Сервис ' + config.MODULE_AUTH.name + ' недоступен');
            //     }
            //     primaryUrl = 'http://' + service.address + ':' + service.port;
            // } else {
            //     primaryUrl = config.MODULE_AUTH.HOST + ':' + config.MODULE_AUTH.PORT;
            // }

            if (serviceRegistry.servicesInfo && serviceRegistry.servicesInfo[config.MODULE_AUTH.name]) {
                service = serviceRegistry.servicesInfo[config.MODULE_AUTH.name];
                primaryUrl = 'http://' + config.MODULE_AUTH.nameConteiner + ':' + service.port;
            } else {
                return callback('Сервис ' + config.MODULE_AUTH.name + ' недоступен');
            }
            let url = primaryUrl + '/api/checkToken';
            send({userId: params.userId, token: params.token}, 'POST', url, function (err, data) {
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
            console.log(serviceRegistry.servicesInfo);
            var primaryUrl, service;
            // if (serviceRegistry.servicesInfo && serviceRegistry.servicesInfo[config.MODULE_USERS.name]) {
            //     service = serviceRegistry.servicesInfo[config.MODULE_USERS.name];
            //     if (service.status === 'critical') {
            //         return callback('Сервис ' + config.MODULE_USERS.name + ' недоступен');
            //     }
            //     primaryUrl = 'http://' + service.address + ':' + service.port;
            // } else {
            //     primaryUrl = config.MODULE_USERS.HOST + ':' + config.MODULE_USERS.PORT;
            // }

            if (serviceRegistry.servicesInfo && serviceRegistry.servicesInfo[config.MODULE_USERS.name]) {
                service = serviceRegistry.servicesInfo[config.MODULE_USERS.name];
                primaryUrl = 'http://' + config.MODULE_USERS.nameConteiner + ':' + service.port;
            } else {
                return callback('Сервис ' + config.MODULE_USERS.name + ' недоступен');
            }
            let url = primaryUrl + '/api/checkBalance/' + params.userId;
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
    console.log(serviceRegistry.servicesInfo);
    var primaryUrl, service;
    // if (serviceRegistry.servicesInfo && serviceRegistry.servicesInfo[config.MODULE_USERS.name]) {
    //     service = serviceRegistry.servicesInfo[config.MODULE_USERS.name];
    //     if (service.status === 'critical') {
    //         return callback('Сервис ' + config.MODULE_USERS.name + ' недоступен');
    //     }
    //     primaryUrl = 'http://' + service.address + ':' + service.port;
    // } else {
    //     primaryUrl = config.MODULE_USERS.HOST + ':' + config.MODULE_USERS.PORT;
    // }

    if (serviceRegistry.servicesInfo && serviceRegistry.servicesInfo[config.MODULE_USERS.name]) {
        service = serviceRegistry.servicesInfo[config.MODULE_USERS.name];
        primaryUrl = 'http://' + config.MODULE_USERS.nameConteiner + ':' + service.port;
    } else {
        return callback('Сервис ' + config.MODULE_USERS.name + ' недоступен');
    }
    let url = primaryUrl + '/api/writeOffMoney';
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