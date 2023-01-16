/**
 * DAO for Escalade
 */
var Escalade = require('../models/escalade');
var smt = require('./mysql_connection');

var EscaladeDAO = function() {

    /**
     * Insert a new escalade in the database
     * @param {Escalade} escalade
     * @param {function} callback
     * @returns {void}
     */
    this.insert = function(escalade, callback) {
        this.use(null);
        values = [ escalade.getAssureur(), escalade.getTotalDiff()];
        var sql = "INSERT INTO Escalade (assureur, total_diff) VALUES (?,?)";
        smt.query(sql, values ,callback);
    };

    /**
     * Update a escalade in the database
     * @param {int} key
     * @param {Escalade} escalade
     * @param {function} callback
     * @returns {void}
     */
    this.update = function(key, escalade, callback) {
        this.use(null);
        values = [escalade.getId(), escalade.getAssureur(), escalade.getTotalDiff()];
        var sql2 = "UPDATE Escalade SET assureur=?, total_diff=? WHERE id_escalade= " + key + ";";
    };

    /**
     * Delete a escalade in the database
     * @param {int} key
     * @param {function} callback
     * @returns {void}
     */
    this.delete = function(key, callback) {
        this.use(null);
        var sql3 = "DELETE FROM Escalade WHERE id_escalade= " + key + ";";
        smt.query(sql3, callback);
    };

    /**
     * Find all escalade in the database
     * @param {function} callback
     * @returns {Escalade[]}
     */
    this.findAll = function(callback) {
        this.use(null);
        var sql4 = "SELECT * FROM Escalade;";
        smt.query(sql4,  callback);
    };

    /**
     * Find a escalade in the database by the key of the escalade
     * @param {int} key
     * @param {function} callback
     * @returns {Escalade}
     */
    this.findByKey = function(key, callback) {
        this.use(null);
        var sql5 = "SELECT * FROM Escalade WHERE id_escalade= " + key + ";";
        smt.query(sql5, callback);
    };

    this.use = function(callback){
        var sql6 = "USE balabox_sport_db;";
        smt.query(sql6, callback);
    };

    this.deleteAll = function(callback){
        this.use(null);
        var sql7 = "DELETE FROM Escalade;";
        smt.query(sql7, callback);
    };

};

var escalade = new EscaladeDAO();
module.exports = escalade;