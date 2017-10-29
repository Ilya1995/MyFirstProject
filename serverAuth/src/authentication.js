"use strict";

var mysql = require('mysql');
var config = require('../config/mainConfig').config;
var async = require('async');
var request = require('request');
require('./console.js');

/**
 * Получение login и password для аутентификации
 * @param params.login - логин
 * @param params.password - пароль
 * @param callback
 */
module.exports.authentication = function (params, callback) {
    console.log(params);
    var connection = mysql.createConnection(config.databaseAuth.connection);
    if ((!params.login || !params.password)) {
        return callback('Не указаны логин или пароль');
    }
    async.waterfall([
        function (callback) {
            var reqParams = {
                method: 'POST',
                url: config.MODULE_USERS.HOST + ':' + config.MODULE_USERS.PORT + '/api/getUserId',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(params)
            };
            request(reqParams, function (err, res, body) {
                console.log(err,res,body);
                if (err) {
                    return callback(err);
                }
                try {
                    body = JSON.parse(body);
                    console.log(body);
                } catch (e) {
                    return callback('Ошибка при парсинге ответа');
                }
                return callback(null, body.data);
            });
        },
        function (clientId, callback) {
            var sql = "INSERT INTO auth (user_id, token) values(?, 'hexToken')";
            connection.query(sql, [clientId], function (err) {
                if (err) {
                    console.error(err.message);
                    return callback('Ошибка аутинтификации');
                }
                return callback(null, clientId);
            });
        },
        function (clientId, callback) {
            var reqParams = {
                method: 'POST',
                url: config.MODULE_USERS.HOST + ':' + config.MODULE_USERS.PORT + '/api/getInformationUser',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({userId: clientId})
            };
            request(reqParams, function (err, res, body) {
                console.log(err,res,body);
                if (err) {
                    return callback(err);
                }
                try {
                    body = JSON.parse(body);
                    console.log(body);
                } catch (e) {
                    return callback('Ошибка при парсинге ответа');
                }
                return callback(null, body.data);
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



