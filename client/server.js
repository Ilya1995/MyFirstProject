const http = require('http');
const express = require('express');
const app = express();
const config = require('./config/mainConfig').config;
const httpProxy = require('http-proxy');
const path = require('path');


const proxy = new httpProxy.createProxyServer({
    target: {
        host: config.MODULE_REG.HOST,
        port: config.MODULE_REG.PORT
    }
});

(function initWebpack() {
    const webpack = require('webpack');
    const webpackConfig = require('./webpack/common.config');
    const compiler = webpack(webpackConfig);
    const NODE_ENV = process.env.NODE_ENV || 'development';
    console.log('Режим: ' + NODE_ENV);

    if (NODE_ENV === 'development') {
        app.use(require('webpack-dev-middleware')(compiler, {
            noInfo: true,
            publicPath: webpackConfig.output.publicPath
        }));

        app.use(require('webpack-hot-middleware')(compiler, {
            log: console.log,
            path: '/__webpack_hmr',
            heartbeat: 10 * 1000
        }));
    }

    app.use(express.static(__dirname + '/'));


})();

app.all('/api/*', (req, res) => {
    proxy.web(req, res);
    proxy.on('error', (err) => {
        console.error('Error httpProxy:');
        console.error(err);
    });
});

app.get('*', function (req, res) {
    res.sendFile(path.resolve(__dirname, 'index.html'))
});

const server = http.createServer(app);
server.listen(process.env.PORT || config.PORT, () => {
    const address = server.address();
    console.log('Клиент запущен на порту: ' + address.port);
    console.log('Идёт сборка webpack . . .')
});