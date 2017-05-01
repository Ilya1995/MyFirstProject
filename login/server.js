var http = require('http');
var fs = require('fs');
var url = require('url');
var aut = require('./auten.js');
var express = require('express');

var path = require('path');
var bodyParser = require('body-parser');
var multiparty = require("multiparty");

var	webpack	= require('webpack');
var	webpackDevMiddleware = require('webpack-dev-middleware');
var	webpackHotMiddleware = require('webpack-hot-middleware');
var	config = require('./webpack.config');
var	port = 3000;
var	compiler = webpack(config);
var app = express();
app.use(webpackDevMiddleware(compiler, { noInfo: true, publicPath: config.output.publicPath}));
app.use(webpackHotMiddleware(compiler));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.get("/", function(req, res) {
    res.sendFile(__dirname + '/index.html')
});

// app.use('/file', bodyParser.urlencoded({
//     extended: true
// }));
//
// app.post('/file', function (req, res) {
//     var form = new multiparty.Form();
//     form.parse(req, function(err, fields, files) {
//         if (!err) {
//             console.log(files);
//             console.log(fields);
//         } else{
//             console.log(err);
//         }
//     });
//     res.send({result: true, data: 'ok'});
// });

app.post('/publish', function(req, res){
    console.log(req.body);
    res.send({result: true, answer: 'Ошибка входа'});
    // if(req.body.event == 'entry') {
    //     var answer = aut.entry(req.body.login, req.body.password);
    //     if (answer) {
    //         console.log('ok');
    //         res.send({result: true, answer: 'Вы вошли'});
    //     } else {
    //         console.log('no');
    //         res.send({result: false, answer: 'Ошибка входа'});
    //     }
    // }

    // }else{
    //     if(req.body.event == 'check'){
    //         var answer = aut.reg(req.body.login, req.body.password);
    //         console.log(answer);
    //         res.send(answer);
    //     }
    // }
    // var body = '';
    //         req
    //             .on('readable', function() {
    //                 body += req.read() || '';
    //             })
    //             .on('end', function() {
    //                 try {
    //                     //body = JSON.parse(body);
    //                     if(body.event == 'entry') {
    //                         var answer = aut.entry(body.login, body.password);
    //                         console.log(answer);
    //                         res.send(answer);
    //                     }else{
    //                         if(body.event == 'check'){
    //                             var answer = aut.reg(body.login, body.password);
    //                             console.log(answer);
    //                             res.send(answer);
    //                         }
    //                     }
    //                 } catch (e) {
    //                     res.statusCode = 400;
    //                     res.end("Bad Request");
    //                     return;
    //                 }
    //                 res.end("ok");
    //             });
});

app.listen(port, function(error) {
    if	(error)	{
        console.error(error)
    }else{
        console.info("====> Сервер запущен на порту %s <====", port);
    }
});

app.use(express['static'](path.join(__dirname, 'static')));
app.use(express['static'](path.join(__dirname, 'view')));

