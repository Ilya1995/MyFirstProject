require('./console.js');
var mysql = require('mysql');
var config = require('../config/mainConfig').config;


/**
 * Получение отчёта по сообщениям
 * @params callback
 */
module.exports.getMessages = function (callback) {
    let connection = mysql.createConnection(config.database.connection);
    let sql = "select DATE_FORMAT(dispatch_time, \"%d-%m-%Y\") as dispatch_time, `to`, status from messeges";
    connection.query(sql, function (err, rows) {
        connection.destroy();
        console.log(rows);
        if (err) {
            console.error(err);
            return callback('Ошибка получения сообщений');
        }
        return callback(null, rows);
    });
};