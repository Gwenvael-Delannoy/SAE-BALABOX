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
        values = [session.getDate(), session.getStatut(), session.getHeure(), session.getIdentifiant(), session.getMdp(), session.getProfesseur(), session.getType(), session.getSport()];
        var sql = "INSERT INTO Session (date_session, statut, heure, identifiant_con, mdp, professeur, type_session, le_sport) VALUES (?,?,?,?,?,?,?,?)";
        smt.query(sql, values ,callback);
    };

    /**
     * Mettre à jour une session dans la base de données
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
     * Supprimer une session de la base de données où la saisie est seulement des resultats
     * @param {int} key
     * @param {function} callback
     * @returns {void}
     */
    this.deleteResultat = function(key, callback){
        this.use(null);
        var sql10 = "SET FOREIGN_KEY_CHECKS = 0;"+"DELETE Escalade FROM Escalade JOIN Resultat ON Escalade.id_escalade = Resultat.id_resultat WHERE Resultat.la_session = "+key+";"+"DELETE * FROM Natation JOIN Resultat ON Natation.id_natation = Resultat.id_resultat WHERE Resultat.la_session = "+key+";"+"DELETE Acrosport FROM Acrosport JOIN Resultat ON Acrosport.id_acrosport = Resultat.id_resultat WHERE Resultat.la_session = "+key+";"+"DELETE * FROM Figure_Acrosport JOIN Acrosport ON Figure_Acrosport.lAcrosport = Acrosport.id_acrosport JOIN Resultat ON Acrosport.id_acrosport = Resultat.id_resultat WHERE Resultat.la_session = "+key+";"+"DELETE * FROM Escalade_Voie JOIN Escalade ON Escalade_Voie.lEscalade = Escalade.id_escalade JOIN Resultat ON Escalade.id_escalade = Resultat.id_resultat WHERE Resultat.la_session = "+key+";"+"DELETE * FROM Step JOIN Resultat ON Step.id_step = Resultat.id_resultat WHERE Resultat.la_session = "+key+";"+"DELETE FROM Resultat WHERE la_session = "+key+";"+"DELETE * FROM Session WHERE id_session="+key+";"+"SET FOREIGN_KEY_CHECKS = 1;";
        smt.query(sql10,callback);
    };

    /**
     * Supprimer une session de la base de données où la saisie est seulement des tournois
     * @param {int} key
     * @param {function} callback
     * @returns {void}
     */
    this.deleteTournois = function(key, callback){
        this.use(null);
        var sql10 = "DELETE FROM Session, Resultat, Musculation, Escalade, Natation, Acrosport, Step, Figure_Acrosport, Figure, Escalade_Voie, Voie WHERE id_resultat = id_musculation OR id_resultat = id_escalade OR id_escalade = lEscalade OR id_voie = laVoie OR id_resultat = id_natation OR id_resultat = id_acrosport OR id_acrosport = lAcrosport OR id_figure = laFigure OR id_resultat = id_step AND la_session = id_session AND id_session ="+key+";";
        smt.query(sql10,callback);
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