'use strict';

var config = require('../config/mainConfig.js').config;
var logger = require('mag')();
var logLevels = ['error', 'warn', 'log','info','debug','trace'];

var ConsoleModule = function(){
    this.setupConsole();
};

ConsoleModule.prototype.setupConsole = function() {
    function intercept(method){
        if (!(config.logLevel<=logLevels.indexOf(method))) {
            console[method] = function() {
                var cache=[];
                var caller='';
                if ( config.env==='dev' ) {caller = (new Error).stack.split('\n')[2].replace(/\ \ \ \ at\ .*\ /, '');}
                //var caller = (new Error).stack.split('\n')[2].replace(/\ \ \ \ at\ .*\ /, '');
                logger[method](caller+JSON.stringify(arguments, function(key, value) {
                        if (typeof value === 'object' && value !== null) {
                            if (cache.indexOf(value) !== -1) {
                                // Circular reference found, discard key
                                return;
                            }
                            // Store value in our collection
                            cache.push(value);
                        }
                        if (!!value && value.length>=200 &&  config.env=='prod' ) {value=value.toString().substring(0,50);}
                        return value;}).replace(/(\n(\r)?)/g, ' '));
            };
        } else {
            console[method] = function(){};
        }
    }
    logLevels.map(function(_){intercept(_);});
};

module.exports = new ConsoleModule();
