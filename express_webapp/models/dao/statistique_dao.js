/**
 * DAO for Statistique
 */
var Statistique = require('../models/statistique');
var smt = require('./mysql_connection');

var StatistiqueDAO = function(){

    /**
     * Insert a new Statistique in the database
     * @param {Statistique} statistique
     * @param {function} callback
     * @returns {void}
     */
    this.insert = function(statistique, callback){
        this.use(null);
        values = [statistique.getIntitule() , statistique.getStats() , statistique.getLEleve()];
        var sql = "INSERT INTO Statistique (intitule , stats , lEleve) VALUES (?,?,?)";
        smt.query(sql, values ,callback);
    };

    /**
     * Update a Statistique in the database
     * @param {int} key
     * @param {Statistique} statistique
     * @param {function} callback
     * @returns {void}
     */
    this.update = function(key, statistique, callback){
        this.use(null);
        values = [statistique.getIntitule() , statistique.getStats() , statistique.getLEleve()];
        var sql2 = "UPDATE Statistique SET intitule=? , stats=? , lEleve=? WHERE id_stats = " + key + ";";
        smt.query(sql2,values, callback);
    };

    /**
     * Delete a Statistique in the database
     * @param {int} key
     * @param {function} callback
     * @returns {void}
     */
    this.delete = function(key, callback){
        this.use(null);
        var sql3 = "DELETE FROM Statistique WHERE id_stats = " + key + ";";
        smt.query(sql3,callback);
    };

    /**
     * Find all Statistique in the database
     * @param {function} callback
     * @returns {Statistique[]}
     */ 
    this.findAll = function(callback){
        this.use(null);
        var sql4 = "SELECT * FROM Statistique";
        smt.query(sql4, callback);
    };

    /**
     * Find a Statistique in the database by the key of the Statistique
     * @param {int} key
     * @param {function} callback
     * @returns {Statistique}
     */ 
    this.findByKey = function(key, callback){
        this.use(null);
        var sql5 = "SELECT * FROM Statistique WHERE id_stats = " + key + ";";
        smt.query(sql5,callback);
    };

    this.use = function(callback){
        var sql7 = "USE balabox_sport_db;";
        smt.query(sql7, callback);
    };

    this.deleteAll = function(callback){
        this.use(null);
        var sql8 = "DELETE FROM Statistique;";
        smt.query(sql8,callback);
    };
};
var statisque = new StatistiqueDAO();
module.exports = statisque;