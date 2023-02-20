/**
 * DAO pour Natation
 */
var Natation = require('../natation');
var smt = require('./mysql_connection');

var NatationDAO = function(){

    /**
     * Inserer une nouvelle donnée natation dans la base de données
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
     * Mettre à jour une donnée natation dans la base de données
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
     * Supprimer une donnée natation de la base de données
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
     * Trouver toutes les données natation présentes dans la base de données
     * @param {function} callback
     * @returns {Natation[]}
     */ 
    this.findAll = function(callback){
        this.use(null);
        var sql4 = "SELECT * FROM Natation";
        smt.query(sql4, callback);
    };

    /**
     * Trouver une donnée natation dans la base de données par son identifiant
     * @param {int} key
     * @param {function} callback
     * @returns {Natation}
     */ 
    this.findByKey = function(key, callback){
        this.use(null);
        var sql5 = "SELECT * FROM Natation WHERE id_natation = " + key + ";";
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
     * Supprimer toutes les doonnées natation dans la base de données
     * @param {function} callback
     */
    this.deleteAll = function(callback){
        this.use(null);
        var sql8 = "DELETE FROM Natation;";
        smt.query(sql8,callback);
    };
};
var natation = new NatationDAO();
module.exports = natation;
