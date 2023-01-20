/**
 * DAO for session
 */
var Session = require('../session');
var smt = require('./mysql_connection');

var SessionDAO = function(){
    
    /**
        * Insert a new session in the database
        * @param {Session} session
        * @param {function} callback
        * @returns {void}
        */
     this.insert = function(session, callback){
        this.use(null);
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
        this.use(null);
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
        this.use(null);
        var sql3 = "DELETE FROM Session WHERE id_session=?;";
        smt.query(sql3,key,callback);
    };

    /**
     * Find all session in the database
     * @param {function} callback
     * @returns {Session[]}
     */
    this.findAll = function(callback){
        this.use(null);
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
        this.use(null);
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
        this.use(null);
        var sql6 = "SELECT * FROM Session WHERE identifiant_con=?;";
        smt.query(sql6, id_con, callback);
    };

    /**
     * Find a session with his sport in the database by the professeur
     * @param {string} nomProf 
     * @param {function} callback 
     * @return {Session}
     */
    this.FindSessionProfSport = function(nomProf, callback){
        this.use(null);
        var sql7 = "SELECT * FROM Session, Sport WHERE professeur=? AND le_sport=id_sport;";
        smt.query(sql7, nomProf, callback);
    };

    /**
     * Delete a session of type 'resultat' in the database
     * @param {int} key
     * @param {function} callback
     * @returns {void}
     */
    this.deleteResultat = function(key, callback){
        this.use(null);
        var sql10 = "SET FOREIGN_KEY_CHECKS = 0;"+"DELETE * FROM Escalade JOIN Resultat ON Escalade.id_escalade = Resultat.id_resultat WHERE Resultat.la_session = "+key+";"+"DELETE * FROM Natation JOIN Resultat ON Natation.id_natation = Resultat.id_resultat WHERE Resultat.la_session = "+key+";"+"DELETE Acrosport FROM Acrosport JOIN Resultat ON Acrosport.id_acrosport = Resultat.id_resultat WHERE Resultat.la_session = "+key+";"+"DELETE * FROM Figure_Acrosport JOIN Acrosport ON Figure_Acrosport.lAcrosport = Acrosport.id_acrosport JOIN Resultat ON Acrosport.id_acrosport = Resultat.id_resultat WHERE Resultat.la_session = "+key+";"+"DELETE * FROM Escalade_Voie JOIN Escalade ON Escalade_Voie.lEscalade = Escalade.id_escalade JOIN Resultat ON Escalade.id_escalade = Resultat.id_resultat WHERE Resultat.la_session = "+key+";"+"DELETE * FROM Step JOIN Resultat ON Step.id_step = Resultat.id_resultat WHERE Resultat.la_session = "+key+";"+"DELETE FROM Resultat WHERE la_session = "+key+";"+"DELETE * FROM Session WHERE id_session="+key+";"+"SET FOREIGN_KEY_CHECKS = 1;";
        smt.query(sql10,callback);
    };

    /**
     * Delete a session of type 'tournois' in the database
     * @param {int} key
     * @param {function} callback
     * @returns {void}
     */
    this.deleteTournoi = function(key, callback){
        this.use(null);
        var sql10 = "DELETE FROM Session, Resultat, Musculation, Escalade, Natation, Acrosport, Step, Figure_Acrosport, Figure, Escalade_Voie, Voie WHERE id_resultat = id_musculation OR id_resultat = id_escalade OR id_escalade = lEscalade OR id_voie = laVoie OR id_resultat = id_natation OR id_resultat = id_acrosport OR id_acrosport = lAcrosport OR id_figure = laFigure OR id_resultat = id_step AND la_session = id_session AND id_session ="+key+";";
        smt.query(sql10,callback);
    };

    this.use = function(callback){
        var sql = "USE balabox_sport_db;";
        smt.query(sql, callback);
    };
};
var sessionDAO = new SessionDAO();
module.exports = sessionDAO;