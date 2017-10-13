"use strict";
var config = {
    PORT: 3600,
    sendEmail: {
        host: 'smtp.mail.ru',
        port: 465,
        secure: true,
        user: 'test11196@mail.ru',
        pass: '1234567890-qwertyuiop[]'
    },
    logLevel: 4 //one of log levels error(0)-warning-log-info-debug-trace(5)
};
config.env=process.env.NODE_ENV || 'dev';
exports.config = config;