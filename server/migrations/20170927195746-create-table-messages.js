var async = require('async');

exports.up = function(db, callback) {
    async.series([
        function (callback) {
            let sql = "CREATE TABLE `messeges` ( " +
                "`id` int(11) NOT NULL AUTO_INCREMENT, " +
                "`clients_id` int(11) NULL, " +
                "`type_messages_id` int(11) NOT NULL, " +
                "`subject` varchar(128) COLLATE utf8_unicode_ci DEFAULT NULL, " +
                "`text` varchar(256) COLLATE utf8_unicode_ci DEFAULT NULL, " +
                "`to` varchar(128) COLLATE utf8_unicode_ci DEFAULT NULL, " +
                "`dispatch_time` TIMESTAMP NULL, " +
                "PRIMARY KEY (`id`), " +
                "KEY `fk_messeges_clients` (`clients_id`), " +
                "CONSTRAINT `fk_messeges_clients` FOREIGN KEY (`clients_id`) " +
                "REFERENCES `clients` (`id`) ON DELETE CASCADE ON UPDATE NO ACTION, " +
                "KEY `fk_messeges_type_messages` (`type_messages_id`), " +
                "CONSTRAINT `fk_messeges_type_messages` FOREIGN KEY (`type_messages_id`) " +
                "REFERENCES `type_messages` (`id`) ON DELETE CASCADE ON UPDATE NO ACTION " +
                ") ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;";
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