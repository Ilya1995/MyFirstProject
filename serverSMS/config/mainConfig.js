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
        servicesList: [],
        check: {
            path: '/SR/state',
            interval: '30s'
        }
    },
    connectionsCountLimits: {
        critical: 1000,
        warn: 800
    },
    logLevel: 4 //one of log levels error(0)-warning-log-info-debug-trace(5)
};
config.env=process.env.NODE_ENV || 'dev';
exports.config = config;