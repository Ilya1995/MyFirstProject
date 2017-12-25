"use strict";

var config = require('../config/mainConfig').config;
require('./console.js');
var request = require('request');
const serviceRegistry = require('../../common-utils/serviceRegistry');
// var mysql = require('mysql');
// var async = require('async');

// /**
//  * Получение login и password для аутентификации
//  * @param params.login - логин
//  * @param params.password - пароль
//  * @param callback
//  */
// module.exports.authentication = function (params, callback) {
//     console.log(params);
//     var connection = mysql.createConnection(config.database.connection);
//     if ((!params.login || !params.password)) {
//         return callback('Не указаны логин или пароль');
//     }
//     async.waterfall([
//         function (callback) {
//             var sql = "select clients.id from clients where clients.login = ? and clients.password = ?";
//             connection.query(sql, [params.login, params.password], function (err, rows) {
//                 console.log(rows);
//                 if (err) {
//                     console.error(err.message);
//                     return callback('Ошибка поиска');
//                 }
//                 if (rows.length === 0) {
//                     return callback('Пользователя с такими логином и паролем нет в базе');
//                 }
//                 return callback(null, rows[0].id);
//             });
//         },
//         function (clientId, callback) {
//             var sql = "select clients.name from clients where clients.id = ?";
//             connection.query(sql, [clientId], function (err, rows) {
//                 console.log(rows);
//                 if (err) {
//                     console.error(err.message);
//                     return callback('Ошибка поиска');
//                 }
//                 return callback(null, rows[0].name);
//             });
//         }
//     ], function (err, data) {
//         connection.destroy();
//         if (err) {
//             return callback(err);
//         }
//         return callback(null, data);
//     });
// };

module.exports.logout = function (callback) {
    send(null, 'logout', function (err) {
        if (err) {
            return callback(err);
        }
        return callback(null);
    });
};

module.exports.getLoggedUser = function (params, callback) {
    console.log(params);
    send(params, 'getLoggedUser', function (err, data) {
        if (err) {
            return callback(err);
        }
        return callback(null, data);
    });
};

module.exports.authentication = function (params, callback) {
    console.log(params);
    send(params, 'authentication', function (err, data) {
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
    var reqParams = {
        method: 'POST',
        url: primaryUrl + '/api/' + funk,
        headers: {
            'Content-Type': 'application/json'
        }
    };
    params ? reqParams.body = JSON.stringify(params) : null;
    request(reqParams, function (err, res, body) {
        //console.log(err,res,body);
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

