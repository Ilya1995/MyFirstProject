require('./console.js');
const config = require('../config/mainConfig').config;
const request = require('request');
const serviceRegistry = require('../../common-utils/serviceRegistry');

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

    console.log(serviceRegistry.servicesInfo);
    var primaryUrl, service;
    // if (serviceRegistry.servicesInfo && serviceRegistry.servicesInfo[config.MODULE_SENDER.name]) {
    //     service = serviceRegistry.servicesInfo[config.MODULE_SENDER.name];
    //     if (service.status === 'critical') {
    //         return callback('Сервис ' + config.MODULE_SENDER.name + ' недоступен');
    //     }
    //     primaryUrl = 'http://' + service.address + ':' + service.port;
    // } else {
    //     primaryUrl = config.MODULE_SENDER.HOST + ':' + config.MODULE_SENDER.PORT;
    // }
    if (serviceRegistry.servicesInfo && serviceRegistry.servicesInfo[config.MODULE_SENDER.name]) {
        service = serviceRegistry.servicesInfo[config.MODULE_SENDER.name];
        primaryUrl = 'http://' + config.MODULE_SENDER.nameConteiner + ':' + service.port;
    } else {
        return callback('Сервис ' + config.MODULE_SENDER.name + ' недоступен');
    }

    let reqParams = {
        method: method,
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