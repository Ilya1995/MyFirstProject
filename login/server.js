var http = require('http');
var fs = require('fs');
var url = require('url');
var aut = require('./auten.js');
var fs = require('fs')
var express = require('express');

var path = require('path');
var bodyParser = require('body-parser');
var multiparty = require("multiparty");

var app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.get('/', function (req, res) {
    fs.createReadStream("./view/entry.html").pipe(res);
});

app.use('/file', bodyParser.urlencoded({
    extended: true
}));

app.post('/file', function (req, res) {
    var form = new multiparty.Form();
    form.parse(req, function(err, fields, files) {
        if (!err) {
            console.log(files);
            console.log(fields);
        } else{
            console.log(err);
        }
    });
    res.send({result: true, data: 'ok'});
});

app.post('/publish', function(req, res){
    var body = '';
            req
                .on('readable', function() {
                    body += req.read() || '';
                })
                .on('end', function() {
                    try {
                        body = JSON.parse(body);
                        if(body.event == 'entry') {
                            var answer = aut.entry(body.login, body.password);
                            console.log(answer);
                            res.send(answer);
                        }else{
                            if(body.event == 'check'){
                                var answer = aut.reg(body.login, body.password);
                                console.log(answer);
                                res.send(answer);
                            }
                        }
                    } catch (e) {
                        res.statusCode = 400;
                        res.end("Bad Request");
                        return;
                    }
                    res.end("ok");
                });
});

app.listen(3000);

console.log("Сервер запущен!");

app.use(express['static'](path.join(__dirname, 'static')));
app.use(express['static'](path.join(__dirname, 'view')));
