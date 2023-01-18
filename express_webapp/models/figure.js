/**
 * Create an object figure
 * Attributs of the database : 
 * id_figure
 * nom
 * description
 * point
 */
module.exports = class Figure {
    /**
     * Constructor of the object Figure
     */
    constructor() {}
    /**
     * init the object Figure
     * @param {String} nom
     * @param {String} description
     * @param {int} point
     * @returns {void}
     */
    init (nom, description, point){
        this.id_figure = -1;
        this.nom = nom;
        this.description = description;
        this.point = point;
    }
    /**
     * Get the id of the object Figure
     * @returns {int}
     */
    getId(){
        return this.id_figure;
    }
    /**
     * Get the nom of the object Figure
     * @returns {String}
     */
    getNom(){
        return this.nom;
    }
    /**
     * Get the description of the object Figure
     * @returns {String}
     */
    getDescription(){
        return this.description;
    }
    /**
     * Get the point of the object Figure
     * @returns {int}
     */
    getPoint(){
        return this.point;
    }
    /**
     * Set the id of the object Figure
     * @param {int} id
     * @returns {void}
     */
    setId(id){
        this.id_figure = id;
    }
    /**
     * Set the nom of the object Figure
     * @param {String} nom
     * @returns {void}
     */
    setNom(nom){
        this.nom = nom;
    }
    /**
     * Set the description of the object Figure
     * @param {String} description
     * @returns {void}
     */
    setDescription(description){
        this.description = description;
    }
    /**
     * Set the point of the object Figure
     * @param {int} point
     * @returns {void}
     */
    setPoint(point){
        this.point = point;
    }
}