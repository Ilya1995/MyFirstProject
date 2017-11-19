"use strict";

var messages = require('./messages');
var users = require('./users');
require('./console.js');
var async = require('async');
var endOfInterval = 3; // количесво попыток отправки сообщения вслучае ошибки

module.exports.sendMessage = function (req, res) {
    console.log(req.body);
    async.waterfall([
        function (callback) {
            users.checkUser({userId: req.body.userId, token: req.body.token}, function (err) {
                if (err) {
                    return callback(err);
                }
                return callback(null);
            });
        },
        function (callback) {
            intervalDispatch(req.body, function (err, data) {
                if (err) {
                    return callback(err);
                }
                async.waterfall([
                    function (callback) {
                        if (data.result) {
                            users.writeOffMoney({userId: req.body.userId, money: 100}, function (err, balance) {
                                if (err) {
                                    console.error(err);
                                    return callback(err);
                                }
                                return callback(null, balance)
                            })
                        } else {
                            return callback(null, null);
                        }
                    },
                    function (balance, callback) {
                        console.log(balance);
                        console.log(data);
                        messages.writeToTheDatabase(req.body, data, function (err) {
                            if (err) {
                                return callback('Ошибка при записи отчёта по доставке сообщения в БД');
                            }
                            balance ? data.balance = balance.data : null;
                            return callback(null, data);
                        });
                    }
                ], function (err, data) {
                    if (err) {
                        return callback(err);
                    }
                    console.log(data);
                    return callback(null, data);
                });
            });
        }
    ], function (err, data) {
        if (err) {
            return res.send({result: false, note: err});
        }
        return res.send(data);
    });
};

function intervalDispatch(data, callback) {
    let i = 0, interval = setTimeout(function send() {
        console.log(interval);
        messages.sendMessage(data, function (err, data) {
            if (err || !data.result) {
                console.error(err || data.note);
                if (err && err.syscall === 'connect') {
                    return callback(null, {result: false, note: 'Сервис не доступен'});
                } else {
                    i++;
                    if (i >= endOfInterval) {
                        return callback(null, {result: false, note: 'Произошла ошибка при отправке'});
                    }
                }
            } else {
                return callback(null, {result: true, note: data.note});
            }
            interval = setTimeout(send, 5000);
        });
    }, 5000);
}

module.exports.getMessages = function (req, res) {
    messages.getMessages(req.params, function (err, data) {
        console.log(err);
        console.log(data);
        if (err) {
            return res.send({result: false, note: err});
        }
        res.send({result: true, data: data});
    });
};
