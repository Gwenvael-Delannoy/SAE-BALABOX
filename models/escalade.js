/**
 * Create an object escalade
 * Attributs of the database : 
    id_escalade
    assureur
    total_diff
 */
module.exports = class Escalade {
    /**
     * Constructor of the object Escalade
     */
    constructor() {}
    /**
     * init the object Escalade
     * @param {Eleve} assureur
     * @param {int} total_diff
     * @returns {void}
     */
    init (assureur, total_diff){
        this.id_escalade = -1;
        this.assureur = assureur;
        this.total_diff = total_diff;
    }
    /**
     * Get the id of the object Escalade
     * @returns {int}
     */
    getId(){
        return this.id_escalade;
    }
    /**
     * Get the assureur of the object Escalade
     * @returns {Eleve}
     */
    getAssureur(){
        return this.assureur;
    }
    /**
     * Get the total_diff of the object Escalade
     * @returns {int}
     */
    getTotalDiff(){
        return this.total_diff;
    }
    /**
     * Set the id of the object Escalade
     * @param {int} id
     * @returns {void}
     */
    setId(id){
        this.id_escalade = id;
    }
    /**
     * Set the assureur of the object Escalade
     * @param {Eleve} assureur
     * @returns {void}
     */
    setAssureur(assureur){
        this.assureur = assureur;
    }
    /**
     * Set the total_diff of the object Escalade
     * @param {int} total_diff
     * @returns {void}
     */
    setTotalDiff(total_diff){
        this.total_diff = total_diff;
    }
}
