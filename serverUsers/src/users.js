require('./console.js');
var mysql = require('mysql');
var config = require('../config/mainConfig').config;
var async = require('async');

/**
 * Списать часть денег пользователя за отправку сообщения/email по id
 * @param params.userId - id пользователя
 * @param params.money - сумма для списания
 * @param callback
 */
module.exports.writeOffMoney = function (params, callback) {
    var that = this;
    if (!params.userId || !params.money) {
        return callback('Некорректный id пользователя или сумма списания');
    }
    var connection = mysql.createConnection(config.database.connection);
    async.waterfall([
        function (callback) {
            that.checkBalance({userId: params.userId}, function (err, balance) {
                if (err) {
                    return callback(err);
                }
                return callback(null, balance);
            })
        },
        function (balance, callback) {
            balance = Number(balance) - Number(params.money);
            console.log(balance);
            let sql = "UPDATE clients SET `balance`=? WHERE id=?";
            connection.query(sql, [balance, params.userId], function (err) {
                if (err) {
                    console.error(err.message);
                    return callback('Ошибка обновления баланса');
                }
                return callback(null, balance);
            });
        }
    ], function (err, balance) {
        connection.destroy();
        if (err) {
            return callback(err);
        }
        return callback(null, balance);
    });
};

/**
 * Получить баланс пользователя по id
 * @param params.userId - id пользователя
 * @param callback
 */
module.exports.checkBalance = function (params, callback) {
    if (!params.userId) {
        return callback('Некорректный id');
    }
    var connection = mysql.createConnection(config.database.connection);
    let sql = "select balance from clients where id = ?";
    connection.query(sql, [params.userId], function (err, row) {
        connection.destroy();
        console.log(row);
        if (err) {
            console.error(err.message);
            return callback('Ошибка при получении баланса пользователя');
        }
        return callback(null,row[0].balance);
    });
};

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

/**
 * Пополнить баланс пользователя по userId
 * @param params.userId - id пользователя
 * @param params.sum - пароль
 * @param callback
 */
module.exports.replenishBalance = function (params, callback) {
    console.log(params);
    if (!params.userId) {
        return callback('Отсутствует userId');
    }
    if (!params.sum) {
        return callback('Отсутствует сумма пополнения баланса');
    }
    let connection = mysql.createConnection(config.database.connection);
    async.waterfall([
        function (callback) {
            let sql = "select balance from clients where id = ?";
            connection.query(sql, [params.userId], function (err, req) {
                if (err) {
                    console.error(err.message);
                    return callback('Ошибка получения текущего счёта');
                }
                return callback(null, req[0].balance);
            });
        },
        function (balance, callback) {
            balance = Number(balance) + Number(params.sum);
            let sql = "UPDATE clients SET `balance`=? WHERE id=?";
            connection.query(sql, [balance, params.userId], function (err) {
                if (err) {
                    console.error(err.message);
                    return callback('Ошибка пополнения баланса');
                }
                return callback(null, balance);
            });
        }
    ], function (err, balance) {
        connection.destroy();
        if (err) {
            return callback(err);
        }
        return callback(null, balance);
    });
};