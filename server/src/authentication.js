"use strict";

var mysql = require('mysql');
var config = require('../config/mainConfig').config;

module.exports.authentication = function (params, callback) {
    console.log(params);
    if ((!params.login || !params.password)) {
        return callback('Не указаны логин или пароль');
    }
    return callback(null, 'Вы авторизовались')
};



