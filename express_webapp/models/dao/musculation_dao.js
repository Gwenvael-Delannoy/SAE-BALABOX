/**
 * DAO pour Musculation
 */
var Musculation = require('../musculation');
var smt = require('./mysql_connection');

var MusculationDAO = function(){

    /**
     * Inserer une nouvelle donnée musculation dans la base de données
     * @param {Musculation} musculation
     * @param {function} callback
     * @returns {void}
     */
    this.insert = function(musculation, callback){
        this.use(null);
        console.log(musculation);
        values = [musculation.getId(),musculation.getMuscleTravailler(), musculation.getSeries(), musculation.getNbReps(), musculation.getIntensite(), musculation.getCharge(), musculation.getRessenti()];
        var sql = "INSERT INTO Musculation (id_musculation,muscle_travailler  , series , nb_reps , intensite , charge , ressenti) VALUES (?,?,?,?,?,?,?)";
        smt.query(sql, values ,callback);
    };

    /**
     * Mettre à jour une donnée musculation dans la base de données
     * @param {int} key
     * @param {Musculation} musculation
     * @param {function} callback
     * @returns {void}
     */
    this.update = function(key, musculation, callback){
        this.use(null);
        values = [musculation.getMuscleTravailler(), musculation.getSeries(), musculation.getNbReps(), musculation.getIntensite(), musculation.getCharge(), musculation.getRessenti()];
        var sql2 = "UPDATE Musculation SET muscle_travailler=? , series=? , nb_reps=? , intensite=? , charge=? , ressenti=? WHERE id_musculation = " + key + ";";
        smt.query(sql2,values, callback);
    };

    /**
     * Supprimer une donnée musculation de la base de données
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
     * Trouver toutes les données musculation présentes dans la base de données 
     * @param {function} callback
     * @returns {Musculation[]}
     */ 
    this.findAll = function(callback){
        this.use(null);
        var sql4 = "SELECT * FROM Musculation";
        smt.query(sql4, callback);
    };

    /**
     * Trouver une donnée musculation dans la base de données par son identifiant
     * @param {int} key
     * @param {function} callback
     * @returns {Musculation}
     */ 
    this.findByKey = function(key, callback){
        this.use(null);
        var sql5 = "SELECT * FROM Musculation WHERE id_musculation = " + key + ";";
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
     * Supprimer toutes les données musculation dans la base de données
     * @param {function} callback
     */
    this.deleteAll = function(callback){
        this.use(null);
        var sql8 = "DELETE FROM Musculation;";
        smt.query(sql8,callback);
    };
};
var musculation = new MusculationDAO();
module.exports = musculation;
