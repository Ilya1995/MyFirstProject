'use strict';

var async = require('async');
const request = require('request');
// const ip = require("ip");

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
    //console.log(params);
    async.waterfall([
        function(callback) {
            servicesList = params.servicesList;
            console.log(servicesList);
            servicesList ? exports.getServicesInfo(function (err) {
                console.log(exports.servicesInfo);
                if (err) {
                    console.log(err);
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
    console.log(serviceName);
    async.waterfall([
        function(callback) {
            var reqParams = {
                url: 'http://consul:8500/v1/catalog/service/' + serviceName//' + ip.address() + '
            };
            request(reqParams, function (err, res, body) {
                if (err) {
                    console.log(err);
                    return callback(err);
                }
                try {

                    body = JSON.parse(body);
                    console.log(body);
                } catch (e) {
                    return callback('Ошибка при парсинге ответа');
                }
                return callback(null, body);
            });
        }
    ], function(err, serviceInfo) {
        if (err) {
            return callback(err);
        }
        console.log(serviceInfo);
        return callback(null, !serviceInfo[0] ? [] : {
            id: serviceInfo[0].ServiceID, address: serviceInfo[0].ServiceAddress,
            name: serviceInfo[0].ServiceName, port: serviceInfo[0].ServicePort});
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
    return callback();//заглушка
};