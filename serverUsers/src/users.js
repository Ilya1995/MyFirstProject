require('./console.js');
var mysql = require('mysql');
var config = require('../config/mainConfig').config;
// var async = require('async');

/**
 * Получить id пользователя по login и password
 * @param params.login - логин
 * @param params.password - пароль
 * @param callback
 */
module.exports.getUserId = function (params, callback) {
    console.log(params);
    var connection = mysql.createConnection(config.database.connection);
    if ((!params.login || !params.password)) {
        return callback('Не указаны логин или пароль');
    }

    var sql = "select clients.id from clients where clients.login = ? and clients.password = ?";
    connection.query(sql, [params.login, params.password], function (err, rows) {
        connection.destroy();
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
};

/**
 * Получить информацию пользователя по userId
 * @param params.userId - id пользователя
 * @param callback
 */
module.exports.getInformationUser = function (params, callback) {
    console.log(params);
    var connection = mysql.createConnection(config.database.connection);
    if (!params.userId) {
        return callback('Отсутствует userId');
    }

    var sql = "select name, balance, email from clients where id = ?";
    connection.query(sql, [params.userId], function (err, rows) {
        connection.destroy();
        console.log(rows);
        if (err) {
            console.error(err.message);
            return callback('Ошибка поиска');
        }
        if (rows.length === 0) {
            return callback('Пользователя с такими id нет в базе');
        }
        return callback(null, rows[0]);
    });
};