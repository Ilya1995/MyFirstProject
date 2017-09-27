var async = require('async');

exports.up = function(db, callback) {
    async.series([
        function (callback) {
            let sql = "INSERT INTO type_messages (name) values('email')";
            db.runSql(sql, callback);
        },
        function (callback) {
            let sql = "INSERT INTO type_messages (name) values('sms')";
            db.runSql(sql, callback);
        }
    ], function (err) {
        if (err) {
            return console.error(err);
        }
        callback();
    });
};

exports.down = function(db, callback) {
    callback();
};