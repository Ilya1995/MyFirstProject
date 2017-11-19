// var dbm = global.dbm || require('db-migrate');
// var type = dbm.dataType;

exports.up = function(db, callback) {
    var sql = "CREATE TABLE IF NOT EXISTS `clients` (" +
        "`id` INT(11) NOT NULL AUTO_INCREMENT, " +
        "`name` VARCHAR(64) NOT NULL COLLATE utf8_unicode_ci, " +
        "`email` VARCHAR(128) NOT NULL COLLATE utf8_unicode_ci, " +
        "`login` VARCHAR(64) NOT NULL COLLATE utf8_unicode_ci, " +
        "`password` VARCHAR(64) NOT NULL COLLATE utf8_unicode_ci, " +
        "PRIMARY KEY (`id`)) " +
        "ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;";
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