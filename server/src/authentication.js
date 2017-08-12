"use strict";

var mysql = require('mysql');
var config = require('../config/mainConfig').config;
var async = require('async');
require('./console.js');

/**
 * Получение login и password для аутентификации
 * @param params.login - логин
 * @param params.password - пароль
 * @param callback
 */
module.exports.authentication = function (params, callback) {
    console.log(params);
    var connection = mysql.createConnection(config.database.connection);
    if ((!params.login || !params.password)) {
        return callback('Не указаны логин или пароль');
    }
    async.waterfall([
        function (callback) {
            var sql = "select clients.id from clients where clients.login = ? and clients.password = ?";
            connection.query(sql, [params.login, params.password], function (err, rows) {
                console.log(rows);
                if (err) {
                    console.error(err.message);
                    return callback('Ошибка поиска');
                }
                if (rows.length === 0) {
                    return callback('Пользователя с такими логином и паролем нет в базе');
                }
                return callback(null, rows[0].id);
            });
        },
        function (clientId, callback) {
            var sql = "select clients.name from clients where clients.id = ?";
            connection.query(sql, [clientId], function (err, rows) {
                console.log(rows);
                if (err) {
                    console.error(err.message);
                    return callback('Ошибка поиска');
                }
                return callback(null, rows[0].name);
            });
        }
    ], function (err, data) {
        connection.destroy();
        if (err) {
            return callback(err);
        }
        return callback(null, data);
    });


};



