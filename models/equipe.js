/**
 * Create an object equipe
 * Attributs of the database : 
    id_equipe
    nbJoueurs
    total
 */
module.exports = class Equipe {
    /**
     * Constructor of the object Equipe
     */
    constructor() {}
    /**
     * init the object Equipe
     * @param {*} nbJoueurs
     * @param {*} total
     * @returns {void}
     */
    init (nbJoueurs, total){
        this.id_equipe = -1;
        this.nbJoueurs = nbJoueurs;
        this.total = total;
    }
    /**
     * Get the id of the object Equipe
     * @returns {void}
     */
    getId(){
        return this.id_equipe;
    }
    /**
     * Get the nbJoueurs of the object Equipe
     * @returns {void}
     */
    getNbJoueurs(){
        return this.nbJoueurs;
    }
    /**
     * Get the total of the object Equipe
     * @returns {void}
     */
    getTotal(){
        return this.total;
    }
    /**
     * Set the id of the object Equipe
     * @param {*} id
     * @returns {void}
     */
    setId(id){
        this.id_equipe = id;
    }
    /**
     * Set the nbJoueurs of the object Equipe
     * @param {*} nbJoueurs
     * @returns {void}
     */
    setNbJoueurs(nbJoueurs){
        this.nbJoueurs = nbJoueurs;
    }
    /**
     * Set the total of the object Equipe   
     * @param {*} total
     * @returns {void}
     */
    setTotal(total){
        this.total = total;
    }
}
