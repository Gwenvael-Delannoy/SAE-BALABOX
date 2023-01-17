/**
 * DAO for Musculation
 */
var Step = require('../models/step');
var smt = require('./mysql_connection');

var StepAO = function(){

    /**
     * Insert a new step in the database
     * @param {Step} step
     * @param {function} callback
     * @returns {void}
     */
    this.insert = function(step, callback){
        this.use(null);
        values = [step.getTypeMobilite() , step.getRessenti() , step.getParamIndv() , step.getBilanPerso() , step.getPerspective()];
        var sql = "INSERT INTO Step (type_mobilite, ressenti, param_indv, bilan_perso, perspective) VALUES (?,?,?,?,?)";
        smt.query(sql, values ,callback);
    };

    /**
     * Update a Step in the database
     * @param {int} key
     * @param {Step} step
     * @param {function} callback
     * @returns {void}
     */
    this.update = function(key, step, callback){
        this.use(null);
        values = [step.getTypeMobilite() , step.getRessenti() , step.getParamIndv() , step.getBilanPerso() , step.getPerspective()];
        var sql2 = "UPDATE Step SET type_mobilite=? , ressenti=? , param_indv=? , bilan_perso=? , perspective=? WHERE id_step = " + key + ";";
        smt.query(sql2,values, callback);
    };

    /**
     * Delete a Step in the database
     * @param {int} key
     * @param {function} callback
     * @returns {void}
     */
    this.delete = function(key, callback){
        this.use(null);
        var sql3 = "DELETE FROM Step WHERE id_step = " + key + ";";
        smt.query(sql3,callback);
    };

    /**
     * Find all step in the database
     * @param {function} callback
     * @returns {Step[]}
     */ 
    this.findAll = function(callback){
        this.use(null);
        var sql4 = "SELECT * FROM Step";
        smt.query(sql4, callback);
    };

    /**
     * Find a step in the database by the key of the step
     * @param {int} key
     * @param {function} callback
     * @returns {Step}
     */ 
    this.findByKey = function(key, callback){
        this.use(null);
        var sql5 = "SELECT * FROM Step WHERE id_step = " + key + ";";
        smt.query(sql5,callback);
    };

    this.use = function(callback){
        var sql7 = "USE balabox_sport_db;";
        smt.query(sql7, callback);
    };

    this.deleteAll = function(callback){
        this.use(null);
        var sql8 = "DELETE FROM Step;";
        smt.query(sql8,callback);
    };
};
var step = new StepDAO();
module.exports = step;
