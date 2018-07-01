const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const app = express();
const config = require('./config/mainConfig').config;
const handler = require('./src/handler');
const apiPrefix = '/api';
require('./src/console.js');


app.set('port', process.env.port || config.listen.port);
app.use(cookieParser());
app.use(bodyParser.json({limit: '5mb'}));
app.use(bodyParser.urlencoded({ extended: true }));

app.use(function (req, res, next) {
    res.set("Access-Control-Allow-Origin", "*");
    res.set("Access-Control-Allow-Headers", "Content-Type");
    next();
});

app.listen(app.get('port'), function (err) {
    if (err) {
        console.error('Сервер не запущен!')
    } else {
        console.info('Сервер запущен на порту ' + app.get('port'));
    }
});

app.post(apiPrefix + '/authentication', handler.authentication);
app.post(apiPrefix + '/registration', handler.registration);
app.get(apiPrefix + '/dropUser/:login', handler.dropUser);
app.post(apiPrefix + '/sendEmail', handler.sendEmail);
app.post(apiPrefix + '/logout', handler.logout);
app.post(apiPrefix + '/getLoggedUser', handler.getLoggedUser);
app.get(apiPrefix  + '/getMessages/:id', handler.getMessages);
app.post(apiPrefix + '/sendMessage', handler.sendMessage);
app.put(apiPrefix + '/replenish', handler.replenishBalance);