/**
 * DAO pour match.
 */

var Match = require('../match');
var smt = require('./mysql_connection');

var MatchDAO = function () {
    /**
     * Inserer un nouveau match dans la base de données
     * @param {Match} match
     * @param {function} callback
     * @returns {void}
     */
    this.insert = function (match, callback) {
        this.use(null);
        values = [match.getResultat1(), match.getResultat2(), match.getSession()];
        var sql = "INSERT INTO Match_ (resultat_equipe_1, resultat_equipe_2, la_session) VALUES (?,?,?)";
        smt.query(sql, values, callback);
    };

    /**
     * Inserer une nouvelle association entre un match et une equipe
     * @param {int} key
     * @param {int} match
     * @param {function} callback
     * @returns {void}
     */
    this.insertMatch_Equipe = function(key1,key2,callback){
        this.use(null);
        values = [key1,key2];
        var sql = "INSERT INTO Match_Equipe (le_match, lequipe) VALUES (?,?)";
        smt.query(sql, values, callback);
    }

    /**
     * Inserer une nouvelle association entre un match et un eleve
     * @param {int} key1 
     * @param {int} key2 
     * @param {function} callback 
     * @returns {void}
     */
    this.insertMatch_Eleve = function(key1,key2,callback){
        this.use(null);
        values = [key1,key2];
        var sql = "INSERT INTO Match_Eleve (un_match, leleve) VALUES (?,?)";
        smt.query(sql, values, callback);
    }

    /**
     * Trouver toutes les match présentes dans la base de données pour un eleve
     * @param {function} callback 
     */
    this.findAllMatch_Eleves = function(callback){
        this.use(null);
        var sql = "SELECT * FROM Match_Eleve";
        smt.query(sql, callback);
    }

    /**
     * Trouver toutes les match présentes dans la base de données pour une equipe
     * @param {function} callback 
     */
    this.findAllMatch_Equipes = function(callback){
        this.use(null);
        var sql = "SELECT * FROM Match_Equipe";
        smt.query(sql, callback);
    }

    /**
     * Trouver un match pour un eleve par son identifiant de match
     * @param {int} key 
     * @param {function} callback 
     */
    this.findMatch_ElevesByMatch = function(key,callback){
        this.use(null);
        var sql = "SELECT * FROM Match_Eleve WHERE un_match = " + key + ";";
        smt.query(sql, callback);
    }

    /**
     * Trouver un match pour une equipe par son identifiant de match
     * @param {int} key
     * @param {function} callback
     * @returns {void}
     */
    this.findMatch_EquipesByMatch = function(key,callback){
        this.use(null);
        var sql = "SELECT * FROM Match_Equipe WHERE le_match = " + key + ";";
        smt.query(sql, callback);
    }
    
    /**
     * Trouver un match pour une equipe par son identifiant de l'equipe
     * @param {int} key
     * @param {function} callback
     * @returns {void}
     */
    this.findMatch_EquipesByEquipe = function(key,callback){
        this.use(null);
        var sql = "SELECT * FROM Match_Equipe WHERE lequipe = " + key + ";";
        smt.query(sql, callback);
    }


    this.findAllMatchSes = function (id, callback) {
        this.use(null);
        var sql = "SELECT * FROM Match_ WHERE la_session = " + id + ";";
        smt.query(sql, callback);
    };

    /**
     * Supprimer un match pour un eleve de la base de données par l'identifiant du match
     * @param {int} key
     * @param {function} callback
     * @returns {void}
     */
    this.deleteMatch_Eleve = function(key,callback){
        this.use(null);
        var sql = "DELETE FROM Match_Eleve WHERE un_match = " + key + ";";
        smt.query(sql, callback);
    }

    /**
     * Supprimer un match pour une equipe de la base de données par l'identifiant du match
     * @param {int} key
     * @param {function} callback
     * @returns {void}
     */
    this.deleteMatch_Equipe = function(key,callback){
        this.use(null);
        var sql = "DELETE FROM Match_Equipe WHERE le_match = " + key + ";";
        smt.query(sql, callback);
    }

    /**
     * Supprimer un match pour un eleve de la base de données par l'identifiant de l'eleve
     * @param {int} key 
     * @param {function} callback
     * @returns {void}
     */
    this.deleteMatch_EleveByEleve = function(key,callback){
        this.use(null);
        var sql = "DELETE FROM Match_Eleve WHERE leleve = " + key + ";";
        smt.query(sql, callback);
    }

    /**
     * Supprimer un match pour une equipe de la base de données par l'identifiant de l'equipe
     * @param {int} key
     * @param {function} callback
     * @returns {void}
     */
    this.deleteMatch_EquipesByEquipe = function(key,callback){
        this.use(null);
        var sql = "DELETE FROM Match_Equipe WHERE lequipe = " + key + ";";
        smt.query(sql, callback);
    }

    /**
     * Mettre à jour un match dans la base de données
     * @param {int} key
     * @param {Match} match
     * @param {function} callback
     * @returns {void}
     */
    this.update = function (match, callback) {
        this.use(null);
        var values = [match.getResultat1(), match.getResultat2(), match.getSession()];
        var key = match.getId();
        var sql2 = "UPDATE Match_ SET resultat_equipe_1=?,resultat_equipe_2=?,la_session=? WHERE id_match= " + key + ";";
        smt.query(sql2, values, callback);
    };

    /**
     * Supprimer un match de la base de données
     * @param {int} key
     * @param {function} callback
     * @returns {void}
     */
    this.delete = function (key, callback) {
        this.use(null);
        // this.deleteMatch_Equipe(key,null);
        // this.deleteMatch_Eleve(key,null);
        var sql3 = "DELETE FROM Match_ WHERE id_match=" + key + ";";
        smt.query(sql3, callback);
    };

    /**
     * Trouver tout les match présents dans la base de données
     * @param {function} callback
     * @returns {Match[]}
     */
    this.findAll = function (callback) {
        this.use(null);
        var sql4 = "SELECT * FROM Match_";
        smt.query(sql4, callback);
    };

    /**
     * Trouver un match dans la base de données par son identifiant
     * @param {int} key
     * @param {function} callback
     * @returns {Match}
     */
    this.findByKey = function (key, callback) {
        this.use(null);
        var sql5 = "SELECT * FROM Match_ WHERE id_match= " + key + ";";
        smt.query(sql5, callback);
    };

    /**
     * Trouver les matchs dans la base de données par sa session
     * @param {int} key
     * @param {function} callback
     * @returns {Match[]}
     */
    this.findBySession = function (key, callback) {
        this.use(null);
        var sql6 = "SELECT * FROM Match_ WHERE la_session= " + key + ";";
        smt.query(sql6, callback);
    };

    /**
     * Utiliser la bonne base de données
     * @param {function} callback
     */
    this.use = function(callback){
        var sql7 = "USE balabox_sport_db;";
        smt.query(sql7, callback);
    };
    
};
var matchDAO = new MatchDAO();
module.exports = matchDAO;

