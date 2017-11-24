const http = require('http');
const express = require('express');
const bodyParser = require('body-parser');
const async = require('async');
const cookieParser = require('cookie-parser');
const config = require('./config/mainConfig').config;
const handler = require('./src/handler');
const serviceRegistry = require('../common-utils/serviceRegistry');
const stateHealthcheck = require('../common-utils/stateHealthcheck');
const _ = require('underscore');
let apiPrefix = '/api';
let app = express();

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
            console.info('Сервер Sender запущен на порту ' + app.get('port'));
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
            servicesList: config.serviceRegistry.servicesList,
            check: config.serviceRegistry.check
        }, function (err) {
            err ? callback(err) : null;
        });
    }
], function (error) {
    console.error(error);
});

app.post(apiPrefix + '/sendMessage', handler.sendMessage);
app.get(apiPrefix  + '/getMessages/:id', handler.getMessages);
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

