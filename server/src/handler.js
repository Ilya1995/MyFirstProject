"use strict";

var registration = require('./registration');
var authentication = require('./authentication');
var clients = require('./clients');
var messages = require('./messages');
var async = require('async');


module.exports.replenishBalance = function (req, res) {
    console.log(req.body);
    clients.replenishBalance(req.body, function (err, data) {
        console.log(err);
        console.log(data);
        if (err) {
            res.send({result: false, note: err});
        } else {
            res.send({result: true, data: data});
        }
    });
};

module.exports.sendMessage = function (req, res) {
    console.log(req.body);
    async.waterfall([
        function (callback) {
            messages.sendMessage(req.body, function (result) {
                return callback(null, result);
            });
        },
        function (data, callback) {
            clients.writeOffMoney({userId: req.body.userId, money: 100}, function (err, balance) {
                if (err) {
                    console.error(err);
                    return callback(err);
                }
                return callback(null, data, balance)
            });
        },
        function (data, balance, callback) {
            console.log(balance);
            console.log(data);
            messages.writeToTheDatabase(req.body, data, function (err) {
                if (err) {
                    return callback('Ошибка при записи отчёта по доставке сообщения в БД');
                }
                balance ? data.balance = balance : null;
                return callback(null, data);
            });
        }
    ], function (err, data) {
        if (err) {
            res.send({result: false, note: err});
        } else {
            res.send(data);
        }
    });
};

module.exports.getMessages = function (req, res) {
    console.log(req.params.id);
    messages.getMessages(req.params, function (err, data) {
        console.log(err);
        console.log(data);
        if (err) {
            res.send({result: false, note: err});
        } else {
            res.send({result: true, data: data});
        }
    });
};

module.exports.authentication = function (req, res) {
    console.log(req.body);
    authentication.authentication(req.body, function (err, data) {
        console.log(err);
        console.log(data);
        if (err) {
            res.send({result: false, note: err});
        } else {
            res.cookie('login', req.body.login);
            res.cookie('password', req.body.password);
            res.send({result: true, data: data});
        }
    });
};

module.exports.registration = function (req, res) {
    console.log(req.body);
    registration.regClient(req.body, function (err, note) {
        if (err) {
            res.send({result: false, note: err});
        } else {
            res.send({result: true, note: note});
        }
    });
};

module.exports.dropUser = function (req, res) {
    console.log({login: req.params.login});
    clients.dropUser({login: req.params.login}, function (err, note) {
        console.log(err);
        console.log(note);
        if (err) {
            res.send({result: false, note: err});
        } else {
            res.send({result: true, note: note});
        }
    });
};

module.exports.sendEmail = function (req, res) {
    console.log(req.body);
    clients.sendEmail(req.body, function (err, note) {
        console.log(err);
        console.log(note);
        if (err) {
            res.send({result: false, note: err});
        } else {
            res.send({result: true, note: note});
        }
    });
};

module.exports.logout = function (req, res) {
    res.clearCookie('login');
    res.clearCookie('password');
    console.log('Пользователь разлогинился');
    res.send({result: true});
};

module.exports.getLoggedUser = function (req, res) {
    console.log(req.cookies);
    var session = {
        login: req.cookies.login || null,
        password: req.cookies.password || null
    };

    if (!session.login || !session.password) {
        console.log('Пользователь не авторизован');
        return res.send({result: false, note: 'Пользователь не авторизован'});
    }
    console.log('Информация пользователя: ');
    console.log(session);

    authentication.authentication(session, function (err, data) {
        console.error(err);
        console.log(data);
        if (err) {
            return res.send({result: false, note: 'Ошибка при авторизации'});
        }
        res.send({result: true, data: data});
    });
};
