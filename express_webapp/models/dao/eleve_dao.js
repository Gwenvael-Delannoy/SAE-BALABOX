/**
 * DAO pour Eleve
 */
var Eleve = require('../eleve');
var smt = require('./mysql_connection');

var EleveDAO = function() {

    /**
     * Insérer un nouvel élève dans la base de données
     * @param {Eleve} eleve
     * @param {function} callback
     * @returns {void}
     */
    this.insert = function(eleve, callback) {
        this.use(null);
        const values = [eleve.getNom(), eleve.getPrenom(), eleve.getSexe(), eleve.getClasse(), eleve.getTotalPoints()];
        const sql = "INSERT INTO Eleve (nom, prenom, sexe, classe, total_points, l_equipe) VALUES (?, ?, ?, ?, ?)";
        smt.query(sql, values, callback);
    };

    /**
     * Mettre à jour un élève dans la base de données
     * @param {int} key
     * @param {Eleve} eleve
     * @param {function} callback
     * @returns {void}
     */
    this.update = function(key, eleve, callback) {
        this.use(null);
        const values = [eleve.getNom(), eleve.getPrenom(), eleve.getSexe(), eleve.getClasse(), eleve.getTotalPoints()];
        const sql = "UPDATE Eleve SET nom=?, prenom=?, sexe=?, classe=?, total_points=? WHERE id_eleve= " + key + ";";
        smt.query(sql, values, callback);
    };

    /**
     * Supprimer un élève dans la base de données
     * @param {int} key
     * @param {function} callback
     * @returns {void}
     */
    this.delete = function(key, callback) {
        this.use(null);
        const sql = "DELETE FROM Eleve WHERE id_eleve= " + key + ";";
        smt.query(sql, callback);
    };

    /**
     * Trouver tous les élèves dans la base de données
     * @param {function} callback
     * @returns {Eleve[]}
     */ 
    this.findAll = function(callback) {
        this.use(null);
        const sql = "SELECT * FROM Eleve;";
        smt.query(sql, callback);
    };

    /**
     * Trouver un élève dans la base de données par la clé de l'élève
     * @param {int} key
     * @param {function} callback
     * @returns {Eleve}
     */
    this.findByKey = function(key, callback) {
        this.use(null);
        const sql = "SELECT * FROM Eleve WHERE id_eleve= " + key + ";";
        smt.query(sql, callback);
    };

    /**
     * Trouver un élève dans la base de données par le nom de l'élève
     * @param {string} name
     * @param {function} callback
     * @returns {Eleve}
     */
    this.findByName = function(name, callback) {
        this.use(null);
        const sql = "SELECT * FROM Eleve WHERE nom= '" + name + "';";
        smt.query(sql, callback);
    };

    /**
     * Trouver les noms de tous les élèves dans la base de données
     * @param {function} callback
     * @returns {string[]}
     */
    this.findName = function(callback) {
        this.use(null);
        var sql6 = "SELECT prenom FROM Eleve;";
        smt.query(sql6,callback);
    };
    
    /**
     * Trouver le nom d'un eleve dans un match dans la base de données
     * @param {function} callback
     * @returns {string}
     */
    this.findName2 = function(session, callback) {
        this.use(null);
        var sql6 = "SELECT prenom FROM Eleve,Match_Eleve, Match_ WHERE id_eleve = leleve AND un_match = id_match AND la_session= " + session +";";
        smt.query(sql6,callback);
    };
    /**
     * Trouver le nom d'un eleve dans une session dans la base de données
     * @param {function} callback
     * @returns {string[]}
     */
    this.findName3 = function(session, callback) {
        this.use(null);
        var sql7 = "SELECT nom,prenom FROM resultat,eleve WHERE la_session= " + session +" AND unEleve = id_eleve;";
        smt.query(sql7,callback);
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
     * Supprimer tout les élèves dans la base de données
     * @param {function} callback
     */
    this.deleteAll = function(callback){
        this.use(null);
        var sql8 = "DELETE FROM Eleve;";
        smt.query(sql8,callback);
    };

};

var eleve_dao = new EleveDAO();
module.exports = eleve_dao;