var server = require('../server');
var chai = require('chai');
var chaiHttp = require('chai-http');
var assert = chai.assert;
chai.use(chaiHttp);


describe('Тесты для функции checkBalance', function() {
    it('Клиент с отрицательным id не существует', function(done) {
        chai.request(server)
            .get('/api/checkBalance/-5')
            .end(function(err, res) {
                //console.log(res.body);
                assert.isFalse(res.body.result);
                done();
            });
    });
    it('Клиент с бесконечно большим id не существует', function(done) {
        chai.request(server)
            .get('/api/checkBalance/99999999999999')
            .end(function(err, res) {
                //console.log(res.body);
                assert.isFalse(res.body.result);
                done();
            });
    });
});

describe('Тесты для которых требуется создать нового клиента', function() {
    var data = {
        name: "user",
        email: '',
        login: 'user',
        pass1: 'user'
    }, userId, balance;
    it('Регистрация нового пользователя без логина запрещена', function(done) {
        chai.request(server)
            .post('/api/registration')
            .send({name: data.name, email: data.email, login: '', pass1: data.pass1})
            .end(function(err, res) {
                //console.log(res.body);
                assert.isFalse(res.body.result);
                done();
            });
    });

    it('Регистрация нового пользователя без пароля запрещена', function(done) {
        chai.request(server)
            .post('/api/registration')
            .send({name: data.name, email: data.email, login: data.login, pass1: ''})
            .end(function(err, res) {
                //console.log(res.body);
                assert.isFalse(res.body.result);
                done();
            });
    });

    it('Регистрация нового пользователя', function(done) {
        chai.request(server)
            .post('/api/registration')
            .send(data)
            .end(function(err, res) {
                //console.log(res.body);
                userId = res.body.data.id;
                assert.isTrue(isFinite(userId));
                assert.isTrue(res.body.result);
                done();
            });
    });

    it('Баланс только что созданного пользователя должен быть нулевым', function(done) {
        chai.request(server)
            .get('/api/checkBalance/' + userId)
            .end(function(err, res) {
                //console.log(res.body);
                assert.isNull(res.body.data);
                assert.isTrue(res.body.result);
                done();
            });
    });

    it('Пополнить баланс пользователя на 1000', function(done) {
        chai.request(server)
            .put('/api/replenish')
            .send({userId: userId, sum: 1000})
            .end(function(err, res) {
                //console.log(res.body);
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

    it('Только что пополненный баланс ровняется 1000', function(done) {
        chai.request(server)
            .get('/api/checkBalance/' + userId)
            .end(function(err, res) {
                //console.log(res.body);
                assert.isTrue(res.body.result);
                assert.equal(res.body.data, 1000);
                balance = res.body.data;
                done();
            });
    });

    it('Нельзя зарегистрировать пользователя с одним логином два раза', function(done) {
        chai.request(server)
            .post('/api/registration')
            .send(data)
            .end(function(err, res) {
                //console.log(res.body);
                assert.isFalse(res.body.result);
                done();
            });
    });

    it('Получение id пользователя по логину и паролю', function(done) {
        chai.request(server)
            .post('/api/getUserId')
            .send({login: data.login, password: data.pass1})
            .end(function(err, res) {
                //console.log(res.body);
                assert.isTrue(isFinite(res.body.data));
                done();
            });
    });

    it('id пользователя не будет получен по логину и паролю, если они пустые', function(done) {
        chai.request(server)
            .post('/api/getUserId')
            .send({login: '', password: ''})
            .end(function(err, res) {
                //console.log(res.body);
                assert.isFalse(res.body.result);
                done();
            });
    });

    it('Получить информацию о пользователе по id', function(done) {
        chai.request(server)
            .post('/api/getInformationUser')
            .send({userId: userId})
            .end(function(err, res) {
                //console.log(res.body);
                assert.isTrue(res.body.result);
                assert.isObject(res.body.data);
                done();
            });
    });

    it('Информацию о пользователе не будет получена по несуществующему id', function(done) {
        chai.request(server)
            .post('/api/getInformationUser')
            .send({userId: -89})
            .end(function(err, res) {
                //console.log(res.body);
                assert.isFalse(res.body.result);
                done();
            });
    });

    it('Списать 150р у пользователя по id', function(done) {
        chai.request(server)
            .put('/api/writeOffMoney')
            .send({userId: userId, money: 150})
            .end(function(err, res) {
                //console.log(res.body);
                assert.isTrue(res.body.result);
                assert.equal(res.body.data, balance - 150);
                done();
            });
    });

    it('Не получится списать 150р у пользователя по некорректному id', function(done) {
        chai.request(server)
            .put('/api/writeOffMoney')
            .send({userId: -98, money: 150})
            .end(function(err, res) {
                //console.log(res.body);
                assert.isFalse(res.body.result);
                done();
            });
    });

    it('Не получится списать некоректную сумму у пользователя', function(done) {
        chai.request(server)
            .put('/api/writeOffMoney')
            .send({userId: userId, money: 'a150'})
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

