const http = require('http');
const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const app = express();
const config = require('./config/mainConfig').config;
const serviceRegistry = require('../common-utils/serviceRegistry');
const stateHealthcheck = require('../common-utils/stateHealthcheck');
const async = require('async');
const _ = require('underscore');
const handler = require('./src/handler');
const apiPrefix = '/api';

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
        _({SIGINT: 2, SIGTERM: 15})
            .each(function(exitCode, exitSignal) {
                process.on(exitSignal, function() {
                    gracefulShutdown(exitCode);
                });
            });
        const server = http.createServer(app).listen(app.get('port'), function (err) {
            err ? callback(err) : null;
            app.server = server;
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
            },
            check: config.serviceRegistry.check
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
app.get(config.serviceRegistry.check.path, stateHealthcheck({
    getServer: function() {
        return app.server;
    },
    getConfig: function() {
        return config.connectionsCountLimits;
    }
}));

const gracefulShutdown = function(exitCode) {
    let timeoutId;
    let exitCallback = function() {
        if (timeoutId) {
            clearTimeout(timeoutId);
        }
        process.exit(128 + exitCode);
    };
    timeoutId = setTimeout(exitCallback, 3000);
    serviceRegistry.deregister(exitCallback);
};