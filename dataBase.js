var db_connection = require('./mysql_connection');
var match_dao = require('./match_dao.js');
var session_dao = require('./session_dao.js');
var sport_dao = require('./sport_dao.js');

module.exports = {db: db_connection, match_dao: match_dao, session_dao: session_dao, sport_dao: sport_dao};