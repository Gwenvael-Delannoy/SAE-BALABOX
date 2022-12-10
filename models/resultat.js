/**
 * Create an object resultat
 * Attributs of the database : 
    id_resultat
    temps
    distance
    freq_card
    complementaire
    la_session
    unEleve
*/
module.exports = class Resultat {
    /**
     * Constructor of the object Resultat
     */
    constructor() {}
    /**
     * init the object Resultat
     * @param {*} temps
     * @param {*} distance
     * @param {*} freq_card
     * @param {*} complementaire
     * @param {*} session
     * @param {*} eleve
     * @returns {void}
     */
    init (temps, distance, freq_card, complementaire, session, eleve){
        this.id_resultat = -1;
        this.temps = temps;
        this.distance = distance;
        this.freq_card = freq_card;
        this.complementaire = complementaire;
        this.la_session = session;
        this.unEleve = eleve;
    }
    /**
     * Get the id of the object Resultat
     * @returns {int}
     */
    getId(){
        return this.id_resultat;
    }
    /**
     * Get the temps of the object Resultat
     * @returns {int}
     */
    getTemps(){
        return this.temps;
    }
    /**
     * Get the distance of the object Resultat
     * @returns {int}
     */
    getDistance(){
        return this.distance;
    }
    /**
     * Get the freq_card of the object Resultat
     * @returns {int}
     */
    getFreqCard(){
        return this.freq_card;
    }
    /**
     * Get the complementaire of the object Resultat
     * @returns {string}
     */
    getComplementaire(){
        return this.complementaire;
    }
    /**
     * Get the session of the object Resultat
     * @returns {int}
     */
    getSession(){
        return this.la_session;
    }
    /**
     * Get the eleve of the object Resultat
     * @returns {int}
     */
    getEleve(){
        return this.unEleve;
    }
    /**
     * Set the id of the object Resultat
     * @param {*} id
     * @returns {void}
     */
    setId(id){
        this.id_resultat = id;
    }
    /**
     * Set the temps of the object Resultat
     * @param {*} temps
     * @returns {void}
     */
    setTemps(temps){
        this.temps = temps;
    }
    /**
     * Set the distance of the object Resultat
     * @param {*} distance
     * @returns {void}
     */
    setDistance(distance){
        this.distance = distance;
    }
    /**
     * Set the freq_card of the object Resultat
     * @param {*} freq_card
     * @returns {void}
     */
    setFreqCard(freq_card){
        this.freq_card = freq_card;
    }
    /**
     * Set the complementaire of the object Resultat
     * @param {*} complementaire
     * @returns {void}
     */
    setComplementaire(complementaire){
        this.complementaire = complementaire;
    }
    /**
     * Set the session of the object Resultat
     * @param {*} session
     * @returns {void}
     */
    setSession(session){
        this.la_session = session;
    }
    /**
     * Set the eleve of the object Resultat
     * @param {*} eleve
     * @returns {void}
     */
    setEleve(eleve){
        this.unEleve = eleve;
    }
}
