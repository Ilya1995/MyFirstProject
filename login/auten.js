
var mas;
exports.mas = mas = [];

mas.push({
    login:"login",
    pass: "12345"
});
exports.entry = function (login, pass) {
    for(var key in mas)
        if(mas[key].login == login)
            if (pass == mas[key].pass)
                return "Вы вошли";
    return "Неверный логин или пароль";
};

exports.reg = function (login, pass) {
    for(var key in mas)
        if(mas[key].login == login)
            return "Логин занят";

    mas.push({
        login: login,
        pass: pass
    });
    return "Вы зарегистрированны!";
};