"use strict";

var messages = require('./messages');
require('./console.js');
var endOfInterval = 3; // количесво попыток отправки сообщения вслучае ошибки

module.exports.sendMessage = function (req, res) {
    intervalDispatch(req.body, function (err, data) {
        if (err) {
            return res.send({result: false, note: err});
        }
        messages.writeToTheDatabase(req.body, data, function (err) {
            if (err) {
                return res.send({result: false, note: 'Ошибка при записи отчёта по доставке сообщения в БД'});
            }
            return res.send(data);
        });
    });
};

function intervalDispatch(data, callback) {
    let i = 0, interval = setTimeout(function send() {
        console.log(interval);
        messages.sendMessage(data, function (err, data) {
            if (err || !data.result) {
                console.error(err || data.note);
                if (err && err.syscall === 'connect') {
                    return callback(null, {result: false, note: 'Сервис не доступен'});
                } else {
                    i++;
                    if (i >= endOfInterval) {
                        return callback(null, {result: false, note: 'Произошла ошибка при отправке'});
                    }
                }
            } else {
                return callback(null, {result: true, note: data.note});
            }
            interval = setTimeout(send, 5000);
        });
    }, 5000);
}

module.exports.getMessages = function (req, res) {
    messages.getMessages(function (err, data) {
        console.log(err);
        console.log(data);
        if (err) {
            return res.send({result: false, note: err});
        }
        res.send({result: true, data: data});
    });
};
