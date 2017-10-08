require('./console.js');
// var mysql = require('mysql');
// var config = require('../config/mainConfig').config;


/**
 * Отправка сообщения
 * @params req.body.textMess - текст сообщения
 * @params req.body.phoneMess - номер телефона получателя
 * @params callback
 *
 * 10 <= random < 25
 * random < 15   -   Сообщение отправлено
 * random >= 15   -   Произошла ошибка при отправке
 */
module.exports.sendMessage = function (req, res) {
    console.log(req.body);
    let max = 25, min = 10, random = Math.floor(Math.random() * (max - min) + min);
    console.log(random);
    if (req.body.phoneMess.length === 11) {
        if (random < 15) {
            res.send({result: true, note: 'Сообщение доставлено'});
        } else {
            res.send({result: false, note: 'Произошла ошибка при отпраке'});
        }
    } else {
        res.send({result: false, note: 'Номер телефона слишком короткий'});
    }
};