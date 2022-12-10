/**
 * DAO for session
 */
var Session = require('./models/session');
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
        var sql = "INSERT INTO Session (date_session, statut, heure, identifiant_con, mdp, professeur, type_session, le_sport) VALUES ($date_session, $statut, $heure, $identifiant_con, $mdp, $professeur, $type_session, $le_sport)";
        smt.run(sql, values ,callback);
    };

    /**
     * Update a session in the database
     * @param {int} key
     * @param {Session} session
     * @param {function} callback
     * @returns {void}
     */
    this.update = function(key, values, callback){
        var sql2 = "UPDATE Session SET date_session=$date_session,statut=$statut,heure=$heure,identifiant_con=$identifiant_con,mdp=$mdp,professeur=$professeur,type_session=$type_session,le_sport=$le_sport WHERE id_session= " + key + ";";
        smt.run(sql2,values, callback);
    };

    /**
     * Delete a session in the database
     * @param {int} key
     * @param {function} callback
     * @returns {void}
     */
    this.delete = function(key, callback){
        var sql3 = "DELETE FROM Session WHERE id_session= " + key + ";";
        smt.run(sql3,callback);
    };

    /**
     * Find all session in the database
     * @param {function} callback
     * @returns {Session[]}
     */
    this.findAll = function(callback){
        var sql4 = "SELECT * FROM Session";
        smt.all(sql4, callback);
    };

    /**
     * Find a session in the database by the key of the session
     * @param {int} key
     * @param {function} callback
     * @returns {Session}
     */
    this.findByKey = function(key, callback){
        var sql5 = "SELECT * FROM Session WHERE id_session = " + key + ";";
        smt.get(sql5, callback);
    };
};
var sessionDAO = new SessionDAO();
module.exports = sessionDAO;

