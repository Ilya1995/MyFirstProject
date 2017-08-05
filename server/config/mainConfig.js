"use strict";
var config = {
    PORT: 3550,
    database: {
        connection: {
            host: 'localhost',          //хост с базами данных
            user: 'unreg',              //учетка на сервере БД
            database: 'unregabonent',   //имя БД
            password: 'feldhdd',       //пароль к БД
            insecureAuth: true,         //разрешение подключения без SSL
            multipleStatements: true    //разрешение передачи нескольких запросов в одном, разделенных знаком ";"
        }
    }
};
config.env=process.env.NODE_ENV || 'dev';
exports.config = config;