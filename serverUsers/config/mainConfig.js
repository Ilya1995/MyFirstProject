"use strict";
var config = {
    name: 'serverUsers',
    listen: {
        host: '127.0.0.1',
        port: 4000
    },
    database: {
        connection: {
            host: 'dbuk',//127.0.0.1          //хост с базами данных
            user: 'root',               //учетка на сервере БД
            database: 'usersDB',        //имя БД
            password: '7991',           //пароль к БД
            insecureAuth: true,         //разрешение подключения без SSL
            multipleStatements: true    //разрешение передачи нескольких запросов в одном, разделенных знаком ";"
        }
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