"use strict";
var config = {
    name: 'serverSMS',
    listen: {
        host: '127.0.0.1',
        port: 3700
    },
    serviceRegistry: {
        host: '127.0.0.1',
        port: '8500',
        tags: [],
        servicesList: []
    },
    logLevel: 4 //one of log levels error(0)-warning-log-info-debug-trace(5)
};
config.env=process.env.NODE_ENV || 'dev';
exports.config = config;