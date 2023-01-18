/**
 * Create an object Sport 
 * Attributs of the database : 
    id_sport     
    nom_sport 
    description_sport 
*/
module.exports = class Sport {
  /**
   * Constructor of the object Sport
   */
  constructor() {}
  /**
   * init the object Sport
   * @param {*} nom 
   * @param {*} descri 
   */
  init (nom , descri){
    this.id_sport = -1;
    this.nom_sport = nom;
    this.description_sport = descri;
  }
  /**
   * Get the id of the sport
   * @returns {int}
   */
  getId(){
    return this.id_sport;
  }
  /**
   * Get the name of the sport 
   * @returns {string}
   */
  getNomSport(){
    return this.nom_sport;
  }
  /**
   * Get the description of the sport
   * @returns {string}
   */
  getDescription(){
    return this.description_sport
  }
  /**
   * Set the id of the sport
   * @param {int} id
   * @returns {void}
   */
  setId(id){
    this.id_sport = id;
  }
  /**
   * Set the name of the sport
   * @param {string} nom
   * @returns {void}
   */
  setNomSport(nom){
    this.nom_sport = nom;
  }
  /**
   * Set the description of the sport
   * @param {string} descri
   * @returns {void}
   */
  setDescription(descri){
    this.description_sport = descri;
  }
  /**
   * Convert the object to a string
   * @returns {string}
   */
  toString(){
    return "Sport : " + this.id_sport + " " + this.nom_sport + " " + this.description_sport;
  }
}
