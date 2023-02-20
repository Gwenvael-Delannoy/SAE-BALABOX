/**
 * DAO pour Figure
 */
var Figure = require('../figure');
var smt = require('./mysql_connection');

var FigureDAO = function() {

    /**
     * Inserer une nouvelle figure dans la base de données
     * @param {Figure} figure
     * @param {function} callback
     * @returns {void}
     */
    this.insert = function(figure, callback) {
        this.use(null);
        values = [ figure.getNom(), figure.getDescription(), figure.getPoint()];
        var sql = "INSERT INTO Figure (nom, description, point ) VALUES (?,?,?)";
        smt.query(sql, values ,callback);
    };

    /**
     *  Mettre à jour une figure dans la base de données
     * @param {int} key
     * @param {Figure} figure
     * @param {function} callback
     * @returns {void}
     */
    this.update = function(key, figure, callback) {
        this.use(null);
        values = [figure.getId(), figure.getNom(), figure.getDescription(), figure.getPoint()];
        var sql2 = "UPDATE Figure SET nom=?, description=?, point=? WHERE id_figure= " + key + ";";
        smt.query(sql2,values, callback);
    };
    
    /**
     * Supprimer une figure de la base de données
     * @param {int} key
     * @param {function} callback
     * @returns {void}
     */
    this.delete = function(key, callback) {
        this.use(null);
        var sql3 = "DELETE FROM Figure WHERE id_figure= " + key + ";";
        smt.query(sql3, callback);
    };

    /**
     * Trouver toutes les figures présentes dans la base de données 
     * @param {function} callback
     * @returns {Figure[]}
     */
    this.findAll = function(callback) {
        this.use(null);
        var sql4 = "SELECT * FROM Figure;";
        smt.query(sql4,  callback);
    };

    /**
     * Trouver une figure dans la base de données par son identifiant
     * @param {int} key
     * @param {function} callback
     * @returns {Figure}
     */
    this.findByKey = function(key, callback) {
        this.use(null);
        var sql5 = "SELECT * FROM Figure WHERE id_figure = " + key + ";";
        smt.query(sql5, callback);
    };
        /**
     * Trouver une figure dans la base de données par son nom
     * @param {int} key
     * @param {function} callback
     * @returns {Figure}
     */
    this.findByNom = function(nom, callback) {
        this.use(null);
        var sql6 = "SELECT * FROM Figure WHERE nom = " + nom + ";";
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
     * Supprimer toutes les figures dans la base de données
     * @param {function} callback
     */
    this.deleteAll = function(callback){
        this.use(null);
        var sql8 = "DELETE FROM Figure;";
        smt.query(sql8,callback);
    };

};

var figure = new FigureDAO();
module.exports = figure;





