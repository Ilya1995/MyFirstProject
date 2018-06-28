var server = require('../server');
var chai = require('chai');
var chaiHttp = require('chai-http');
var assert = chai.assert;
chai.use(chaiHttp);
var async = require('async');


describe('Тесты для взаимодействия сервиса API_GW и serverUsers.', function() {
    var data = {
        name: "user",
        email: '',
        login: 'user',
        pass1: 'user'
    }, userId, balance;


    it('Регистрация нового пользователя', function(done) {
        chai.request(server)
            .post('/api/registration')
            .send(data)
            .end(function(err, res) {
                userId = res.body.data.id;
                assert.isTrue(isFinite(userId));
                assert.isTrue(res.body.result);
                done();
            });
    });

    it('Пополнить баланс пользователя на 1000', function(done) {
        chai.request(server)
            .put('/api/replenish')
            .send({userId: userId, sum: 1000})
            .end(function(err, res) {
                assert.isTrue(res.body.result);
                assert.equal(res.body.data, 1000);
                done();
            });
    });

    it('Пополнить баланс не получится по некоректному id', function(done) {
        chai.request(server)
            .put('/api/replenish')
            .send({userId: 'id', sum: 1000})
            .end(function(err, res) {
                //console.log(res.body);
                assert.isFalse(res.body.result);
                done();
            });
    });

    it('Пополнить баланс не получится на некоректную сумму', function(done) {
        chai.request(server)
            .put('/api/replenish')
            .send({userId: userId, sum: -500})
            .end(function(err, res) {
                //console.log(res.body);
                assert.isFalse(res.body.result);
                done();
            });
    });

    it('Удаление пользователя', function(done) {
        chai.request(server)
            .get('/api/dropUser/user')
            .end(function(err, res) {
                //console.log(res.body);
                assert.isTrue(res.body.result);
                done();
            });
    });
});
