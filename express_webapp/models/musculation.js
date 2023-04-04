/**
 * Create an object figure
 * Attributs of the database : 
 * id_musculation
 * muscle_travailler
 * series
 * nb_reps
 * intensite
 * charge
 * ressenti
 */
 module.exports = class Musculation {
    /**
     * Constructor of the object figure
     */
    constructor() {}
    
    /**
     * init the object musculation
     * @param {String} muscle_travailler
     * @param {int} series
     * @param {int} nb_reps
     * @param {int} intensite
     * @param {int} charge
     * @param {String} ressenti
     * @returns {void}
     */
    init (muscle_travailler, series, nb_reps, intensite, charge, ressenti){
        this.id_musculation = -1;
        this.muscle_travailler = muscle_travailler;
        this.series = series;
        this.nb_reps = nb_reps;
        this.intensite = intensite;
        this.charge = charge;
        this.ressenti = ressenti;
    }
    /**
     * Get the id of the object musculation
     * @returns {int}
     */
    getId(){
        return this.id_musculation;
    }
    /**
     * Get the muscle_travailler of the object musculation
     * @returns {String}
     */
    getMuscleTravailler(){
        return this.muscle_travailler;
    }
    /**
     * Get the series of the object musculation
     * @returns {int}
     */
    getSeries(){
        return this.series;
    }
    /**
     * Get the nb_reps of the object musculation
     * @returns {int}
     */
    getNbReps(){
        return this.nb_reps;
    }
    /**
     * Get the intensite of the object musculation
     * @returns {int}
     */
    getIntensite(){
        return this.intensite;
    }
    /**
     * Get the charge of the object musculation
     * @returns {int}
     */
    getCharge(){
        return this.charge;
    }
    /**
     * Get the ressenti of the object musculation
     * @returns {String}
     */
    getRessenti(){
        return this.ressenti;
    }
    /**
     * Set the id of the object musculation
     * @param {int} id
     * @returns {void}
     */
    setId(id){
        this.id_musculation = id;
    }
    /**
     * Set the muscle_travailler of the object musculation
     * @param {String} muscle_travailler
     * @returns {void}
     */
    setMuscleTravailler(muscle_travailler){
        this.muscle_travailler = muscle_travailler;
    }
    /**
     * Set the series of the object musculation
     * @param {int} series
     * @returns {void}
     */
    setSeries(series){
        this.series = series;
    }
    /**
     * Set the nb_reps of the object musculation
     * @param {int} nb_reps
     * @returns {void}
     */
    setNbReps(nb_reps){
        this.nb_reps = nb_reps;
    }
    /**
     * Set the intensite of the object musculation
     * @param {int} intensite
     * @returns {void}
     */
    setIntensite(intensite){
        this.intensite = intensite;
    }
    /**
     * Set the charge of the object musculation
     * @param {int} charge
     * @returns {void}
     */
    setCharge(charge){
        this.charge = charge;
    }
    /**
     * Set the ressenti of the object musculation
     * @param {String} ressenti
     * @returns {void}
     */
    setRessenti(ressenti){
        this.ressenti = ressenti;
    }
}