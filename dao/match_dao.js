/**
 * DAO for match.
 */

var Match = require('../models/match');
var smt = require('./mysql_connection');

var MatchDAO = function () {
    /**
     * Insert a new match in the database
     * @param {Match} match
     * @param {function} callback
     * @returns {void}
     */
    this.insert = function (match, callback) {
        this.use(null);
        values = [match.getResultat1(), match.getResultat2(), match.getSession().getId()];
        var sql = "INSERT INTO Match (resultat_equipe_1, resultat_equipe_2, la_session) VALUES (?,?,?)";
        smt.run(sql, values, callback);
    };

    /**
     * insert the association between a match and an equipe
     * @param {int} key
     * @param {int} match
     * @param {function} callback
     * @returns {void}
     */
    this.insertMatch_Equipe = function(key1,key2,callback){
        this.use(null);
        values = [key1,key2];
        var sql = "INSERT INTO Match_Equipe (le_match, lequipe) VALUES (?,?)";
        smt.run(sql, values, callback);
    }

    /**
     * insert the association between a match and an eleve
     * @param {int} key1 
     * @param {int} key2 
     * @param {function} callback 
     * @returns {void}
     */
    this.insertMatch_Eleve = function(key1,key2,callback){
        this.use(null);
        values = [key1,key2];
        var sql = "INSERT INTO Match_Eleve (un_match, leleve) VALUES (?,?)";
        smt.run(sql, values, callback);
    }

    /**
     * find all the association between a match and an eleve
     * @param {function} callback 
     */
    this.findAllMatch_Eleves = function(callback){
        this.use(null);
        var sql = "SELECT * FROM Match_Eleve";
        smt.all(sql, callback);
    }

    /**
     * find all the association between a match and an equipe
     * @param {function} callback 
     */
    this.findAllMatch_Equipes = function(callback){
        this.use(null);
        var sql = "SELECT * FROM Match_Equipe";
        smt.all(sql, callback);
    }

    /**
     * find the association between a match and an eleve by the match
     * @param {int} key 
     * @param {function} callback 
     */
    this.findMatch_ElevesByMatch = function(key,callback){
        this.use(null);
        var sql = "SELECT * FROM Match_Eleve WHERE un_match = " + key + ";";
        smt.all(sql, callback);
    }

    /**
     * find the association between a match and an equipes by the match
     * @param {int} key
     * @param {function} callback
     * @returns {void}
     */
    this.findMatch_EquipesByMatch = function(key,callback){
        this.use(null);
        var sql = "SELECT * FROM Match_Equipe WHERE le_match = " + key + ";";
        smt.all(sql, callback);
    }
    
    /**
     * find the association between a match and an equipes by the equipes
     * @param {int} key
     * @param {function} callback
     * @returns {void}
     */
    this.findMatch_EquipesByEquipe = function(key,callback){
        this.use(null);
        var sql = "SELECT * FROM Match_Equipe WHERE lequipe = " + key + ";";
        smt.all(sql, callback);
    }

    /**
     * delete the association between a match and an eleve by the match
     * @param {int} key
     * @param {function} callback
     * @returns {void}
     */
    this.deleteMatch_Eleve = function(key,callback){
        this.use(null);
        var sql = "DELETE FROM Match_Eleve WHERE un_match = " + key + ";";
        smt.run(sql, callback);
    }

    /**
     * delete the association between a match and an equipe by the match
     * @param {int} key
     * @param {function} callback
     * @returns {void}
     */
    this.deleteMatch_Equipe = function(key,callback){
        this.use(null);
        var sql = "DELETE FROM Match_Equipe WHERE le_match = " + key + ";";
        smt.run(sql, callback);
    }

    /**
     * delete the association between a match and an equipe by the equipe
     * @param {int} key 
     * @param {function} callback
     * @returns {void}
     */
    this.deleteMatch_EleveByEleve = function(key,callback){
        this.use(null);
        var sql = "DELETE FROM Match_Eleve WHERE leleve = " + key + ";";
        smt.run(sql, callback);
    }

    /**
     * delete the association between a match and an equipe by the equipe
     * @param {int} key
     * @param {function} callback
     * @returns {void}
     */
    this.deleteMatch_EquipesByEquipe = function(key,callback){
        this.use(null);
        var sql = "DELETE FROM Match_Equipe WHERE lequipe = " + key + ";";
        smt.run(sql, callback);
    }

    /**
     * Update a match in the database
     * @param {int} key
     * @param {Match} match
     * @param {function} callback
     * @returns {void}
     */
    this.update = function (key, values, callback) {
        this.use(null);
        var sql2 = "UPDATE Match SET resultat_equipe_1=?,resultat_equipe_2=?,la_session=? WHERE id_match= " + key + ";";
        smt.run(sql2, values, callback);
    };

    /**
     * Delete a match in the database
     * @param {int} key
     * @param {function} callback
     * @returns {void}
     */
    this.delete = function (key, callback) {
        this.use(null);
        this.deleteMatch_Equipe(key,callback);
        this.deleteMatch_Eleve(key,callback);
        var sql3 = "DELETE FROM Match WHERE id_match= " + key + ";";
        smt.run(sql3, callback);
    };

    /**
     * Find all match in the database
     * @param {function} callback
     * @returns {Match[]}
     */
    this.findAll = function (callback) {
        this.use(null);
        var sql4 = "SELECT * FROM Match";
        smt.all(sql4, callback);
    };

    /**
     * Find a match in the database by the key of the match
     * @param {int} key
     * @param {function} callback
     * @returns {Match}
     */
    this.findByKey = function (key, callback) {
        this.use(null);
        var sql5 = "SELECT * FROM Match WHERE id_match= " + key + ";";
        smt.get(sql5, callback);
    };

    /**
     * Find all match in the database by the key of the session
     * @param {int} key
     * @param {function} callback
     * @returns {Match[]}
     */
    this.findBySession = function (key, callback) {
        this.use(null);
        var sql6 = "SELECT * FROM Match WHERE la_session= " + key + ";";
        smt.all(sql6, callback);
    };

    /**
     * Use the database balabox_sport_db
     * @param {function} callback
     * @returns {void}
     */
    this.use = function(callback){
        var sql7 = "USE balabox_sport_db;";
        smt.query(sql7, callback);
    };
    
};
var matchDAO = new MatchDAO();
module.exports = matchDAO;

