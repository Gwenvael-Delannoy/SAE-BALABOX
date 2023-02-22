/**
 * DAO pour Voie
 */

var Voie = require('../voie');
var smt = require('./mysql_connection');

var VoieDAO = function() {

    /**
     * Inserer une nouvelle voie d'escalade dans la base de données
     * @param {Voie} voie
     * @param {function} callback
     * @returns {void}
     */
    this.insert = function(voie, callback) {
        this.use(null);
        values = [voie.getNomVoie(),voie.getDegDiffi()];
        var sql = "INSERT INTO Voie (nom_voie,deg_diffi) VALUES (?,?)";
        smt.query(sql, values ,callback);
    };

    /**
     * Mettre à jour une voie dans la base de données
     * @param {int} key
     * @param {Voie} voie
     * @param {function} callback
     * @returns {void}
     */
    this.update = function(key, voie, callback) {
        this.use(null);
        values = [voie.getNomVoie(),voie.getDegDiffi()];
        var sql2 = "UPDATE Voie SET nom_voie=?, deg_diffi=? WHERE id_voie= " + key + ";";
        smt.query(sql2,values, callback);
    };

    /**
     * Supprimer une voie de la base de données
     * @param {int} key
     * @param {function} callback
     * @returns {void}
     */
    this.delete = function(key, callback) {
        this.use(null);
        var sql3 = "DELETE FROM Voie WHERE id_voie= " + key + ";";
        smt.query(sql3, callback);
    };

    /**
     * Trouver toutes les voies présentes dans la base de données
     * @param {function} callback
     * @returns {Voie[]}
     */
    this.findAll = function(callback) {
        this.use(null);
        var sql4 = "SELECT * FROM Voie;";
        smt.query(sql4,  callback);
    }

    /**
     * Trouver une voie dans la base de données par son identifiant
     * @param {int} key
     * @param {function} callback
     * @returns {Voie}
     */
    this.findByKey = function(key, callback) {
        this.use(null);
        var sql5 = "SELECT * FROM Voie WHERE id_voie=" + key + ";";
        smt.query(sql5, callback);
    };
        /**
     * Trouver une voie dans la base de données par son nom
     * @param {int} key
     * @param {function} callback
     * @returns {Voie}
     */
    this.findByNom = function(nom, callback) {
        this.use(null);
        var sql6 = "SELECT * FROM Voie WHERE nom_voie='" + nom + "';";
        smt.query(sql6, callback);
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
     * Supprimer toutes les voies dans la base de données
     * @param {function} callback
     */
    this.deleteAll = function(callback){
        this.use(null);
        var sql8 = "DELETE FROM Voie;";
        smt.query(sql8,callback);
    };
};

var voie = new VoieDAO();
module.exports = voie;