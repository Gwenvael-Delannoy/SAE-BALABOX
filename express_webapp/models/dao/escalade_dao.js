/**
 * DAO for Equipe
 */
var Equipe = require('../Equipe');
var smt = require('./mysql_connection');

var EquipeDAO = function() {

    /**
     * Inserter a new Equipe in the database
     * @param {Equipe} equipe
     * @param {function} callback
     * @returns {void}
     */
    this.insert = function(equipe, callback) {
        this.use(null);
        values = [ equipe.getNbJoueurs(), equipe.getTotal()];
        var sql = "INSERT INTO Equipe (nb_joueurs , total) VALUES (?,?)";
        smt.query(sql, values ,callback);
    };

    /**
     * Update a Equipe in the database
     * @param {int} key
     * @param {Equipe} equipe
     * @param {function} callback
     * @returns {void}
     */
    this.update = function(key, equipe, callback) {
        this.use(null);
        values = [equipe.getNbJoueurs(), equipe.getTotal()];
        var sql2 = "UPDATE Equipe SET nb_joueurs=?, total=? WHERE id_equipe= " + key + ";";
        smt.query(sql2,values, callback);
    };

    /**
     * Delete a Equipe in the database
     * @param {int} key
     * @param {function} callback
     * @returns {void}
     */
    this.delete = function(key, callback) {
        this.use(null);
        var sql3 = "DELETE FROM Equipe WHERE id_equipe= " + key + ";";
        smt.query(sql3, callback);
    };

    /**
     * Find all Equipe in the database
     * @param {function} callback
     * @returns {Equipe[]}
     */
    this.findAll = function(callback) {
        this.use(null);
        var sql4 = "SELECT * FROM Equipe;";
        smt.query(sql4,  callback);
    };

    /**
     * Find a Equipe in the database by the key of the Equipe
     * @param {int} key
     * @param {function} callback
     * @returns {Equipe}
     */
    this.findByKey = function(key, callback) {
        this.use(null);
        var sql5 = "SELECT * FROM Equipe WHERE id_equipe= " + key + ";";
        smt.query(sql5, callback);
    };

    this.use = function(callback) {
        var sql7 = "USE balabox_sport_db;";
        smt.query(sql7, callback);
    }

    this.deleteAll = function(callback) {
        this.use(null);
        var sql6 = "DELETE FROM Equipe;";
        smt.query(sql6, callback);
    };
};

var equipe = new EquipeDAO();
module.exports = equipe;