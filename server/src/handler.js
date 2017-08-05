"use strict";

//var registration = require('./registration');
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
