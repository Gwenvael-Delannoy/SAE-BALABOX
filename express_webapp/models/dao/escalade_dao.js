/**
 * DAO pour Escalade
 */
var Escalade = require('../escalade');
var smt = require('./mysql_connection');

var EscaladeDAO = function() {

    /**
     * Inserer une nouvelle donnée escalade dans la base de données
     * @param {Escalade} escalade
     * @param {function} callback
     * @returns {void}
     */
    this.insert = function(escalade, callback) {
        this.use(null);
        values = [escalade.getId(),escalade.getAssureur(), escalade.getTotalDiff()];
        var sql = "INSERT INTO Escalade (id_escalade,assureur, total_diff) VALUES (?,?,?)";
        smt.query(sql, values ,callback);
    };

    /**
     * Inserer une nouvelle donnée escalade_voie dans la base de données
     * @param {Escalade} escalade
     * @param {Voie} voie
     * @param {function} callback
     * @returns {void}
     */
    this.insertEscalade_voie = function(id_escalade,id_voie, callback) {
        this.use(null);
        values = [id_escalade,id_voie];
        var sql = "INSERT INTO Escalade_Voie (lEscalade, laVoie) VALUES (?,?)";
        smt.query(sql, values ,callback);
    };

    /**
     * Mettre à jour une donnée escalade dans la base de données
     * @param {int} key
     * @param {Escalade} escalade
     * @param {function} callback
     * @returns {void}
     */
    this.update = function(escalade, callback) {
        this.use(null);
        values = [escalade.getAssureur(), escalade.getTotalDiff(),escalade.getId()];
        var sql2 = "UPDATE Escalade SET assureur=?, total_diff=? WHERE id_escalade=?;";
        smt.query(sql2, values ,callback);
    };

    /**
     * Supprimer une donnée escalade de la base de données
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
     * Supprimer une donnée escalade_voie de la base de données
     * @param {int} key
     * @param {function} callback
     * @returns {void}
     */
    this.deleteEscalade_voie = function(key, callback) {
        this.use(null);
        var sql3 = "DELETE FROM Escalade_Voie WHERE lEscalade= " + key + ";";
        smt.query(sql3, callback);
    };

    /**
     * Trouver toutes les données escalade présentes dans la base de données
     * @param {function} callback
     * @returns {Escalade[]}
     */
    this.findAll = function(callback) {
        this.use(null);
        var sql4 = "SELECT * FROM Escalade;";
        smt.query(sql4,  callback);
    };

    /**
     * Trouver une donnée escalade dans la base de données par son identifiant
     * @param {int} key
     * @param {function} callback
     * @returns {Escalade}
     */
    this.findByKey = function(key, callback) {
        this.use(null);
        var sql5 = "SELECT * FROM Escalade WHERE id_escalade= " + key + ";";
        smt.query(sql5, callback);
    };

    /**
     * Trouver une donnée voie dans la base de données par son escalade
     * @param {int} key
     * @param {function} callback
     * @returns {Escalade}
     */
    this.findVoieByEscalade = function(key, callback) {
        this.use(null);
        var sql6 = "SELECT * FROM Escalade_Voie WHERE lEscalade= " + key + ";";
        smt.query(sql6, callback);
    };

    /**
     * Utiliser la bonne base de données
     * @param {function} callback
     */
    this.use = function(callback){
        var sql6 = "USE balabox_sport_db;";
        smt.query(sql6, callback);
    };
    /**
     * Supprimer toutes les données escalade de la base de données
     * @param {function} callback
     */
    this.deleteAll = function(callback){
        this.use(null);
        var sql7 = "DELETE FROM Escalade;";
        smt.query(sql7, callback);
    };

};

var escalade = new EscaladeDAO();
module.exports = escalade;