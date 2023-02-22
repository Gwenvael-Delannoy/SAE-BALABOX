/**
 * Create an object natation
 * Attributs of the database : 
 * id_natation
 * style_nage
 * plongeons
 * nom_bassin
 */
module.exports = class Natation {
    /**
     * Constructor of the object Natation
     */
    constructor() {}
    /**
     * init the object Natation
     * @param {String} style_nage
     * @param {int} plongeons
     * @param {String} nom_bassin
     * @returns {void}
     */
    init (style_nage, plongeons, nom_bassin){
        this.id_natation = -1;
        this.style_nage = style_nage;
        this.plongeons = plongeons;
        this.nom_bassin = nom_bassin;
    }
    /**
     * Get the id of the object Natation
     * @returns {int}
     * @returns {void}
     */
    setId(id){
        this.id_natation = id;
    }
    /**
     * Get the id of the object Natation
     * @returns {int}
     */
    getId(){
        return this.id_natation;
    }
    /**
     * Get the style_nage of the object Natation
     * @returns {String}
     */
    getStyleNage(){
        return this.style_nage;
    }
    /**
     * Get the plongeons of the object Natation
     * @returns {int}
     */
    getPlongeons(){
        return this.plongeons;
    }
    /**
     * Get the nom_bassin of the object Natation
     * @returns {String}
     */
    getNomBassin(){
        return this.nom_bassin;
    }
    /**
     * Set the style_nage of the object Natation
     * @param {String} style_nage
     * @returns {void}
     */
    setStyleNage(style_nage){
        this.style_nage = style_nage;
    }
    /**
     * Set the plongeons of the object Natation
     * @param {int} plongeons
     * @returns {void}
     */
    setPlongeons(plongeons){
        this.plongeons = plongeons;
    }
    /**
     * Set the nom_bassin of the object Natation
     * @param {String} nom_bassin
     * @returns {void}
     */
    setNomBassin(nom_bassin){
        this.nom_bassin = nom_bassin;
    }
}