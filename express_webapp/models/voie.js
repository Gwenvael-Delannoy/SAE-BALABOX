/**
 * Create an object voie
 * Attributs of the database : 
    id_voie
    nom_voie
    deg_diffi
 */
module.exports = class Voie {
    /**
     * Constructor of the object Voie
     */
    constructor() {}
    /**
     * init the object Voie
     * @param {String } nom_voie
     * @param {int} deg_diffi
     * @returns {void}
     */
    init (nom_voie,deg_diffi){
        this.id_voie = -1;
        this.deg_diffi = deg_diffi;
        this.nom_voie = nom_voie;
    }
    /**
     * Get the id of the object Voie
     * @returns {int}
     */
    getId(){
        return this.id_voie;
    }
    /**
     * Get the nom_voie of the object Voie
     * @returns {String}
    */
    getNomVoie(){
        return this.nom_voie;
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
     * Set the nom_voie of the object Voie
     * @param {String} nom_voie
     * @returns {void}
     */
    setNomVoie(nom_voie){
        this.nom_voie = nom_voie;
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