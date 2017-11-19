var http = require('http');
var express = require('express');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var app = express();
var config = require('./config/mainConfig').config;
const serviceRegistry = require('../common-utils/serviceRegistry');
const async = require('async');
var handler = require('./src/handler');
var apiPrefix = '/api';

async.waterfall([
    function(callback) {
        app.set('port', process.env.port || config.listen.port);
        app.use(cookieParser());
        app.use(bodyParser.json({limit: '5mb'}));
        app.use(bodyParser.urlencoded({ extended: true }));

        app.use(function (req, res, next) {
            res.set("Access-Control-Allow-Origin", "*");
            res.set("Access-Control-Allow-Headers", "Content-Type");
            next();
        });
        http.createServer(app).listen(app.get('port'), function (err) {
            err ? callback(err) : null;
            console.info('Сервер пользователей запущен на порту ' + app.get('port'));
            return callback();
        });
    },
    function(callback) {
        serviceRegistry.init({
            serviceRegistryConfig: config.serviceRegistry,
            serviceInfo: {
                name: config.name,
                address: config.listen.host,
                port: config.listen.port,
                tags: config.serviceRegistry.tags
            }
        }, function (err) {
            err ? callback(err) : null;
        });
    }
], function (error) {
    console.error(error);
});

app.post(apiPrefix + '/registration', handler.registration);
app.post(apiPrefix + '/getUserId', handler.getUserId);
app.post(apiPrefix + '/getInformationUser', handler.getInformationUser);
app.put(apiPrefix + '/replenish', handler.replenishBalance);
app.get(apiPrefix + '/checkBalance/:id', handler.checkBalance);
app.put(apiPrefix + '/writeOffMoney', handler.writeOffMoney);