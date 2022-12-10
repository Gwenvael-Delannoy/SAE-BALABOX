/**
 * Create an object voie
 * Attributs of the database : 
    id_voie
    deg_diffi
 */
module.exports = class Voie {
    /**
     * Constructor of the object Voie
     */
    constructor() {}
    /**
     * init the object Voie
     * @param {int} deg_diffi
     * @returns {void}
     */
    init (deg_diffi){
        this.id_voie = -1;
        this.deg_diffi = deg_diffi;
    }
    /**
     * Get the id of the object Voie
     * @returns {int}
     */
    getId(){
        return this.id_voie;
    }
    /**
     * Get the deg_diffi of the object Voie
     * @returns {int}
     */
    getDegDiffi(){
        return this.deg_diffi;
    }
    /**
     * Set the id of the object Voie
     * @param {int} id
     * @returns {void}
     */
    setId(id){
        this.id_voie = id;
    }
    /**
     * Set the deg_diffi of the object Voie
     * @param {int} deg_diffi
     * @returns {void}
     */
    setDegDiffi(deg_diffi){
        this.deg_diffi = deg_diffi;
    }
}
