require('./console.js');
//var mysql = require('mysql');
var config = require('../config/mainConfig').config;
//var async = require('async');
var request = require('request');

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
    var reqParams = {
        method: 'POST',
        url: config.MODULE_USERS.HOST + ':' + config.MODULE_USERS.PORT + '/api/registration',
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