/**
 * DAO pour session
 */
var Session = require('../session');
var smt = require('./mysql_connection');

var SessionDAO = function(){
    
    /**
        * Inserer une nouvelle session dans la base de données
        * @param {Session} session
        * @param {function} callback
        * @returns {void}
        */
     this.insert = function(session, callback){
        this.use(null);
        values = [session.getDate(), session.getStatut(), session.getHeure(), session.getIdentifiant(), session.getMdp(), session.getProfesseur(), session.getSport()];
        var sql = "INSERT INTO Session (date_session, statut, heure, identifiant_con, mdp, professeur, le_sport) VALUES (?,?,?,?,?,?,?)";
        smt.query(sql, values ,callback);
    };

    /**
     * Mettre à jour une session dans la base de données
     * @param {int} key
     * @param {Session} session
     * @param {function} callback
     * @returns {void}
     */
    this.update = function(key, session, callback){
        this.use(null);
        var values1 = [session.getDate(), session.getStatut(), session.getHeure(), session.getIdentifiant(), session.getMdp(), session.getProfesseur(), session.getSport()];
        var sql2 = "UPDATE Session SET date_session=?,statut=?,heure=?,identifiant_con=?,mdp=?,professeur=?,le_sport=? WHERE id_session=?;";
        values1.push(key);
        smt.query(sql2,values1, callback);
    };

    /**
     * Supprimer une session de la base de données
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
     * Trouver toutes les sessions présentes dans la base de données 
     * @param {function} callback
     * @returns {Session[]}
     */
    this.findAll = function(callback){
        this.use(null);
        var sql4 = "SELECT * FROM Session";
        smt.query(sql4, callback);
    };

    /**
     * Trouver une session dans la base de données par son identifiant
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
     * Trouver une session dans la base de données par son identifiant de connection
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
     * Trouver une session dans la base de données avec le nom du professeur et le sport
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
     * Trouver une session dans la base de données avec le nom du professeur et le sport
     * @param {int} key
     * @param {function} callback
     * @return {Session}
     */
    this.FindSessionSportById = function(id, callback){
        this.use(null);
        var sql7 = "SELECT * FROM Session, Sport WHERE id_session=? AND le_sport=id_sport;";
        smt.query(sql7, id, callback);
    };

    /**
     * Utiliser la bonne base de données
     * @param {function} callback
     */
    this.use = function(callback){
        var sql = "USE balabox_sport_db;";
        smt.query(sql, callback);
    };
};
var sessionDAO = new SessionDAO();
module.exports = sessionDAO;