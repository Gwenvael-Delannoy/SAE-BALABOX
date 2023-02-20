/**
 * DAO pour Sport
 */
var Sport = require('../sport');
var smt = require('./mysql_connection');

var SportDAO = function(){

    /**
     * Inserer un nouveau sport dans la base de données
     * @param {Sport} sport
     * @param {function} callback
     * @returns {void}
     */
    this.insert = function(sport, callback){
        this.use(null);
        values = [sport.getNomSport(), sport.getDescription()];
        var sql = "INSERT INTO Sport (nom_sport, description_sport) VALUES (?,?)";
        smt.query(sql, values ,callback);
    };

    /**
     * Mettre à jour un sprot dans la base de données
     * @param {int} key
     * @param {Sport} sport
     * @param {function} callback
     * @returns {void}
     */
    this.update = function(key, sport, callback){
        this.use(null);
        values = [sport.getNomSport(), sport.getDescription()];
        var sql2 = "UPDATE Sport SET nom_sport=?,description_sport=? WHERE id_sport= " + key + ";";
        smt.query(sql2,values, callback);
    };

    /**
     * Supprimer un sport de la base de données
     * @param {int} key
     * @param {function} callback
     * @returns {void}
     */
    this.delete = function(key, callback){
        this.use(null);
        var sql3 = "DELETE FROM Sport WHERE id_sport= " + key + ";";
        smt.query(sql3,callback);
    };

    /**
     * Trouver toutes les sports présentes dans la base de données
     * @param {function} callback
     * @returns {Sport[]}
     */ 
    this.findAll = function(callback){
        this.use(null);
        var sql4 = "SELECT * FROM Sport";
        smt.query(sql4, callback);
    };

    /**
     * Trouver un sport dans la base de données par son identifiant
     * @param {int} key
     * @param {function} callback
     * @returns {Sport}
     */ 
    this.findByKey = function(key, callback){
        this.use(null);
        var sql5 = "SELECT * FROM Sport WHERE id_sport= " + key + ";";
        smt.query(sql5,callback);
    };

    /**
     * Trouver un sport dans la base de données par son nom
     * @param {string} name
     * @param {function} callback
     * @returns {Sport}
     */ 
    this.findByName = function(name, callback){
        this.use(null);
        var sql6 = "SELECT * FROM Sport WHERE nom_sport= '" + name + "';";
        smt.query(sql6,callback);
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
     * Supprimer toutes les sports dans la base de données
     * @param {function} callback
     */
    this.deleteAll = function(callback){
        this.use(null);
        var sql8 = "DELETE FROM Sport;";
        smt.query(sql8,callback);
    };
};
var sport = new SportDAO();
module.exports = sport;

