/**
 * DAO for Eleve
 */
var Eleve = require('../eleve');
var smt = require('./mysql_connection');

var EleveDAO = function() {

    /**
     * Insert a new eleve in the database
     * @param {Eleve} eleve
     * @param {function} callback
     * @returns {void}
     */
    this.insert = function(eleve, callback) {
        this.use(null);
        values = [ eleve.getNom(), eleve.getPrenom(), eleve.getSexe(), eleve.getClasse(),eleve.getTotalPoints(), eleve.getEquipe()];
        var sql = "INSERT INTO Eleve (nom , prenom, sexe ,classe, total_points, l_equipe) VALUES (?,?,?,?,?,?)";
        smt.query(sql, values ,callback);
    };

    /**
     * Update a eleve in the database
     * @param {int} key
     * @param {Eleve} eleve
     * @param {function} callback
     * @returns {void}
     */
    this.update = function(key, eleve, callback) {
        this.use(null);
        values = [eleve.getNom(), eleve.getPrenom(), eleve.getSexe(), eleve.getClasse(),eleve.getTotalPoints(), eleve.getEquipe()];
        var sql2 = "UPDATE Eleve SET nom=?, prenom=?, sexe=?, classe=?, total_points=?, l_equipe=? WHERE id_eleve= " + key + ";";
        smt.query(sql2,values, callback);
    };

    /**
    * Delete a eleve in the database
    * @param {int} key
    * @param {function} callback
    * @returns {void}
    */
    this.delete = function(key, callback) {
        this.use(null);
        var sql3 = "DELETE FROM Eleve WHERE id_eleve= " + key + ";";
        smt.query(sql3, callback);
    };

    /**
     * Find all eleve in the database
     * @param {function} callback
     * @returns {Eleve[]}
     */ 
    this.findAll = function(callback) {
        this.use(null);
        var sql4 = "SELECT * FROM Eleve;";
        smt.query(sql4,  callback);
    };

    /**
     * Find a eleve in the database by the key of the eleve
     * @param {int} key
     * @param {function} callback
     * @returns {Eleve}
     */
    this.findByKey = function(key, callback) {
        this.use(null);
        var sql5 = "SELECT * FROM Eleve WHERE id_eleve= " + key + ";";
        smt.query(sql5,callback);
    };

    /**
     * Find a eleve in the database by the name of the eleve
     * @param {string} name
     * @param {function} callback
     * @returns {Eleve}
     */
    this.findByName = function(name, callback) {
        this.use(null);
        var sql6 = "SELECT * FROM Eleve WHERE nom= '" + name + "';";
        smt.query(sql6,callback);
    };

    this.findName = function(callback) {
        this.use(null);
        var sql6 = "SELECT prenom FROM Eleve;";
        smt.query(sql6,callback);
    };

    this.findName2 = function(session, callback) {
        this.use(null);
        var sql6 = "SELECT prenom FROM Eleve,Match_Eleve, Match_ WHERE id_eleve = leleve AND un_match = id_match AND la_session= " + session +";";
        smt.query(sql6,callback);
    };



    this.use = function(callback){
        var sql7 = "USE balabox_sport_db;";
        smt.query(sql7, callback);
    };

    this.deleteAll = function(callback){
        this.use(null);
        var sql8 = "DELETE FROM Eleve;";
        smt.query(sql8,callback);
    };

};

var eleve_dao = new EleveDAO();
module.exports = eleve_dao;