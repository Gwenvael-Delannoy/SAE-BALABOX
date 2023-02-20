/**
 * DAO pour Statistique
 */
var Statistique = require('../statistique');
var smt = require('./mysql_connection');

var StatistiqueDAO = function(){

    /**
     * Inserer une nouvelle statisitque dans la base de données
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
     * Mettre à jour une statistique dans la base de données
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
     * Supprimer une statistique de la base de données
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
     * Trouver toutes les statistiques présentes dans la base de données 
     * @param {function} callback
     * @returns {Statistique[]}
     */ 
    this.findAll = function(callback){
        this.use(null);
        var sql4 = "SELECT * FROM Statistique";
        smt.query(sql4, callback);
    };

    /**
     * Trouver une statistique dans la base de données par son identifiant
     * @param {int} key
     * @param {function} callback
     * @returns {Statistique}
     */ 
    this.findByKey = function(key, callback){
        this.use(null);
        var sql5 = "SELECT * FROM Statistique WHERE id_stats = " + key + ";";
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
     * Supprimer toutes les statistiques dans la base de données
     * @param {function} callback
     */
    this.deleteAll = function(callback){
        this.use(null);
        var sql8 = "DELETE FROM Statistique;";
        smt.query(sql8,callback);
    };
};
var statisque = new StatistiqueDAO();
module.exports = statisque;