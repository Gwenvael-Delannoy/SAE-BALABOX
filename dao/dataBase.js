var db_connection = require('./mysql_connection');
var match_dao = require('./match_dao.js');
var session_dao = require('./session_dao.js');
var sport_dao = require('./sport_dao.js');
var equipe_dao = require('./equipe_dao.js');
var acrosport_dao = require('./acrosport_dao.js');
var escalade_dao = require('./escalade_dao.js');
var figure_dao = require('./figure_dao.js');
var musculation_dao = require('./musculation_dao.js');
var natation_dao = require('./natation_dao.js');
var resultat_dao = require('./resultat_dao.js');
var statistique_dao = require('./statistique_dao.js');
var step_dao = require('./step_dao.js');
var voie_dao = require('./voie_dao.js');
var eleve_dao = require('./eleve_dao.js');

module.exports = {db: db_connection, match_dao: match_dao, session_dao: session_dao, sport_dao: sport_dao, equipe_dao: equipe_dao, acrosport_dao: acrosport_dao, escalade_dao: escalade_dao, figure_dao: figure_dao, musculation_dao: musculation_dao, natation_dao: natation_dao, resultat_dao: resultat_dao, statistique_dao: statistique_dao, step_dao: step_dao, voie_dao: voie_dao, eleve_dao: eleve_dao};