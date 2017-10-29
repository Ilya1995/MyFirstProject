exports.up = function(db, callback) {
    var sql = "CREATE TABLE IF NOT EXISTS `auth` " +
        "(`id` INT(11) NOT NULL AUTO_INCREMENT, " +
        "`user_id` INT(11) NOT NULL, " +
        "`token` VARCHAR(64) NOT NULL COLLATE utf8_unicode_ci, " +
        "PRIMARY KEY (`id`)) " +
        "ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci";
    db.runSql(sql, function (err) {
        if (err) {
            return callback(err);
        }
        return callback(null);
    });
};

exports.down = function(db, callback) {
    return callback();
};
