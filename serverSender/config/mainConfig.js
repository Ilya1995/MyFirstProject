"use strict";
var config = {
    PORT: 3800,
    database: {
        connection: {
            host: '127.0.0.1',          //хост с базами данных
            user: 'root',               //учетка на сервере БД
            database: 'senderDB',     //имя БД
            password: '7991',           //пароль к БД
            insecureAuth: true,         //разрешение подключения без SSL
            multipleStatements: true    //разрешение передачи нескольких запросов в одном, разделенных знаком ";"
        }
    },
    MODULE_EMAIL: {
        HOST: 'http://localhost',
        PORT: 3600
    },
    MODULE_SMS: {
        HOST: 'http://localhost',
        PORT: 3700
    },
    MODULE_AUTH: {
        HOST: 'http://localhost',
        PORT: 3900
    },
    MODULE_USERS: {
        HOST: 'http://localhost',
        PORT: 4000
    },
    logLevel: 4 //one of log levels error(0)-warning-log-info-debug-trace(5)
};
config.env=process.env.NODE_ENV || 'dev';
exports.config = config;