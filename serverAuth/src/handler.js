"use strict";

var authentication = require('./authentication');
require('./console.js');
var async = require('async');


module.exports.authentication = function (req, res) {
    console.log(req.body);
    authentication.authentication(req.body, function (err, data) {
        console.log(err);
        console.log(data);
        if (err) {
            return res.send({result: false, note: err});
        }

        res.send({result: true, data: data});
    });
};

module.exports.getLoggedUser = function (req, res) {
    console.log(req.body);
    async.waterfall([
        function (callback) {
            var session = {
                login: req.body.login || null,
                password: req.body.password || null
            };

            if (!session.login || !session.password) {
                console.log('Пользователь не авторизован');
                return callback('Пользователь не авторизован');
            }
            console.log('Информация пользователя: ');
            console.log(session);

            authentication.authentication(session, function (err, data) {
                console.log(err);
                console.log(data);
                if (err) {
                    return res.send({result: false, note: err});
                }

                res.send({result: true, data: data});
            });
        }
    ], function (err, data) {
        //console.log(data);
        if (err) {
            res.send({result: false, note: err});
        } else {
            res.send({result: true, data: data});
        }
    });
};

