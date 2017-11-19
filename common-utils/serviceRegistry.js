'use strict';

var Consul = require('consul');
var async = require('async');

exports.registry;

var servicesList = [],
    servicesInfo = {};

/**
 * @param {object} params.serviceRegistryConfig - конфиг для SR
 * @param {object} params.serviceInfo - информация о сервисе который хотим зарегать
 * @param {[]} params.servicesList - список сервисов о которых должен знать
 * @param {function} callback
 */
exports.init = function(params, callback) {
    console.log(params);
    async.waterfall([
        function(callback) {
            servicesList = params.servicesList;
            exports.registry = Consul(params.serviceRegistryConfig);
            exports.registry.agent.service.register(params.serviceInfo, function (err) {
                if (err) {
                    return callback('Ошибка при регистрации в SR');
                }
                return callback();
            });
        },
        function(callback) {
            servicesList ? exports.getServicesInfo(function (err) {
                console.log(servicesInfo);
                if (err) {
                    return callback('Ошибка при получении информации о сервисах');
                }
                return callback();
            }) : callback();
        }
    ], function(err) {
        if (err) {
            return callback(err);
        }

        var refreshIntervalId;
        servicesList ? refreshIntervalId = setInterval(function() {
            exports.getServicesInfo(function (err) {
                console.log(servicesInfo);
                if (err) {
                    clearInterval(refreshIntervalId);
                    return callback('Ошибка при получении информации о сервисах');
                }
                return callback();
            })
        }, 10 * 1000) : callback();
    });
};

exports.getServiceInfo = function(params, callback) {
    var serviceName = params.service;
    async.waterfall([
        function(callback) {
            exports.registry.catalog.service.nodes({
                service: serviceName
            }, function (err, res) {
                return callback(null, res);
            });
        }
    ], function(err, serviceInfo) {
        if (err) {
            return callback(err);
        }

        console.log(serviceInfo);
        return callback(null, !serviceInfo[0] ? [] : {
            id: serviceInfo[0].ID, name: serviceInfo[0].ServiceName,
            address: serviceInfo[0].ServiceAddress, port: serviceInfo[0].ServicePort});
    });
};

exports.getServicesInfo = function(callback) {
    async.each(servicesList,
        function(serviceName, callback) {
            exports.getServiceInfo({
                service: serviceName
            }, function(err, serviceInfo) {
                if (err) {
                    return callback(err);
                }
                servicesInfo[serviceName] = serviceInfo;
                return callback();
            });
        },
        callback
    );
};