/**
 * DAO pour Equipe
 */
var Equipe = require('../Equipe');
var smt = require('./mysql_connection');

var EquipeDAO = function() {

    /**
     * Inserer une nouvelle équipe dans la base de données
     * @param {Equipe} equipe
     * @param {function} callback
     * @returns {void}
     */
    this.insert = function(equipe, callback) {
        this.use(null);
        values = [ equipe.getNbJoueurs(), equipe.getTotal()];
        var sql = "INSERT INTO Equipe (nb_joueurs , total) VALUES (?,?)";
        smt.query(sql, values ,callback);
    };

    /**
     * Mettre à jour une equipe dans la base de données
     * @param {int} key
     * @param {Equipe} equipe
     * @param {function} callback
     * @returns {void}
     */
    this.update = function(key, equipe, callback) {
        this.use(null);
        values = [equipe.getNbJoueurs(), equipe.getTotal()];
        var sql2 = "UPDATE Equipe SET nb_joueurs=?, total=? WHERE id_equipe= " + key + ";";
        smt.query(sql2,values, callback);
    };

    /**
     * Supprimer une equipe de la base de données
     * @param {int} key
     * @param {function} callback
     * @returns {void}
     */
    this.delete = function(key, callback) {
        this.use(null);
        var sql3 = "DELETE FROM Equipe WHERE id_equipe= " + key + ";";
        smt.query(sql3, callback);
    };

    /**
     * Trouver toutes les equipes présentes dans la base de données 
     * @param {function} callback
     * @returns {Equipe[]}
     */
    this.findAll = function(callback) {
        this.use(null);
        var sql4 = "SELECT * FROM Equipe;";
        smt.query(sql4,  callback);
    };

    /**
     * Trouver une equipe dans la base de données par son identifiant
     * @param {int} key
     * @param {function} callback
     * @returns {Equipe}
     */
    this.findByKey = function(key, callback) {
        this.use(null);
        var sql5 = "SELECT * FROM Equipe WHERE id_equipe= " + key + ";";
        smt.query(sql5, callback);
    };
    this.findEquipeSession = function(key, callback) {
        this.use(null);
        //on recupere les equipes de la session grace a des jointures avec match_equipe , match et equipe
        var sql6 = "SELECT * FROM Equipe WHERE id_equipe IN (SELECT id_equipe FROM Match_equipe WHERE id_match IN (SELECT id_match FROM Match WHERE id_session = " + key + "));";
        smt.query(sql6, callback);
    };


    /**
     * Utiliser la bonne base de données
     * @param {function} callback
     */
    this.use = function(callback) {
        var sql7 = "USE balabox_sport_db;";
        smt.query(sql7, callback);
    }
    /**
     * Supprimer toutes les equipes dans la base de données
     * @param {function} callback
     */
    this.deleteAll = function(callback) {
        this.use(null);
        var sql6 = "DELETE FROM Equipe;";
        smt.query(sql6, callback);
    };
};

var equipe = new EquipeDAO();
module.exports = equipe;