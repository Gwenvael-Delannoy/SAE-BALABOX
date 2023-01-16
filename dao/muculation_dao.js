/**
 * DAO for Musculation
 */
var Musculation = require('../models/musculation');
var smt = require('./mysql_connection');

var SportDAO = function(){

    /**
     * Insert a new musculation in the database
     * @param {Musculation} musculation
     * @param {function} callback
     * @returns {void}
     */
    this.insert = function(musculation, callback){
        this.use(null);
        values = [musculation.getMuscleTravailler(), musculation.getTempsPause(), musculation.getSeries(), musculation.getNbReps(), musculation.getIntensite(), musculation.getCharge(), musculation.getRessenti()];
        var sql = "INSERT INTO Musculation (muscle_travailler , temps_pause , series , nb_reps , intensite , charge , ressenti) VALUES (?,?,?,?,?,?,?)";
        smt.query(sql, values ,callback);
    };

    /**
     * Update a musculation in the database
     * @param {int} key
     * @param {Musculation} musculation
     * @param {function} callback
     * @returns {void}
     */
    this.update = function(key, musculation, callback){
        this.use(null);
        values = [musculation.getMuscleTravailler(), musculation.getTempsPause(), musculation.getSeries(), musculation.getNbReps(), musculation.getIntensite(), musculation.getCharge(), musculation.getRessenti()];
        var sql2 = "UPDATE Musculation SET muscle_travailler=? , temps_pause=? , series=? , nb_reps=? , intensite=? , charge=? , ressenti=? WHERE id_musculation = " + key + ";";
        smt.query(sql2,values, callback);
    };

    /**
     * Delete a musculation in the database
     * @param {int} key
     * @param {function} callback
     * @returns {void}
     */
    this.delete = function(key, callback){
        this.use(null);
        var sql3 = "DELETE FROM Musculation WHERE id_musculation = " + key + ";";
        smt.query(sql3,callback);
    };

    /**
     * Find all musculation in the database
     * @param {function} callback
     * @returns {Musculation[]}
     */ 
    this.findAll = function(callback){
        this.use(null);
        var sql4 = "SELECT * FROM Musculation";
        smt.query(sql4, callback);
    };

    /**
     * Find a musculation in the database by the key of the musculation
     * @param {int} key
     * @param {function} callback
     * @returns {Musculation}
     */ 
    this.findByKey = function(key, callback){
        this.use(null);
        var sql5 = "SELECT * FROM Musculation WHERE id_musculation = " + key + ";";
        smt.query(sql5,callback);
    };

    this.use = function(callback){
        var sql7 = "USE balabox_sport_db;";
        smt.query(sql7, callback);
    };

    this.deleteAll = function(callback){
        this.use(null);
        var sql8 = "DELETE FROM Musculation;";
        smt.query(sql8,callback);
    };
};
var musculation = new MusculationDAO();
module.exports = musculation;