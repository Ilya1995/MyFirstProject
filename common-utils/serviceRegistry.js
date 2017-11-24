'use strict';

var Consul = require('consul');
var async = require('async');
var url = require('url');
var _ = require('underscore');

exports.registry = {};
exports.serviceId = {};
exports.servicesInfo = {};



var servicesList = [];

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

            exports.serviceId = _.random(1000, 9999);
            params.check ? params.serviceInfo.check = {
                id: exports.serviceId,
                name: params.serviceInfo.name,
                http: url.format({
                    protocol: 'http:',
                    hostname: params.serviceInfo.address,
                    port: params.serviceInfo.port,
                    pathname: params.check.path
                }),
                interval: params.check.interval
            } : null;


            exports.registry.agent.service.register(params.serviceInfo, function (err) {
                if (err) {
                    return callback('Ошибка при регистрации в SR');
                }
                return callback();
            });
        },
        function(callback) {
            servicesList ? exports.getServicesInfo(function (err) {
                console.log(exports.servicesInfo);
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
                console.log(exports.servicesInfo);
                if (err) {
                    clearInterval(refreshIntervalId);
                    return callback('Ошибка при получении информации о сервисах');
                }
                return callback();
            })
        }, 30 * 1000) : callback();
    });
};

exports.getServiceInfo = function(params, callback) {
    var serviceName = params.service;
    async.waterfall([
        function(callback) {
            exports.registry.catalog.service.nodes(serviceName, function (err, res) {
                if (err) {
                    return callback(err);
                }
                return callback(null, res);
            });
        }, function (serInfo, callback) {
            exports.registry.health.checks(serviceName, function (err, serCheck) {
                //console.log(serCheck);
                if (err) {
                    return callback(err);
                }
                return callback(null, serInfo, serCheck);
            });
        }
    ], function(err, serviceInfo, serviceCheck) {
        if (err) {
            return callback(err);
        }

        console.log(serviceInfo);
        var status;
        serviceCheck[0] ? status = serviceCheck[0].Status || 'critical' : status = 'critical';
        return callback(null, !serviceInfo[0] ? [] : {
            id: serviceInfo[0].ID, address: serviceInfo[0].ServiceAddress,
            port: serviceInfo[0].ServicePort, status: status});
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
                exports.servicesInfo[serviceName] = serviceInfo;
                return callback();
            });
        },
        callback
    );
};

exports.deregister = function(callback) {
    if (exports.registry) {
        exports.registry.agent.service.deregister({
            id: exports.serviceId
        }, callback);
    } else {
        callback();
    }
};