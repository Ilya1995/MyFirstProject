var http = require('http');
var express = require('express');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var app = express();
var config = require('./config/mainConfig').config;
var messages = require('./src/messages');
var apiPrefix = '/api';

app.set('port', process.env.PORT || config.PORT);
app.use(cookieParser());
app.use(bodyParser.json({limit: '5mb'}));
app.use(bodyParser.urlencoded({ extended: true }));

app.use(function (req, res, next) {
    res.set("Access-Control-Allow-Origin", "*");
    res.set("Access-Control-Allow-Headers", "Content-Type");
    next();
});

app.post(apiPrefix + '/sendMessage', messages.sendMessage);

http.createServer(app).listen(app.get('port'));
console.info('Сервер СМС запущен на порту ' + app.get('port'));