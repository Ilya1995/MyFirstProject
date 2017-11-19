var http = require('http');
var express = require('express');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var app = express();
var config = require('./config/mainConfig').config;
var handler = require('./src/handler');
const serviceRegistry = require('../common-utils/serviceRegistry');
const async = require('async');
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
            console.info('Сервер API_GW запущен на порту ' + app.get('port'));
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
            },
            servicesList: config.serviceRegistry.servicesList
        }, function (err) {
            err ? callback(err) : null;
        });
    }
], function (error) {
    console.error(error);
});

app.post(apiPrefix + '/authentication', handler.authentication);
app.post(apiPrefix + '/registration', handler.registration);
app.post(apiPrefix + '/sendEmail', handler.sendEmail);
app.post(apiPrefix + '/logout', handler.logout);
app.post(apiPrefix + '/getLoggedUser', handler.getLoggedUser);
app.get(apiPrefix  + '/getMessages/:id', handler.getMessages);
app.post(apiPrefix + '/sendMessage', handler.sendMessage);
app.put(apiPrefix + '/replenish', handler.replenishBalance);