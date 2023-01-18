/**
 * DAO for Figure
 */
var Figure = require('../models/figure');
var smt = require('./mysql_connection');

var FigureDAO = function() {

    /**
     * Insert a new figure in the database
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
     * Update a figure in the database
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
     * Delete a figure in the database
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
     * Find all figure in the database
     * @param {function} callback
     * @returns {Figure[]}
     */
    this.findAll = function(callback) {
        this.use(null);
        var sql4 = "SELECT * FROM Figure;";
        smt.query(sql4,  callback);
    };

    /**
     * Find a figure in the database by the key of the figure
     * @param {int} key
     * @param {function} callback
     * @returns {Figure}
     */
    this.findByKey = function(key, callback) {
        this.use(null);
        var sql5 = "SELECT * FROM Figure WHERE id_figure = " + key + ";";
        smt.query(sql5, callback);
    };

    this.use = function(callback){
        var sql7 = "USE balabox_sport_db;";
        smt.query(sql7, callback);
    };

    this.deleteAll = function(callback){
        this.use(null);
        var sql8 = "DELETE FROM Figure;";
        smt.query(sql8,callback);
    };

};

var figure = new FigureDAO();
module.exports = figure;





