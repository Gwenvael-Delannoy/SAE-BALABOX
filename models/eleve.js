
/**
 * Create an object eleve
 * Attributs of the database : 
    id_eleve
    nom
    prenom
    sexe
    classe
    total_points
    l'equipe
 */
module.exports = class Eleve {
    /**
     * Constructor of the object Eleve
     */
    constructor() {}
    /**
     * init the object Eleve
     * @param {*} nom
     * @param {*} prenom
     * @param {*} sexe
     * @param {*} classe
     * @param {*} total_points
     * @param {*} equipe
     * @returns {void}
     */
    init (nom, prenom, sexe, classe, total_points, equipe){
        this.id_eleve = -1;
        this.nom = nom;
        this.prenom = prenom;
        this.sexe = sexe;
        this.classe = classe;
        this.total_points = total_points;
        this.l_equipe = equipe;
    }
    /**
     * Get the id of the object Eleve
     * @returns {int}
     */
    getId(){
        return this.id_eleve;
    }
    /**
     * Get the nom of the object Eleve
     * @returns {string}
     */
    getNom(){
        return this.nom;
    }
    /**
     * Get the prenom of the object Eleve
     * @returns {string}
     */
    getPrenom(){
        return this.prenom;
    }
    /**
     * Get the sexe of the object Eleve
     * @returns {string}
     */
    getSexe(){
        return this.sexe;
    }
    /**
     * Get the classe of the object Eleve
     * @returns {string}
     */
    getClasse(){
        return this.classe;
    }
    /**
     * Get the total_points of the object Eleve
     * @returns {int}
     */
    getTotalPoints(){
        return this.total_points;
    }
    /**
     * Get the equipe of the object Eleve
     * @returns {Equipe}
     */
    getEquipe(){
        return this.l_equipe;
    }
    /**
     * Set the id of the object Eleve
     * @param {*} id
     * @returns {void}
     */
    setId(id){
        this.id_eleve = id;
    }
    /**
     * Set the nom of the object Eleve
     * @param {*} nom
     * @returns {void}
     */
    setNom(nom){
        this.nom = nom;
    }
    /**
     * Set the prenom of the object Eleve
     * @param {*} prenom
     * @returns {void}
     */
    setPrenom(prenom){
        this.prenom = prenom;
    }
    /**
     * Set the sexe of the object Eleve
     * @param {*} sexe
     * @returns {void}
     */
    setSexe(sexe){
        this.sexe = sexe;
    }
    /**
     * Set the classe of the object Eleve
     * @param {*} classe
     * @returns {void}
     */
    setClasse(classe){
        this.classe = classe;
    }
    /**
     * Set the total_points of the object Eleve
     * @param {*} total_points
     * @returns {void}
     */
    setTotalPoints(total_points){
        this.total_points = total_points;
    }
    /**
     * Set the equipe of the object Eleve
     * @param {*} equipe
     * @returns {void}
     */
    setEquipe(equipe){
        this.l_equipe = equipe;
    }
}
