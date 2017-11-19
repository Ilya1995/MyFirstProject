'use strict';

var Consul = require('consul');
var async = require('async');

exports.registry;

/**
 * @param {object} params.serviceRegistryConfig - конфиг для SR
 * @param {object} params.serviceInfo - информация о сервисе который хотим зарегать
 * @param {function} callback
 */
exports.init = function(params, callback) {
    async.waterfall([
        function(callback) {
            exports.registry = Consul(params.serviceRegistryConfig);
            exports.registry.agent.service.register(params.serviceInfo, callback);
        }
    ], function(err) {
        if (err) {
            return callback('Ошибка при инициализации SR');
        }
        return callback(null);
    });
};