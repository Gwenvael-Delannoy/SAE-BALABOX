    

/**id_sport NUMBER    
        CONSTRAINT pk_Sport PRIMARY KEY,
    nom_sport VARCHAR2(30) NOT NULL,
    description_sport VARCHAR2(250)
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
