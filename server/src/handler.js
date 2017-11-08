"use strict";

var registration = require('./registration');
var authentication = require('./authentication');
var clients = require('./clients');
var messages = require('./messages');
// var async = require('async');
require('./console.js');

module.exports.replenishBalance = function (req, res) {
    console.log(req.body);
    clients.replenishBalance(req.body, function (err, data) {
        console.log(err);
        console.log(data);
        if (err) {
            return res.send({result: false, note: err});
        }

        if (data.result) {
            res.send({result: true, data: data.data});
        } else {
            res.send({result: false, note: data.note});
        }
    });
};

module.exports.sendMessage = function (req, res) {
    console.log(req.body);
    messages.sendMessage(req.body, function (err, data) {
        console.log(err);
        console.log(data);
        if (err) {
            return res.send({result: false, note: err});
        }

        if (data.result) {
            res.send({result: true, data: data});
        } else {
            res.send({result: false, note: data.note});
        }
    });
};

module.exports.getMessages = function (req, res) {
    console.log(req.params.id);
    messages.getMessages(req.params, function (err, data) {
        console.log(err);
        console.log(data);
        if (err) {
            return res.send({result: false, note: err});
        }

        if (data.result) {
            res.send({result: true, data: data.data});
        } else {
            res.send({result: false, note: data.note});
        }
    });
};

module.exports.authentication = function (req, res) {
    console.log(req.body);
    authentication.authentication(req.body, function (err, data) {
        console.log(err);
        console.log(data);
        if (err) {
            return res.send({result: false, note: err});
        }
        if (req.body.login && data.result) {
            res.cookie('login', req.body.login);
            res.cookie('password', req.body.password);
        }

        if (data.result) {
            res.send({result: true, data: data.data});
        } else {
            res.send({result: false, note: data.note});
        }

        // res.send({result: true, data: data});
    });
};

module.exports.registration = function (req, res) {
    console.log(req.body);
    registration.regClient(req.body, function (err, note) {
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
    authentication.getLoggedUser(req.cookies, function (err, data) {
        console.log(err);
        console.log(data);
        if (err) {
            return res.send({result: false, note: err});
        }
        if (data.result) {
            res.send({result: true, data: data.data});
        } else {
            res.send({result: false, note: data.note});
        }

        //res.send({result: true, data: data});
    });
    // async.waterfall([
    //     function (callback) {
    //         var session = {
    //             login: req.cookies.login || null,
    //             password: req.cookies.password || null
    //         };
    //
    //         if (!session.login || !session.password) {
    //             console.log('Пользователь не авторизован');
    //             return callback('Пользователь не авторизован');
    //         }
    //         console.log('Информация пользователя: ');
    //         console.log(session);
    //
    //         authentication.authentication(session, function (err, data) {
    //             console.log(err);
    //             console.log(data);
    //             if (err) {
    //                 return res.send({result: false, note: err});
    //             }
    //             if (req.body.login) {
    //                 res.cookie('login', req.body.login);
    //                 res.cookie('password', req.body.password);
    //             }
    //
    //             res.send({result: true, data: data});
    //         });
    //     }
    // ], function (err, data) {
    //     //console.log(data);
    //     if (err) {
    //         res.send({result: false, note: err});
    //     } else {
    //         res.send({result: true, data: data});
    //     }
    // });
};
