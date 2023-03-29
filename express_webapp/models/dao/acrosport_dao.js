/**
 * DAO Pour Acrosport
 */
var Acrosport = require('../acrosport');
var smt = require('./mysql_connection');

var AcrosportDAO = function() {

    /**
     * Insérer un nouveau Acrosport dans la base de données
     * @param {Acrosport} acrosport
     * @param {function} callback
     * @returns {void}
     */
    this.insert = function(acrosport, callback) {
        this.use(null);
        var valeurs = [acrosport.getId(),acrosport.getTotalPoint()];
        var sql = "INSERT INTO Acrosport (id_acrosport,total_point) VALUES (?,?)";
        smt.query(sql, valeurs, callback);
    };

    /**
     * Insérer un nouveau Figure_Acrosport dans la base de données
     * @param {int} id_acrosport
     * @param {int} id_figure
     * @param {function} callback
     * @returns {void}
     */

    this.insertFigure_acrosport = function(id_acrosport,id_figure, callback) {
        this.use(null);
        var valeurs = [id_acrosport,id_figure];
        var sql = "INSERT INTO Figure_Acrosport (lAcrosport,laFigure) VALUES (?,?)";
        smt.query(sql, valeurs, callback);
    };


    /**
     * Mettre à jour un Acrosport dans la base de données
     * @param {int} key
     * @param {Acrosport} acrosport
     * @param {function} callback
     * @returns {void}
     */
    this.update = function(key, acrosport, callback) {
        this.use(null);
        var valeurs = [acrosport.getTotalPoint()];
        var sql = "UPDATE Acrosport SET total_point=? WHERE id_acrosport=" + key + ";";
        smt.query(sql, valeurs, callback);
    };

    /**
     * Supprimer un Acrosport dans la base de données
     * @param {int} key
     * @param {function} callback
     * @returns {void}
     */
    this.delete = function(key, callback) {
        this.use(null);
        var sql = "DELETE FROM Acrosport WHERE id_acrosport=" + key + ";";
        smt.query(sql, callback);
    };

    /**
     * Supprimer un Figure_Acrosport dans la base de données
     * @param {int} key
     * @param {function} callback
     * @returns {void}
     */
    this.deleteFigure_acrosport = function(key, callback) {
        this.use(null);
        var sql = "DELETE FROM Figure_Acrosport WHERE lAcrosport=" + key + ";";
        smt.query(sql, callback);
    };

    /**
     * Trouver tous les Acrosport dans la base de données
     * @param {function} callback
     * @returns {Acrosport[]}
     */
    this.findAll = function(callback) {
        this.use(null);
        var sql = "SELECT * FROM Acrosport;";
        smt.query(sql, callback);
    }

    /**
     * Trouver un Acrosport dans la base de données par la clé de l'Acrosport
     * @param {int} key
     * @param {function} callback
     * @returns {Acrosport}
     */
    this.findByKey = function(key, callback) {
        this.use(null);
        var sql = "SELECT * FROM Acrosport WHERE id_acrosport=" + key + ";";
        smt.query(sql, callback);
    };

    /**
     * Utiliser la base de données balabox_sport_db
     * @param {function} callback
     * @returns {void}
     */
    this.use = function(callback) {
        var sql = "USE balabox_sport_db;";
        smt.query(sql, callback);
    };

    /**
     * Supprimer tous les Acrosport dans la base de données
     * @param {function} callback
     * @returns {void}
     */
    this.deleteAll = function(callback) {
        this.use(null);
        var sql = "DELETE FROM Acrosport;";
        smt.query(sql, callback);
    };
};

var acrosport = new AcrosportDAO();
module.exports = acrosport;