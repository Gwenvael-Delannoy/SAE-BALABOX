/**
 * DAO for Sport
 */
var Sport = require('../models/sport');
var smt = require('./mysql_connection');

var SportDAO = function(){

    /**
     * Insert a new sport in the database
     * @param {Sport} sport
     * @param {function} callback
     * @returns {void}
     */
    this.insert = function(sport, callback){
        values = [sport.getNom(), sport.getDescription()];
        var sql = "INSERT INTO Sport (nom_sport, description_sport) VALUES (?,?)";
        smt.query(sql, values ,callback);
    };

    /**
     * Update a sport in the database
     * @param {int} key
     * @param {Sport} sport
     * @param {function} callback
     * @returns {void}
     */
    this.update = function(key, values, callback){
        var sql2 = "UPDATE Sport SET nom_sport=?,description_sport=? WHERE id_sport= " + key + ";";
        smt.query(sql2,values, callback);
    };

    /**
     * Delete a sport in the database
     * @param {int} key
     * @param {function} callback
     * @returns {void}
     */
    this.delete = function(key, callback){
        var sql3 = "DELETE FROM Sport WHERE id_sport= " + key + ";";
        smt.query(sql3,callback);
    };

    /**
     * Find all sport in the database
     * @param {function} callback
     * @returns {Sport[]}
     */ 
    this.findAll = function(callback){
        this.use(null);
        var sql4 = "SELECT * FROM Sport";
        smt.query(sql4, callback);
    };

    /**
     * Find a sport in the database by the key of the sport
     * @param {int} key
     * @param {function} callback
     * @returns {Sport}
     */ 
    this.findByKey = function(key, callback){
        var sql5 = "SELECT * FROM Sport WHERE id_sport= " + key + ";";
        smt.query(sql5,callback);
    };

    /**
     * Find a sport in the database by the name of the sport
     * @param {string} name
     * @param {function} callback
     * @returns {Sport}
     */ 
    this.findByName = function(name, callback){
        var sql6 = "SELECT * FROM Sport WHERE nom_sport= '" + name + "';";
        smt.query(sql6,callback);
    };

    this.use = function(callback){
        var sql = "USE balabox_sport_db;";
        smt.query(sql, callback);
    };
};
var sport = new SportDAO();
module.exports = sport;

