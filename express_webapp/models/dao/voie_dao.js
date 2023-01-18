/**
 * DAO for Voie
 */

var Voie = require('../models/voie');
var smt = require('./mysql_connection');

var VoieDAO = function() {

    /**
     * Insert a new Voie in the database
     * @param {Voie} voie
     * @param {function} callback
     * @returns {void}
     */
    this.insert = function(voie, callback) {
        this.use(null);
        values = [voie.getDegDiffi];
        var sql = "INSERT INTO Voie (deg_diffi) VALUES (?)";
        smt.query(sql, values ,callback);
    };

    /**
     * Updates the Voie in the database
     * @param {int} key
     * @param {Voie} voie
     * @param {function} callback
     * @returns {void}
     */
    this.update = function(key, voie, callback) {
        this.use(null);
        values = [voie.getDegDiffi()];
        var sql2 = "UPDATE Voie SET deg_diffi=? WHERE id_voie= " + key + ";";
        smt.query(sql2,values, callback);
    };

    /**
     * Delete a Voie in the database
     * @param {int} key
     * @param {function} callback
     * @returns {void}
     */
    this.delete = function(key, callback) {
        this.use(null);
        var sql3 = "DELETE FROM Voie WHERE id_voie= " + key + ";";
        smt.query(sql3, callback);
    };

    /**
     * Find all Voie in the database
     * @param {function} callback
     * @returns {Voie[]}
     */
    this.findAll = function(callback) {
        this.use(null);
        var sql4 = "SELECT * FROM Voie;";
        smt.query(sql4,  callback);
    }

    /**
     * Find a Voie in the database by the key of the Voie
     * @param {int} key
     * @param {function} callback
     * @returns {Voie}
     */
    this.findByKey = function(key, callback) {
        this.use(null);
        var sql5 = "SELECT * FROM Voie WHERE id_voie=" + key + ";";
        smt.query(sql5, callback);
    };

    this.use = function(callback){
        var sql7 = "USE balabox_sport_db;";
        smt.query(sql7, callback);
    };

    this.deleteAll = function(callback){
        this.use(null);
        var sql8 = "DELETE FROM Voie;";
        smt.query(sql8,callback);
    };
};

var voie = new VoieDAO();
module.exports = voie;