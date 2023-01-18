/**
 * DAO for session
 */
var Session = require('../models/session');
var smt = require('./mysql_connection');

var SessionDAO = function(){
    
    /**
        * Insert a new session in the database
        * @param {Session} session
        * @param {function} callback
        * @returns {void}
        */
     this.insert = function(session, callback){
        values = [session.getDate(), session.getStatut(), session.getHeure(), session.getIdentifiant(), session.getMdp(), session.getProfesseur(), session.getType(), session.getSport()];
        var sql = "INSERT INTO Session (date_session, statut, heure, identifiant_con, mdp, professeur, type_session, le_sport) VALUES (?,?,?,?,?,?,?,?)";
        smt.query(sql, values ,callback);
    };

    /**
     * Update a session in the database
     * @param {int} key
     * @param {Session} session
     * @param {function} callback
     * @returns {void}
     */
    this.update = function(key, values, callback){
        var sql2 = "UPDATE Session SET date_session=?,statut=?,heure=?,identifiant_con=?,mdp=?,professeur=?,type_session=?,le_sport=? WHERE id_session=?;";
        values.push(key);
        smt.query(sql2,values, callback);
    };

    /**
     * Delete a session in the database
     * @param {int} key
     * @param {function} callback
     * @returns {void}
     */
    this.delete = function(key, callback){
        var sql3 = "DELETE FROM Session WHERE id_session=?;";
        smt.query(sql3,key,callback);
    };

    /**
     * Find all session in the database
     * @param {function} callback
     * @returns {Session[]}
     */
    this.findAll = function(callback){
        var sql4 = "SELECT * FROM Session";
        smt.query(sql4, callback);
    };

    /**
     * Find a session in the database by the key of the session
     * @param {int} key
     * @param {function} callback
     * @returns {Session}
     */
    this.findByKey = function(key, callback){
        var sql5 = "SELECT * FROM Session WHERE id_session =?;";
        smt.query(sql5, key,callback);
    };

    /**
     * Find a session in the database by the id_connection
     * @param {string} id_con 
     * @param {function} callback 
     * @return {Session}
     */
    this.FindByIdCon = function(id_con, callback){
        var sql6 = "SELECT * FROM Session WHERE identifiant_con  = '" + id_con + "';";
        smt.query(sql6, id_con, callback);
    };
};
var sessionDAO = new SessionDAO();
module.exports = sessionDAO;

