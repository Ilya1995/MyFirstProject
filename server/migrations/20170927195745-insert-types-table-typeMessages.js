var async = require('async');

exports.up = function(db, callback) {
    async.series([
        function (callback) {
            let sql = "INSERT INTO type_messages (name) values('email')";
            db.runSql(sql, function (err) {
                if (err) {
                    return callback(err);
                }
                return callback(null);
            });
        },
        function (callback) {
            let sql = "INSERT INTO type_messages (name) values('sms')";
            db.runSql(sql, function (err) {
                if (err) {
                    return callback(err);
                }
                return callback(null);
            });
        }
    ], function (err) {
        if (err) {
            return console.error(err);
        }
        return callback();
    });
};

exports.down = function(db, callback) {
    return callback();
};