/**
 * Create an object step
 * Attributs of the database : 
 * id_step
 * type_mobilite
 * ressenti
 * param_indv
 * bilan_perso
 * perspective
 */
module.exports = class Step {
    /**
     * Constructor of the object Step
     */
    constructor() {}
    /**
     * init the object Step
     * @param {String} type_mobilite
     * @param {String} ressenti
     * @param {String} param_indv
     * @param {String} bilan_perso
     * @param {String} perspective
     * @returns {void}
     */
    init (type_mobilite, ressenti, param_indv, bilan_perso, perspective){
        this.id_step = -1;
        this.type_mobilite = type_mobilite;
        this.ressenti = ressenti;
        this.param_indv = param_indv;
        this.bilan_perso = bilan_perso;
        this.perspective = perspective;
    }
    /**
     * Get the id of the object Step
     * @returns {int}
     */
    getId(){
        return this.id_step;
    }
    /**
     * Get the type_mobilite of the object Step
     * @returns {String}
     */
    getTypeMobilite(){
        return this.type_mobilite;
    }
    /**
     * Get the ressenti of the object Step
     * @returns {String}
     */
    getRessenti(){
        return this.ressenti;
    }
    /**
     * Get the param_indv of the object Step
     * @returns {String}
     */
    getParamIndv(){
        return this.param_indv;
    }
    /**
     * Get the bilan_perso of the object Step
     * @returns {String}
     */
    getBilanPerso(){
        return this.bilan_perso;
    }
    /**
     * Get the perspective of the object Step
     * @returns {String}
     */
    getPerspective(){
        return this.perspective;
    }
    /**
     * Set the id of the object Step
     * @param {int} id
     * @returns {void}
     */
    setId(id){
        this.id_step = id;
    }
    /**
     * Set the type_mobilite of the object Step
     * @param {String} type_mobilite
     * @returns {void}
     */
    setTypeMobilite(type_mobilite){
        this.type_mobilite = type_mobilite;
    }
    /**
     * Set the ressenti of the object Step
     * @param {String} ressenti
     * @returns {void}
     */
    setRessenti(ressenti){
        this.ressenti = ressenti;
    }
    /**
     * Set the param_indv of the object Step
     * @param {String} param_indv
     * @returns {void}
     */
    setParamIndv(param_indv){
        this.param_indv = param_indv;
    }
    /**
     * Set the bilan_perso of the object Step
     * @param {String} bilan_perso
     * @returns {void}
     */
    setBilanPerso(bilan_perso){
        this.bilan_perso = bilan_perso;
    }
    /**
     * Set the perspective of the object Step
     * @param {String} perspective
     * @returns {void}
     */
    setPerspective(perspective){
        this.perspective = perspective;
    }
}
