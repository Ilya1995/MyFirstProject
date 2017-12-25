"use strict";
var config = {
    name: 'API_GW',
    listen: {
        host: '127.0.0.1',
        port: 3550
    },
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
        name: 'serverEMAIL',
        host: 'smtp.mail.ru',
        port: 465,
        secure: true,
        user: 'test11196@mail.ru',
        pass: '1234567890-qwertyuiop[]'
    },
    MODULE_SENDER: {
        name: 'sender',//serverSender
        nameConteiner: 'senderk',
        HOST: 'http://localhost',
        PORT: 3800
    },
    MODULE_AUTH: {
        name: 'auth',//serverAuth
        nameConteiner: 'authk',
        HOST: 'http://localhost',
        PORT: 3900
    },
    MODULE_USERS: {
        name: 'users',//serverUsers
        nameConteiner: 'uk',
        HOST: 'http://localhost',
        PORT: 4000
    },
    serviceRegistry: {
        host: '127.0.0.1',
        port: '8500',
        tags: [],
        servicesList: [
            'auth',//serverAuth
            'users',//serverUsers
            'sender'//serverSender
        ],
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