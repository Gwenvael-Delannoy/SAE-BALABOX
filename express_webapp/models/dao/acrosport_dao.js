/**
 * DAO for Acrosport
 */
var Acrosport = require('../acrosport');
var smt = require('./mysql_connection');

var AcrosportDAO = function() {

    /**
     * Insert a new Acrosport in the database
     * @param {Acrosport} acrosport
     * @param {function} callback
     * @returns {void}
     */
    this.insert = function(acrosport, callback) {
        this.use(null);
        values = [ acrosport.getTotalPoint(), acrosport.getLesFigures()];
        var sql = "INSERT INTO Acrosport (total_point  , lesFigures) VALUES (?,?)";
        smt.query(sql, values ,callback);
    };

    /**
     * Update a Acrosport in the database
     * @param {int} key
     * @param {Acrosport} acrosport
     * @param {function} callback
     * @returns {void}
     */
    this.update = function(key, acrosport, callback) {
        this.use(null);
        values = [acrosport.getId(), acrosport.getTotalPoint()];
        var sql2 = "UPDATE Acrosport SET total_point=? WHERE id_acrosport= " + key + ";";
        smt.query(sql2,values, callback);
    };

    /**
     * Delete a Acrosport in the database
     * @param {int} key
     * @param {function} callback
     * @returns {void}
     */
    this.delete = function(key, callback) {
        this.use(null);
        var sql3 = "DELETE FROM Acrosport WHERE id_acrosport= " + key + ";";
        smt.query(sql3, callback);
    };

    /**
     * Find all Acrosport in the database
     * @param {function} callback
     * @returns {Acrosport[]}
     */
    this.findAll = function(callback) {
        this.use(null);
        var sql4 = "SELECT * FROM Acrosport;";
        smt.query(sql4,  callback);
    }

    /**
     * Find a Acrosport in the database by the key of the Acrosport
     * @param {int} key
     * @param {function} callback
     * @returns {Acrosport}
     */
    this.findByKey = function(key, callback) {
        this.use(null);
        var sql5 = "SELECT * FROM Acrosport WHERE id_acrosport= " + key + ";";
        smt.query(sql5, callback);
    };

    this.use = function(callback){
        var sql7 = "USE balabox_sport_db;";
        smt.query(sql7, callback);
    };

    this.deleteAll = function(callback){
        this.use(null);
        var sql8 = "DELETE FROM Acrosport;";
        smt.query(sql8,callback);
    };
};

var acrosport = new AcrosportDAO();
module.exports = acrosport;