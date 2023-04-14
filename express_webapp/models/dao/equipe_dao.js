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

    this.insertEleveEquipe = function(key1,key2, callback) {
        this.use(null);
        values = [ key1, key2];
        var sql = "INSERT INTO Eleve_Equipe (l_eleve, l_equipe) VALUES (?,?)";
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
        var sql6 = "SELECT * FROM Equipe INNER JOIN Match_equipe ON Equipe.id_equipe = Match_equipe.lequipe INNER JOIN Match_ ON Match_equipe.le_match = Match_.id_match WHERE Match_.la_session = " + key + ";";
        smt.query(sql6, callback);
    };

    this.findByKeyEleve = function(key, callback) {
        this.use(null);
        var sql5 = "SELECT * FROM Equipe,Eleve_Equipe WHERE Equipe.id_equipe = Eleve_Equipe.l_equipe AND Eleve_Equipe.l_eleve = " + key + ";";
        smt.query(sql5, callback);
    };

    this.findAllEquipeEleve = function(callback) {
        this.use(null);
        var sql5 = "SELECT * FROM Equipe,Eleve_Equipe,Eleve WHERE Equipe.id_equipe = Eleve_Equipe.l_equipe AND Eleve.id_eleve=Eleve_Equipe.l_eleve;";
        smt.query(sql5, callback);
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