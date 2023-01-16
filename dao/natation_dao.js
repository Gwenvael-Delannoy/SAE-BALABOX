/**
 * DAO for Natation
 */
var Natation = require('../models/natation');
var smt = require('./mysql_connection');

var NatationDAO = function(){

    /**
     * Insert a new natation in the database
     * @param {Natation} natation
     * @param {function} callback
     * @returns {void}
     */
    this.insert = function(natation, callback){
        this.use(null);
        values = [natation.getStyleNage() , natation.getPlongeons() , natation.getNomBassin()];
        var sql = "INSERT INTO Natation (style_nage , plongeons , nom_bassin) VALUES (?,?,?)";
        smt.query(sql, values ,callback);
    };

    /**
     * Update a natation in the database
     * @param {int} key
     * @param {Natation} natation
     * @param {function} callback
     * @returns {void}
     */
    this.update = function(key, natation, callback){
        this.use(null);
        values = [natation.getStyleNage() , natation.getPlongeons() , natation.getNomBassin()];
        var sql2 = "UPDATE Natation SET style_nage=? , plongeons=? , nom_bassin=? WHERE id_natation = " + key + ";";
        smt.query(sql2,values, callback);
    };

    /**
     * Delete a natation in the database
     * @param {int} key
     * @param {function} callback
     * @returns {void}
     */
    this.delete = function(key, callback){
        this.use(null);
        var sql3 = "DELETE FROM Natation WHERE id_natation = " + key + ";";
        smt.query(sql3,callback);
    };

    /**
     * Find all musculation in the database
     * @param {function} callback
     * @returns {Natation[]}
     */ 
    this.findAll = function(callback){
        this.use(null);
        var sql4 = "SELECT * FROM Natation";
        smt.query(sql4, callback);
    };

    /**
     * Find a natation in the database by the key of the natation
     * @param {int} key
     * @param {function} callback
     * @returns {Natation}
     */ 
    this.findByKey = function(key, callback){
        this.use(null);
        var sql5 = "SELECT * FROM Natation WHERE id_natation = " + key + ";";
        smt.query(sql5,callback);
    };

    this.use = function(callback){
        var sql7 = "USE balabox_sport_db;";
        smt.query(sql7, callback);
    };

    this.deleteAll = function(callback){
        this.use(null);
        var sql8 = "DELETE FROM Natation;";
        smt.query(sql8,callback);
    };
};
var natation = new NatationDAO();
module.exports = natation;