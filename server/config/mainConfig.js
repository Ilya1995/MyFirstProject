"use strict";
var config = {
    PORT: 3550,
    database: {
        connection: {
            host: '127.0.0.1',          //хост с базами данных
            user: 'root',               //учетка на сервере БД
            database: 'myDatabase',     //имя БД
            password: '7991',           //пароль к БД
            insecureAuth: true,         //разрешение подключения без SSL
            multipleStatements: true    //разрешение передачи нескольких запросов в одном, разделенных знаком ";"
        }
    },
    sendEmail: {
        host: 'smtp.mail.ru',
        port: 465,
        secure: true,
        user: 'test11196@mail.ru',
        pass: '1234567890-qwertyuiop[]'
    },
    MODULE_SMS: {
        HOST: 'http://localhost',
        PORT: 3700
    },
    MODULE_EMAIL: {
        HOST: 'http://localhost',
        PORT: 3600
    },
    logLevel: 4 //one of log levels error(0)-warning-log-info-debug-trace(5)
};
config.env=process.env.NODE_ENV || 'dev';
exports.config = config;