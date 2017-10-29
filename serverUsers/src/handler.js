"use strict";

var registration = require('./registration');
var users = require('./users');
require('./console.js');

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