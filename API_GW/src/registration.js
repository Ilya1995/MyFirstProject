require('./console.js');
//var mysql = require('mysql');
var config = require('../config/mainConfig').config;
//var async = require('async');
var request = require('request');
const serviceRegistry = require('../../common-utils/serviceRegistry');

// /**
//  * Регистрация нового клиента
//  * @param params.login - логин
//  * @param params.pass1 - пароль
//  * @param params.name - имя
//  * @param params.email - емэйл
//  * @param callback
//  */
// module.exports.regClient = function (params, callback) {
//     console.log(params);
//     var connection = mysql.createConnection(config.database.connection);
//     if ((!params.login || !params.pass1)) {
//         return callback('Не указаны логин или пароль');
//     }
//     async.waterfall([
//         function (callback) {
//             var sql = "INSERT INTO clients (name, email, login, password) values(?, ?, ?, ?)";
//             connection.query(sql, [params.name, params.email, params.login, params.pass1], function (err, rows) {
//                 console.log(rows);
//                 if (err) {
//                     console.error(err.message);
//                     return callback('Ошибка добавления нового клиента в бд');
//                 }
//                 return callback(null, 'Новый пользватель зарегистрирован');
//             });
//         }
//     ], function (err, note) {
//         connection.destroy();
//         if (err) {
//             return callback(err);
//         }
//         return callback(null, note);
//     });
// };

module.exports.regClient = function (params, callback) {
    console.log(params);

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
    var reqParams = {
        method: 'POST',
        url: primaryUrl + '/api/registration',
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