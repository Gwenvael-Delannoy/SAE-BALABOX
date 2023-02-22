/**
 * DAO pour Step
 */
var Step = require('../step');
var smt = require('./mysql_connection');

var StepDAO = function(){

    /**
     * Inserer une nouvelle donnée step dans la base de données
     * @param {Step} step
     * @param {function} callback
     * @returns {void}
     */
    this.insert = function(step, callback){
        this.use(null);
        values = [step.getId(),step.getTypeMobilite() , step.getRessenti() , step.getParamIndv() , step.getBilanPerso() , step.getPerspective()];
        var sql = "INSERT INTO Step (id_step,type_mobilite, ressenti, param_indv, bilan_perso, perspective) VALUES (?,?,?,?,?,?)";
        smt.query(sql, values ,callback);
    };

    /**
     *  Mettre à jour une donnée step dans la base de données
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
     * Supprimer une donnée step de la base de données
     * @param {int} key
     * @param {function} callback
     * @returns {void}
     */
    this.delete = function(key, callback){
        this.use(null);
        var sql3 = "DELETE FROM Step WHERE id_step ="+key+";";
        smt.query(sql3,callback);
    };

    /**
     * Trouver toutes les données step présentes dans la base de données 
     * @param {function} callback
     * @returns {Step[]}
     */ 
    this.findAll = function(callback){
        this.use(null);
        var sql4 = "SELECT * FROM Step";
        smt.query(sql4, callback);
    };

    /**
     * Trouver une donnée step dans la base de données par son identifiant
     * @param {int} key
     * @param {function} callback
     * @returns {Step}
     */ 
    this.findByKey = function(key, callback){
        this.use(null);
        var sql5 = "SELECT * FROM Step WHERE id_step = " + key + ";";
        smt.query(sql5,callback);
    };
    /**
     * Utiliser la bonne base de données
     * @param {function} callback
     */
    this.use = function(callback){
        var sql7 = "USE balabox_sport_db;";
        smt.query(sql7, callback);
    };
    /**
     * Supprimer toutes les données step dans la base de données
     * @param {function} callback
     */
    this.deleteAll = function(callback){
        this.use(null);
        var sql8 = "DELETE FROM Step;";
        smt.query(sql8,callback);
    };
};
var step_dao = new StepDAO();
module.exports = step_dao;
