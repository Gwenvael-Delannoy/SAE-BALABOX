/**
 * DAO pour Resultat
 */

var Resultat = require('../resultat');
var smt = require('./mysql_connection');

var ResultatDAO = function() {


    /**
     * Inserer un nouveau resultat dans la base de données
     * @param {Resultat} resultat
     * @param {function} callback
     * @returns {void}
     */
    this.insert = function(resultat, callback) {
        this.use(null);
        values = [ resultat.getTemps(), resultat.getDistance(), resultat.getFreqCard(), resultat.getComplementaire(), resultat.getSession(), resultat.getEleve()];
        var sql = "INSERT INTO Resultat (temps , distance, freq_card, complementaire , la_session, unEleve  ) VALUES (?,?,?,?,?,?)";
        smt.query(sql, values ,callback);
    };

    /**
     * Mettre à jour un resultat dans la base de données
     * @param {int} key
     * @param {Resultat} resultat
     * @param {function} callback
     * @returns {void}
    */
    this.update = function(key, resultat, callback) {
        this.use(null);
        values = [resultat.getTemps(), resultat.getDistance(), resultat.getFreqCard(), resultat.getComplementaire(), resultat.getSession(), resultat.getEleve()];
        var sql2 = "UPDATE Resultat SET temps=?, distance=?, freq_card=?, complementaire=?, la_session=?, unEleve=? WHERE id_resultat= " + key + ";";
        smt.query(sql2,values, callback);
    };

    /**
     * Supprimer un resultat de la base de données
     * @param {int} key
     * @param {function} callback
     * @returns {void}
     */
    this.delete = function(key, callback) {
        this.use(null);
        var sql3 = "DELETE FROM Resultat WHERE id_resultat= " + key + ";";
        smt.query(sql3, callback);
    };

    /**
     * Trouver tout les resultats présent dans la base de données 
     * @param {function} callback
     * @returns {Resultat[]}
     */
    this.findAll = function(callback) {
        this.use(null);
        var sql4 = "SELECT * FROM Resultat;";
        smt.query(sql4,  callback);
    };

    /**
     * Trouver un resultat dans la base de données par son identifiant
     * @param {int} key
     * @param {function} callback
     * @returns {Resultat}
     */
    this.findByKey = function(key, callback) {
        this.use(null);
        var sql5 = "SELECT * FROM Resultat WHERE id_resultat= " + key + ";";
        smt.query(sql5, callback);
    };

    /**
     * Utiliser la bonne base de données
     * @param {function} callback
     */
    this.use = function(callback) {
        var sql7 = "USE balabox_sport_db;";
        smt.query(sql7, callback);
    };

    /**
     * Supprimer tout les resultats dans la base de données
     * @param {function} callback
     */
    this.deleteAll = function(callback) {
        this.use(null);
        var sql6 = "DELETE FROM Resultat;";
        smt.query(sql6,callback);
    };
};

var resultat = new ResultatDAO();
module.exports = resultat;


