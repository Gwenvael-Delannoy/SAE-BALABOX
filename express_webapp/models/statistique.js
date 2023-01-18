/**
 * Create an object statistique
 * Attributs of the database : 
    id_stats
    intitule
    stats
    lEleve
 */
module.exports = class Statistique {
    /**
     * Constructor of the object Statistique
     */
    constructor() {}
    /**
     * init the object Statistique
     * @param {*} intitule
     * @param {*} stats
     * @param {*} lEleve
     * @returns {void}
     */
    init (intitule, stats, lEleve){
        this.id_stats = -1;
        this.intitule = intitule;
        this.stats = stats;
        this.lEleve = lEleve;
    }
    /**
     * Get the id of the object Statistique
     * @returns {int}
     */
    getId(){
        return this.id_stats;
    }
    /**
     * Get the intitule of the object Statistique
     * @returns {string}
     */
    getIntitule(){
        return this.intitule;
    }
    /**
     * Get the stats of the object Statistique
     * @returns {int}
     */
    getStats(){
        return this.stats;
    }
    /**
     * Get the lEleve of the object Statistique
     * @returns {Eleve}
     */
    getLEleve(){
        return this.lEleve;
    }
    /**
     * Set the id of the object Statistique
     * @param {*} id
     * @returns {void}
     */
    setId(id){
        this.id_stats = id;
    }
    /**
     * Set the intitule of the object Statistique
     * @param {*} intitule
     * @returns {void}
     */
    setIntitule(intitule){
        this.intitule = intitule;
    }
    /**
     * Set the stats of the object Statistique
     * @param {*} stats
     * @returns {void}
     */
    setStats(stats){
        this.stats = stats;
    }
    /**
     * Set the lEleve of the object Statistique
     * @param {*} lEleve
     * @returns {void}  
     */
    setLEleve(lEleve){
        this.lEleve = lEleve;
    }
}