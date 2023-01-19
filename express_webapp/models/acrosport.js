/**
 * Create an object acrosport
 * Attributs of the database : 
 * id_acrosport
 * total_point
 * lesFigures
 */
module.exports = class Acrosport {
    /**
     * Constructor of the object Acrosport
     */
    constructor() {}
    /**
     * init the object Acrosport
     * @param {int} total_point
     * @returns {void}
     */
    init (total_point){
        this.id_acrosport = -1;
        this.total_point = total_point;

    }
    /**
     * Get the id of the object Acrosport
     * @returns {int}
     */
    getId(){
        return this.id_acrosport;
    }
    /**
     * Get the total_point of the object Acrosport
     * @returns {int}
     */
    getTotalPoint(){
        return this.total_point;
    }
    /**
     * Set the id of the object Acrosport
     * @param {int} id
     * @returns {void}
     */
    setId(id){
        this.id_acrosport = id;
    }
    /**
     * Set the total_point of the object Acrosport
     * @param {int} total_point
     * @returns {void}
     */
    setTotalPoint(total_point){
        this.total_point = total_point;
    }
}