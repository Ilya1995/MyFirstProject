"use strict";

var registration = require('./registration');
var authentication = require('./authentication');
require('./console.js');

module.exports.authentication = function (req, res) {
    console.log(req.body);
    authentication.authentication(req.body, function (err, data) {
        console.log(err);
        console.log(data);
        if (err) {
            return res.send({result: false, note: err});
        }
        if (req.body.login) {
            res.cookie('login', req.body.login);
            res.cookie('password', req.body.password);
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
