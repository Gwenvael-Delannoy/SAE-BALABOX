/**
 * Create an object Session 
 * Attributs of the database : 
    id_session
    date_session
    statut
    heure
    identifiant_con
    mdp
    professeur
    type_session
    le_sport
*/
module.exports = class Session {
    /**
     * Constructor of the object Session
     */
    constructor() {}
    /**
     * init the object Session
     * @param {*} date
     * @param {*} statut
     * @param {*} heure
     * @param {*} identifiant
     * @param {*} mdp
     * @param {*} professeur
     * @param {*} type
     * @param {*} sport
     */
    init (date, statut, heure, identifiant, mdp, professeur, type, sport){
        this.id_session = -1;
        this.date_session = date;
        this.statut = statut;
        this.heure = heure;
        this.identifiant_con = identifiant;
        this.mdp = mdp;
        this.professeur = professeur;
        this.type_session = type;
        this.le_sport = sport;
    }

    /**
     * Get the id of the session
     * @returns {int}
     */
    getId(){
        return this.id_session;
    }

    /**
     * Get the date of the session
     * @returns {string}
     */
    getDate(){
        return this.date_session;
    }

    /**
     * Get the statut of the session
     * @returns {string}
     */
    getStatut(){
        return this.statut;
    }
    
    /**
     * Get the heure of the session
     * @returns {String}
     */
    getHeure(){
        return this.heure;
    }

    /**
     * Get the identifiant of the session
     * @returns {string}
     */
    getIdentifiant(){
        return this.identifiant_con;
    }

    /**
     * Get the mdp of the session
     * @returns {string}
     */
    getMdp(){
        return this.mdp;
    }

    /**
     * Get the professeur of the session
     * @returns {string}
     */
    getProfesseur(){
        return this.professeur;
    }

    /**
     * Get the type of the session
     * @returns {string}
     */
    getType(){
        return this.type_session;
    }

    /**
     * Get the sport of the session
     * @returns {string}
     */
    getSport(){
        return this.le_sport;
    }

    /**
     * Set the id of the session
     * @param {int} id
    * @returns {void} 
    */
    setId(id){
        this.id_session = id;
    }

    /**
     * Set the date of the session
     * @param {string} date
     * @returns {void}
     */
    setDate(date){
        this.date_session = date;
    }

    /**
     * Set the statut of the session
     * @param {string} statut
     * @returns {void}
     */
    setStatut(statut){
        this.statut = statut;
    }

    /**
     * Set the heure of the session
     * @param {string} heure
     * @returns {void}
     */
    setHeure(heure){
        this.heure = heure;
    }

    /**
     * Set the identifiant of the session
     * @param {string} identifiant
     * @returns {void}
     */
    setIdentifiant(identifiant){
        this.identifiant_con = identifiant;
    }

    /** 
     * Set the mdp of the session
     * @param {string} mdp
     * @returns {void}
     */
    setMdp(mdp){
        this.mdp = mdp;
    }

    /**
     * Set the professeur of the session
     * @param {string} professeur
     * @returns {void}
     */
    setProfesseur(professeur){
        this.professeur = professeur;
    }

    /**
     * Set the type of the session
     * @param {string} type
     * @returns {void}
     */
    setType(type){
        this.type_session = type;
    }

    /**
     * Set the sport of the session
     * @param {string} sport
     * @returns {void}
     */
    setSport(sport){
        this.le_sport = sport;
    }
    toString(){
        return "id_session : " + this.id_session + " date_session : " + this.date_session + " statut : " + this.statut + " heure : " + this.heure + " identifiant_con : " + this.identifiant_con + " mdp : " + this.mdp + " professeur : " + this.professeur + " type_session : " + this.type_session + " le_sport : " + this.le_sport;
    }

    /**
     * Get the object Session in JSON format
     * @returns {JSON}
     * @example
     * {
     * "id_session": 1,
     * "date_session": "2020-01-01",
     * "statut": "En cours",
     * "heure": "10:00",
     * "identifiant_con": "tournClasse1",
     * "mdp": "Classe1 "
     * "professeur": "M. Dupont",
     * "type_session": "Tournois",
     * "le_sport": "Badminton"
     * }
     */
    toJSON(){
        return {
            "id_session": this.id_session,
            "date_session": this.date_session,
            "statut": this.statut,
            "heure": this.heure,
            "identifiant_con": this.identifiant_con,
            "mdp": this.mdp,
            "professeur": this.professeur,
            "type_session": this.type_session,
            "le_sport": this.le_sport
        }
    }
}
