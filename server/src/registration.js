var mysql = require('mysql');
var config = require('../config/mainConfig').config;
var async = require('async');

/**
 * Регистрация нового клиента
 * @param params.login - логин
 * @param params.pass1 - пароль
 * @param params.name - имя
 * @param params.email - емэйл
 * @param callback
 */
module.exports.regClient = function (params, callback) {
    console.log(params);
    var connection = mysql.createConnection(config.database.connection);
    if ((!params.login || !params.pass1)) {
        return callback('Не указаны логин или пароль');
    }
    async.waterfall([
        function (callback) {
            var sql = "SELECT id FROM clients WHERE login = ?";
            connection.query(sql, [params.login], function (err, rows) {
                //console.log(rows);
                if (rows.length) {
                    return callback('Пользователь с таким логином уже зарегистрирован');
                }
                if (err) {
                    console.error(err.message);
                    return callback('Ошибка добавления нового клиента в бд');
                }
                return callback();
            });
        },
        function (callback) {
            var sql = "INSERT INTO clients (balance, name, email, login, password) values(null, ?, ?, ?, ?)";
            connection.query(sql, [params.name, params.email, params.login, params.pass1], function (err, rows) {
                //console.log(rows.insertId);
                if (err) {
                    console.error(err.message);
                    return callback('Ошибка добавления нового клиента в бд');
                }
                return callback(null, {id: rows.insertId, note: 'Новый пользватель зарегистрирован'});
            });
        }
    ], function (err, note) {
        connection.destroy();
        if (err) {
            return callback(err);
        }
        return callback(null, note);
    });
};