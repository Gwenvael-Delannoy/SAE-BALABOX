/**
 * Create an object match
 * Attributs of the database : 
    id_match
    resultat_equipe_1
    resultat_equipe_2
    la_session
 */

module.exports = class Match {
    /**
     * Constructor of the object Match
     */
    constructor() {}

    /**
     * init the object Match
     * @param {*} resultat1
     * @param {*} resultat2
     * @param {*} session
     */
    init (resultat1, resultat2, session){
        this.id_match = -1;
        this.resultat_equipe_1 = resultat1;
        this.resultat_equipe_2 = resultat2;
        this.la_session = session;
    }

    /**
     * Get the id of the match
     * @returns {int}
     */
    getId(){
        return this.id_match;
    }

    /**
     * Get the result of the first team
     * @returns {int}
     */
    getResultat1(){
        return this.resultat_equipe_1;
    }

    /**
     * Get the result of the second team
     * @returns {int}
     */
    getResultat2(){
        return this.resultat_equipe_2;
    }

    /**
     * Get the session of the match
     * @returns {int}
     * @returns {Session}
     */
    getSession(){
        return this.la_session;
    }

    /**
     * Set the id of the match
     * @param {*} id
     * @returns {void}
     */
    setId(id){
        this.id_match = id;
    }

    /**
     * Set the result of the first team
     * @param {*} resultat
     * @returns {void}
     */
    setResultat1(resultat){
        this.resultat_equipe_1 = resultat;
    }

    /**
     * Set the result of the second team
     * @param {*} resultat
     * @returns {void}
     */
    setResultat2(resultat){
        this.resultat_equipe_2 = resultat;
    }

    /**
     * Set the session of the match
     * @param {*} session
     * @returns {void}
     */
    setSession(session){
        this.la_session = session;
    }

    /**
     * toString of the object Match
     * @returns {string}
     */
    toString(){
        return "Match : " + this.id_match + " - " + this.resultat_equipe_1 + " - " + this.resultat_equipe_2 + " - " + this.la_session;
    }
}
