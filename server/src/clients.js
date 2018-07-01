var mysql = require('mysql');
var async = require('async');
var config = require('../config/mainConfig').config;
var nodemailer = require('nodemailer');

/**
 * Отправка регистрационных данных клиенту
 * @params params.login - логин
 * @params params.password - пароль
 * @params params.email - емэйл
 * @params callback
 */
module.exports.sendEmail = function (params, callback) {
    var configEmail = config.sendEmail;
    var transporter = nodemailer.createTransport({
        host: configEmail.host,
        port: configEmail.port,
        secure: configEmail.secure,
        auth: {
            user: configEmail.user,
            pass: configEmail.pass
        }
    });
    var mailOptions = {
        from: configEmail.user,
        to: params.email,
        subject: 'Регистрация',
        text: 'Доброго времени суток! Ваши регистрационные данные с сайта ******, логин - ' + params.login + ', пароль - ' +
            params.password + '. Не сообщайте свои персональные данные никому. Без уважением, администрация сайта. '
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return callback('Ошибка при доставке сообщения');
        }
        console.log(info);
        return callback(null, 'Сообщение доставленно');
    });
};

/**
 * Удаление клиента
 * @param params.login - логин
 * @param callback
 */
module.exports.dropUser = function (params, callback) {
    console.log(params);
    if (!params.login) {
        return callback('Не указаны логин');
    }
    var connection = mysql.createConnection(config.database.connection);
    var sql = "delete from clients where login = ?";
    connection.query(sql, [params.login], function (err, rows) {
        connection.destroy();
        console.log(rows);
        if (err || !rows.affectedRows) {
            return callback('Ошибка при удалении клиента');
        }
        return callback(null, 'Клиент удалён');
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
    if (!params.userId || params.userId < 0 || !isFinite(params.userId)) {
        return callback('Некоректный userId');
    }
    if (!params.sum || params.sum < 0 || !isFinite(params.sum)) {
        return callback('Отсутствует сумма пополнения баланса');
    }
    var connection = mysql.createConnection(config.database.connection);
    async.waterfall([
        function (callback) {
            var sql = "select balance from clients where id = ?";
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
            var sql = "UPDATE clients SET `balance`=? WHERE id=?";
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

/**
 * Списать часть денег пользователя за отправку сообщения/email по id
 * @param params.userId - id пользователя
 * @param params.money - сумма для списания
 * @param callback
 */
module.exports.writeOffMoney = function (params, callback) {
    var that = this;
    if (!params.userId || !isFinite(params.userId) || params.userId < 0) {
        return callback('Некорректный id пользователя');
    }

    if (!params.money || !isFinite(params.money) || params.money < 0) {
        return callback('Некорректная сумма списания');
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
            //console.log(balance);
            var sql = "UPDATE clients SET `balance`=? WHERE id=?";
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
    //console.log(params);
    if (!params.userId || !isFinite(params.userId) || params.userId < 0) {
        return callback('Некорректный id');
    }
    var connection = mysql.createConnection(config.database.connection);
    var sql = "select balance from clients where id = ?";
    connection.query(sql, [params.userId], function (err, row) {
        connection.destroy();
        //console.log(row);
        if (err) {
            console.error(err.message);
            return callback('Ошибка при получении баланса пользователя');
        }
        if (!row[0]) {
            return callback('Пользователь с таким id не найден');
        }
        return callback(null,row[0].balance);
    });
};
