/**
 * Create an objectSport 
 * Attributs of the database : 
    id_sport     
    nom_sport 
    description_sport 
*/
module.exports = class Sport {
  init (nom , descri){
    this.id_sport = -1;
    this.nom_sport = nom;
    this.description_sport = descri;
  }
  getId(){
    return this.id_sport;
  }
  getNomSport(){
    return this.nom_sport;
  }
  getDescription(){
    return this.description_sport
  }
  setId(id){
    this.id_sport = id;
  }
  setNomSport(nom){
    this.nom_sport = nom;
  }
  setDescription(descri){
    this.description_sport = descri;
  }
  toString(){
    return "Sport : " + this.id_sport + " " + this.nom_sport + " " + this.description_sport;
  }
}
