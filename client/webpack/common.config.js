 var path = require('path');
const autoprefixer = require('autoprefixer');
const postcssImport = require('postcss-import');
const merge = require('webpack-merge');

const development = require('./dev.config.js');
const production = require('./prod.config.js');

const NODE_ENV = process.env.NODE_ENV || 'development';

require('babel-polyfill').default;

const TARGET = process.env.npm_lifecycle_event;

const PATHS = {
    app: path.join(__dirname, '../src'),
    build: path.join(__dirname, '../dist')
};

process.env.BABEL_ENV = TARGET;

const common = {
    entry: [
        PATHS.app
    ],

    output: {
        path: PATHS.build,
        filename: 'bundle.js'
    },

    resolve: {
        extensions: ['', '.jsx', '.js', '.json'],
        modulesDirectories: ['node_modules', PATHS.app]
    },

    module: {
        preLoaders: [
            {
                test: /\.js$/,
                loaders: ['eslint'],
                include: [
                    path.resolve(__dirname, '../src')
                ],
                exclude:[
                    path.resolve(__dirname, '../src/vendor')
                ]
            }
        ],

        loaders: [{
            test: /bootstrap-sass\/assets\/javascripts\//,
            loader: 'imports?jQuery=jquery'
        }, {
            test: /\.woff(\S+)?$/,
            loader: 'url?limit=10000&mimetype=application/font-woff'
        }, {
            test: /\.woff2(\S+)?$/,
            loader: 'url?limit=10000&mimetype=application/font-woff2'
        }, {
            test: /\.ttf(\S+)?$/,
            loader: 'url?limit=10000&mimetype=application/octet-stream'
        }, {
            test: /\.otf(\S+)?$/,
            loader: 'url?limit=10000&mimetype=application/font-otf'
        }, {
            test: /\.eot(\S+)?$/,
            loader: 'file'
        }, {
            test: /\.svg(\S+)?$/,
            loader: 'url?limit=10000&mimetype=image/svg+xml'
        }, {
            test: /\.js$/,
            loaders: ['babel-loader'],
            exclude: /node_modules/
        }, {
            test: /\.png$/,
            loader: 'file?name=[name].[ext]'
        }, {
            test: /\.jpg$/,
            loader: 'file?name=[name].[ext]'
        }]
    },
    postcss: (function (webpack) {
        return [autoprefixer({
            browsers: ['last 2 versions']
        }), postcssImport({
            addDependencyTo: webpack
        })];
    })
};

if (NODE_ENV === 'development') {
    module.exports = merge(development, common);
}

if (TARGET === 'build') {
    module.exports = merge(production, common);
}