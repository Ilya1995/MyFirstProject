"use strict";
var config = {
    name: 'serverAuth',
    listen: {
        host: '127.0.0.1',
        port: 3900
    },
    databaseAuth: {
        connection: {
            host: '127.0.0.1',          //хост с базами данных
            user: 'root',               //учетка на сервере БД
            database: 'authDB',         //имя БД
            password: '7991',           //пароль к БД
            insecureAuth: true,         //разрешение подключения без SSL
            multipleStatements: true    //разрешение передачи нескольких запросов в одном, разделенных знаком ";"
        }
    },
    databaseUsers: {
        connection: {
            host: '127.0.0.1',          //хост с базами данных
            user: 'root',               //учетка на сервере БД
            database: 'usersDB',        //имя БД
            password: '7991',           //пароль к БД
            insecureAuth: true,         //разрешение подключения без SSL
            multipleStatements: true    //разрешение передачи нескольких запросов в одном, разделенных знаком ";"
        }
    },
    MODULE_USERS: {
        HOST: 'http://localhost',
        PORT: 4000
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