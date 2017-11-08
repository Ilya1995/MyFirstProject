"use strict";

var registration = require('./registration');
var users = require('./users');
require('./console.js');

module.exports.writeOffMoney = function (req, res) {
    console.log(req.body.id);
    users.writeOffMoney(req.body, function (err, data) {
        console.log(err);
        console.log(data);
        if (err) {
            return res.send({result: false, note: err});
        }

        res.send({result: true, data: data});
    });
};

module.exports.checkBalance = function (req, res) {
    console.log(req.params.id);
    users.checkBalance({userId: req.params.id}, function (err, data) {
        console.log(err);
        console.log(data);
        if (err) {
            return res.send({result: false, note: err});
        }

        res.send({result: true, data: data});
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

module.exports.getUserId = function (req, res) {
    console.log(req.body);
    users.getUserId(req.body, function (err, data) {
        console.log(err);
        console.log(data);
        if (err) {
            res.send({result: false, note: err});
        } else {
            res.send({result: true, data: data});
        }
    });
};

module.exports.getInformationUser = function (req, res) {
    console.log(req.body);
    users.getInformationUser(req.body, function (err, data) {
        console.log(err);
        console.log(data);
        if (err) {
            res.send({result: false, note: err});
        } else {
            res.send({result: true, data: data});
        }
    });
};

module.exports.replenishBalance = function (req, res) {
    console.log(req.body);
    users.replenishBalance(req.body, function (err, balance) {
        console.log(err);
        if (err) {
            return res.send({result: false, note: err});
        }
        res.send({result: true, data: balance});
    });
};